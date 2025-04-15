module.exports = {
    OPENAI_API_KEY: "tu_openai_api_key",
    GOOGLE_CREDENTIALS_PATH: "./auth/credentials.json",
    CHUNK_SIZE: 500,
    OVERLAP: 50,
    POSTGRES: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "password",
      database: "docs_ia"
    },
    RATE_LIMIT: {
      maxCallsPerDay: 500, // o lo que vos definas
      delayMs: 300          // tiempo entre llamadas en ms
    }
  };
  