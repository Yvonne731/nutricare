// ===============================
// NutriCare Hybrid Chatbot
// Rule-Based + Dialogflow Component
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // CHATBOT ELEMENTS
    // ===============================

    const chatButton = document.getElementById("chatButton");
    const chatWindow = document.getElementById("chatWindow");
    const chatClose = document.getElementById("chatClose");

    const chatBody = document.getElementById("chatBody");
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");


    // ===============================
    // OPEN CHATBOT
    // ===============================

    chatButton.addEventListener("click", () => {

        chatWindow.classList.add("show");
        chatButton.classList.add("hidden");

        chatInput.focus();

    });


    // ===============================
    // CLOSE CHATBOT
    // ===============================

    chatClose.addEventListener("click", () => {

        chatWindow.classList.remove("show");
        chatButton.classList.remove("hidden");

    });


    // ===============================
    // SEND MESSAGE
    // ===============================

    async function sendMessage() {

        const userMessage = chatInput.value.trim();

        if (userMessage === "") {
            return;
        }

        // Show user's message
        addUserMessage(userMessage);

        // Clear input
        chatInput.value = "";


        // =================================
        // STEP 1: CHECK RULE-BASED CHATBOT
        // =================================

        const response = getRuleBasedResponse(userMessage);


        // =================================
        // STEP 2: RULE-BASED RESPONSE FOUND
        // =================================

        if (response !== null) {

            setTimeout(() => {

                addBotMessage(response);

            }, 400);

            return;

        }


        // =================================
        // STEP 3: NO RULE MATCH
        // SEND TO DIALOGFLOW
        // =================================

        try {

            // Temporary thinking message
            addBotMessage("💭 Let me think...");


            const result = await fetch(
                "https://digestive-giving-hippopotamus.abasthan.app/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );


            const data = await result.json();


            // =================================
            // REMOVE THINKING MESSAGE
            // =================================

            const messages =
                chatBody.querySelectorAll(".bot-message");

            if (messages.length > 0) {

                messages[messages.length - 1].remove();

            }


            // =================================
            // DISPLAY DIALOGFLOW RESPONSE
            // =================================

            if (data.reply) {

                addBotMessage(data.reply);

            } else {

                addBotMessage(
                    "🤔 I'm not sure how to answer that yet."
                );

            }

        } catch (error) {

            console.error(
                "Dialogflow connection error:",
                error
            );

            addBotMessage(
                "⚠️ I'm having trouble connecting to the NutriCare Assistant right now. Please try again later."
            );

        }

    }


    // ===============================
    // USER MESSAGE
    // ===============================

    function addUserMessage(message) {

        const messageElement =
            document.createElement("div");

        messageElement.classList.add(
            "user-message"
        );

        messageElement.textContent = message;

        chatBody.appendChild(messageElement);

        scrollToBottom();

    }


    // ===============================
    // BOT MESSAGE
    // ===============================

    function addBotMessage(message) {

        const messageElement =
            document.createElement("div");

        messageElement.classList.add(
            "bot-message"
        );

        messageElement.textContent = message;

        chatBody.appendChild(messageElement);

        scrollToBottom();

    }


    // ===============================
    // RULE-BASED CHATBOT
    // ===============================

    function getRuleBasedResponse(message) {

        const text = message
            .toLowerCase()
            .trim();


        // =================================
        // 1. GREETING
        // =================================

        if (
            text === "hi" ||
            text === "hello" ||
            text === "hey" ||
            text.includes("good morning") ||
            text.includes("good afternoon") ||
            text.includes("good evening")
        ) {

            return "👋 Hello! I'm the NutriCare Assistant. I can help you with basic nutrition information and NutriCare's features. What would you like to know?";

        }


        // =================================
        // 2. GOODBYE
        // =================================

        if (
            text === "bye" ||
            text === "goodbye" ||
            text.includes("see you")
        ) {

            return "👋 Goodbye! Take care and have a healthy day! 🌿";

        }


        // =================================
        // 3. THANKS
        // =================================

        if (
            text.includes("thank you") ||
            text.includes("thankyou") ||
            text.includes("thanks") ||
            text.includes("thx")
        ) {

            return "😊 You're welcome! I'm happy to help.";

        }


        // =================================
        // 4. HELP
        // =================================

        if (
            text === "help" ||
            text.includes("what can you do") ||
            text.includes("how can you help")
        ) {

            return "🌿 I can provide basic nutrition information and help you find NutriCare features such as recipes, nutrition tracking and fitness resources.";

        }


        // =================================
        // 5. PROTEIN
        // =================================

        if (
            text.includes("protein")
        ) {

            return "🥚 Protein is an important nutrient that helps support growth and repair. Sources include eggs, chicken, fish, tofu, beans, lentils, milk and yogurt.";

        }


        // =================================
        // 6. CARBOHYDRATES
        // =================================

        if (
            text.includes("carbohydrate") ||
            text.includes("carbohydrates") ||
            text.includes("carbs")
        ) {

            return "🍚 Carbohydrates are an important source of energy. Sources include rice, oats, potatoes, fruits and whole-grain foods.";

        }


        // =================================
        // 7. FATS
        // =================================

        if (
            text.includes("fat") ||
            text.includes("fats")
        ) {

            return "🥑 Fat is an important nutrient. Sources of unsaturated fats include avocado, nuts, seeds, olive oil and some fish. Balanced portions are important.";

        }


        // =================================
        // 8. VITAMINS & MINERALS
        // =================================

        if (
            text.includes("vitamin") ||
            text.includes("vitamins") ||
            text.includes("mineral") ||
            text.includes("minerals")
        ) {

            return "🍊 Vitamins and minerals are essential nutrients that support different functions in the body. Eating a varied diet containing fruits, vegetables, whole grains and protein-rich foods can help provide them.";

        }


        // =================================
        // 9. FIBRE
        // =================================

        if (
            text.includes("fibre") ||
            text.includes("fiber")
        ) {

            return "🌾 Fibre is found in foods such as fruits, vegetables, beans, lentils, oats and whole grains. Including a variety of fibre-rich foods can support healthy digestion.";

        }


        // =================================
        // 10. BALANCED DIET
        // =================================

        if (
            text.includes("balanced diet") ||
            text.includes("balanced meal")
        ) {

            return "🌿 A balanced diet includes a variety of foods such as vegetables, fruits, whole grains, protein-rich foods and healthy sources of fat. Variety and appropriate portions are important.";

        }


        // =================================
        // 11. HYDRATION
        // =================================

        if (
            text.includes("water") ||
            text.includes("hydration") ||
            text.includes("hydrated")
        ) {

            return "💧 Staying hydrated is important for overall health. Drink water regularly throughout the day, with your needs varying depending on factors such as activity and weather.";

        }


        // =================================
        // 12. RECIPES
        // =================================

        if (
            text.includes("recipe") ||
            text.includes("recipes")
        ) {

            return "🍳 You can explore the Healthy Recipes section of NutriCare for different meal ideas.";

        }


        // =================================
        // 13. NUTRITION TRACKER
        // =================================

        if (
            text.includes("nutrition tracker") ||
            text.includes("track nutrition")
        ) {

            return "📊 NutriCare's Nutrition Tracker allows you to record your daily nutrition information and view your progress using charts.";

        }


        // =================================
        // 14. FITNESS
        // =================================

        if (
            text.includes("fitness") ||
            text.includes("workout") ||
            text.includes("exercise")
        ) {

            return "🏃 You can visit NutriCare's Fitness section for beginner-friendly workout routines, exercise information and fitness tips.";

        }


        // =================================
        // 15. NUTRICARE
        // =================================

        if (
            text.includes("nutricare") ||
            text.includes("what is this website") ||
            text.includes("what is this app")
        ) {

            return "🌿 NutriCare is a web-based healthy living platform designed to help students explore nutrition information, recipes, nutrition tracking and fitness resources.";

        }


        // =================================
        // NO RULE MATCH
        // Send to Dialogflow
        // =================================

        return null;

    }


    // ===============================
    // SEND BUTTON
    // ===============================

    chatSend.addEventListener("click", () => {

        sendMessage();

    });


    // ===============================
    // ENTER KEY
    // ===============================

    chatInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            sendMessage();

        }

    });


    // ===============================
    // SCROLL
    // ===============================

    function scrollToBottom() {

        chatBody.scrollTop =
            chatBody.scrollHeight;

    }

});