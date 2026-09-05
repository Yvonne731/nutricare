const express = require("express");
const cors = require("cors");
const dialogflow = require("@google-cloud/dialogflow");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const projectId = "nutricare-26a6a";

console.log("=== GOOGLE CREDENTIAL TEST ===");
console.log(
    "GOOGLE_SERVICE_ACCOUNT_JSON exists:",
    !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON
);
console.log(
    "GOOGLE_APPLICATION_CREDENTIALS exists:",
    !!process.env.GOOGLE_APPLICATION_CREDENTIALS
);
console.log("==============================");

let googleCredentials = undefined;

if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    googleCredentials = JSON.parse(
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    );
}

const sessionsClient = new dialogflow.SessionsClient({
    projectId: projectId,
    credentials: googleCredentials
});

let lastMealType = null;


// ==========================================
// PERSONALIZED MEAL RECOMMENDATIONS
// ==========================================

function getMealRecommendation(mealType, dietaryPreference) {

    const meal = (mealType || "").toLowerCase().trim();
    const preference = (dietaryPreference || "").toLowerCase().trim();


    // ==========================================
    // VEGETARIAN
    // ==========================================

    if (preference === "vegetarian") {

        if (meal === "breakfast") {
            return "🍳 For a vegetarian breakfast, you could try oatmeal with fruit and yogurt, eggs with whole-grain toast, or a vegetable sandwich.";
        }

        if (meal === "lunch") {
            return "🥗 For a vegetarian lunch, you could try a tofu and vegetable rice bowl, chickpea salad, or a vegetable wrap.";
        }

        if (meal === "dinner") {
            return "🍛 For a vegetarian dinner, you could try vegetable fried rice with tofu, lentil curry with rice, or a vegetable pasta dish.";
        }

        if (meal === "snack") {
            return "🍎 For a vegetarian snack, you could try yogurt with fruit, nuts, a banana with peanut butter, or whole-grain crackers.";
        }
    }


    // ==========================================
    // VEGAN
    // ==========================================

    if (preference === "vegan") {

        if (meal === "breakfast") {
            return "🌱 For a vegan breakfast, you could try oatmeal with fruit and plant-based milk, avocado toast, or a fruit and nut bowl.";
        }

        if (meal === "lunch") {
            return "🥗 For a vegan lunch, you could try a tofu rice bowl, chickpea salad, vegetable wrap with hummus, or lentil soup.";
        }

        if (meal === "dinner") {
            return "🍛 For a vegan dinner, you could try tofu and vegetable stir-fry with rice, lentil curry, or vegetable pasta with tomato sauce.";
        }

        if (meal === "snack") {
            return "🍎 For a vegan snack, you could try fresh fruit, nuts, hummus with vegetables, or a banana with peanut butter.";
        }
    }


    // ==========================================
    // NO PREFERENCE
    // ==========================================

    if (
        preference === "no_preference" ||
        preference === "no restriction" ||
        preference === "no_restriction"
    ) {

        if (meal === "breakfast") {
            return "🍳 For breakfast, you could try oatmeal with fruit, eggs with whole-grain toast, or yogurt with fruit and nuts.";
        }

        if (meal === "lunch") {
            return "🥗 For lunch, you could try a balanced rice bowl with vegetables and protein, a chicken salad, or a whole-grain sandwich.";
        }

        if (meal === "dinner") {
            return "🍛 For dinner, you could try grilled chicken with rice and vegetables, fish with potatoes and vegetables, or a balanced noodle dish.";
        }

        if (meal === "snack") {
            return "🍎 For a snack, you could try fresh fruit, yogurt, nuts, or whole-grain crackers with a healthy spread.";
        }
    }


    return null;
}


// ==========================================
// CHAT ENDPOINT
// ==========================================

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                error: "Message is required"
            });
        }


        // ==========================================
        // DIALOGFLOW SESSION
        // ==========================================

        const sessionId = "nutricare-user-session";

        const sessionPath =
            sessionsClient.projectAgentSessionPath(
                projectId,
                sessionId
            );


        // ==========================================
        // DIALOGFLOW REQUEST
        // ==========================================

        const request = {

            session: sessionPath,

            queryInput: {

                text: {

                    text: userMessage,

                    languageCode: "en"

                }

            }

        };


        const [response] =
            await sessionsClient.detectIntent(request);

        const result = response.queryResult;


        // ==========================================
        // GET INTENT
        // ==========================================

        const intentName =
            result.intent
                ? result.intent.displayName
                : null;


        // ==========================================
        // GET PARAMETERS
        // ==========================================

        let mealType = null;
        let dietaryPreference = null;

        if (result.parameters) {

            const fields =
                result.parameters.fields || {};


            if (fields.meal_type) {

                mealType =
                    fields.meal_type.stringValue;

            }


            if (fields.dietary_preference) {

                dietaryPreference =
                    fields.dietary_preference.stringValue;

            }

        }


        // ==========================================
        // SHOW INFORMATION IN TERMINAL
        // ==========================================

        console.log("Intent:", intentName);
        console.log("Meal type:", mealType);
        console.log(
            "Dietary preference:",
            dietaryPreference
        );

        if (intentName === "meal_recommendation" && mealType) {
            lastMealType = mealType.trim().toLowerCase();
        }


        // ==========================================
        // PERSONALIZED MEAL RECOMMENDATION
        // ==========================================

        if (
            intentName ===
            "personalized_meal_recommendation"
        ) {

            const recommendation =
                getMealRecommendation(
                    mealType,
                    dietaryPreference
                );


            if (recommendation) {

                return res.json({

                    reply: recommendation,

                    intent: intentName,

                    parameters: {
                        meal_type: mealType,
                        dietary_preference:
                            dietaryPreference
                    }

                });

            }

        }


        // ==========================================
// DIETARY INFORMATION
// ==========================================

if (
    intentName === "dietary_information" &&
    dietaryPreference &&
    lastMealType
) {

    const recommendation =
        getMealRecommendation(
            lastMealType,
            dietaryPreference
        );

    if (recommendation) {

        return res.json({

            reply: recommendation,

            intent: intentName,

            parameters: {
                meal_type: lastMealType,
                dietary_preference: dietaryPreference
            }

        });

    }
}


// ==========================================
// NORMAL DIALOGFLOW RESPONSE
// ==========================================

return res.json({

    reply: result.fulfillmentText,

    intent: intentName,

    parameters: result.parameters

});


    } catch (error) {

        console.error(
            "Dialogflow error:",
            error
        );


        return res.status(500).json({

            error:
                "Something went wrong connecting to Dialogflow."

        });

    }

});


// ==========================================
// SERVER STATUS
// ==========================================

app.get("/", (req, res) => {

    res.send(
        "NutriCare Dialogflow server is running!"
    );

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`NutriCare chatbot server running on port ${PORT}`);
});