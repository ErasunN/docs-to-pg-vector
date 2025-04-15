require("dotenv").config();
const express = require("express");
const { generateAnswer } = require("./openai/respond");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/ask", async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: "Falta la pregunta." });
    }

    try {
        const answer = await generateAnswer(question);
        res.json({ answer });
    } catch (err) {
        console.error("Error al generar respuesta:", err);
        res.status(500).json({ error: "Error interno al procesar la pregunta." });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'AssistantDocs server is running',
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => {
    console.log(`🧠 Servidor corriendo en http://localhost:${PORT}/ask`);
});
