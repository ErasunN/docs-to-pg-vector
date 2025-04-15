require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const { searchChunks } = require("../query/search");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateAnswer(userQuestion) {
  // Paso 1: Buscar contexto relevante en la base de datos
  const results = await searchChunks(userQuestion, 5);
  const context = results.map(r => r.content).join("\n---\n");

  // Paso 2: Armar prompt para el modelo
  const messages = [
    {
      role: "system",
      content: "Sos un soporte tecnico de latinad especializado en pantallas publicitarias en la via publica, un usuario te pidio el siguiente soporte, que responderias solo teniendo en cuenta la informacion suministrada en dataImportante y si no encuentras nada dentro de dataImportante quiero que me respondas con 'No encontre informacion' seguido de un - y el nombre para un ticket que represente ese problema",
    },
    {
      role: "user",
      content: `Documentación:\n${context}\n\nPregunta: ${userQuestion}`,
    },
  ];

  // Paso 3: Consultar a OpenAI
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.2,
  });

  return completion.data.choices[0].message.content.trim();
}

module.exports = {
  generateAnswer,
};
