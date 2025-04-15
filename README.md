🧠 AssistantDocs – Documentación Asistida por IA
AssistantDocs es una solución en Node.js que permite responder preguntas automáticamente en base a documentación técnica, almacenada y procesada desde archivos de Google Drive. Utiliza un modelo de lenguaje (OpenAI) para generar respuestas fundamentadas únicamente en los documentos disponibles, ideal para automatizar soporte técnico o crear asistentes inteligentes.

🚀 Características
🔍 Búsqueda semántica de contenido en la documentación.

📚 Procesamiento de archivos PDF y Google Docs desde Drive.

🤖 Generación de respuestas con IA usando OpenAI.

🧩 Integración simple con n8n mediante HTTP API.

🗃️ Almacenamiento optimizado en PostgreSQL.

📦 Estructura del Proyecto
graphql
Copy
Edit
project/
├── auth/        # Manejo de credenciales de Google
├── drive/       # Extracción de archivos y estructura de carpetas
├── parser/      # Conversión de documentos a texto legible
├── query/       # Búsqueda semántica y recuperación de contexto
├── storage/     # Base de datos y embeddings
├── openai/      # Generación de respuestas con IA
└── server.js    # API HTTP que conecta con n8n
🧩 Uso con n8n
Levantar el servidor:

bash
Copy
Edit
node server.js
Agregar nodo HTTP Request en n8n:

Método: POST

URL: http://localhost:3000/ask

Body Type: JSON

Body:

json
Copy
Edit
{
  "question": "¿Cómo configuro el sistema para modo seguro?"
}
Recibir respuesta JSON:

json
Copy
Edit
{
  "answer": "Para configurar el sistema en modo seguro, debés ingresar al menú de ajustes..."
}
⚙️ Requisitos
Node.js 18+

PostgreSQL

API Key de OpenAI

Acceso a Google Drive + APIs habilitadas

🛠️ Instalación

Instalá las dependencias:

npm install

Configurá el entorno:

Renombrá el archivo .env.example a .env y completá las variables necesarias:

cp .env.example .env

🧪 Ejecutar el servidor

node server.js

Esto iniciará un servidor en http://localhost:3000/ask.

🔐 .env.example

# OpenAI
OPENAI_API_KEY=sk-...

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=tu_clave
PG_DATABASE=assistant_docs

# Opcional
PORT=3000
EMBEDDING_MODEL=text-embedding-ada-002
GPT_MODEL=gpt-3.5-turbo

⚠️ El archivo credentials.json (descargado desde Google Cloud) debe colocarse en la carpeta auth/.

📌 Notas
Para usar Google Drive, asegurate de haber compartido las carpetas o archivos con el email de servicio (Client Email).

Podés usar ngrok o similar para exponer localmente tu servidor a n8n cloud.

Este proyecto está pensado para crecer modularmente: podés sumar soporte para otros formatos, agregar logs, límites de consultas y mucho más.