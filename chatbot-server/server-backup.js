const express = require("express");
const cors = require("cors");
const dialogflow = require("@google-cloud/dialogflow");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const projectId = "nutricare-26a6a";

const sessionsClient = new dialogflow.SessionsClient();

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const sessionId = "nutricare-user-session";

        const sessionPath =
            sessionsClient.projectAgentSessionPath(
                projectId,
                sessionId
            );

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

        res.json({
            reply: result.fulfillmentText,
            intent: result.intent
                ? result.intent.displayName
                : null,
            parameters: result.parameters
        });

    } catch (error) {

        console.error("Dialogflow error:", error);

        res.status(500).json({
            error: "Something went wrong connecting to Dialogflow."
        });

    }

});

app.get("/", (req, res) => {
    res.send("NutriCare Dialogflow server is running!");
});

app.listen(PORT, () => {

    console.log(
        `NutriCare chatbot server running at http://localhost:${PORT}`
    );

});