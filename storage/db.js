require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

async function initTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS document_chunks (
      id SERIAL PRIMARY KEY,
      document_id TEXT,
      document_name TEXT,
      chunk_index INTEGER,
      content TEXT
    );
  `;
  await pool.query(query);
  console.log("🗂️ Tabla 'document_chunks' creada/verificada");
}

async function insertChunks(chunks) {
  const query = `
    INSERT INTO document_chunks (document_id, document_name, chunk_index, content)
    VALUES ($1, $2, $3, $4)
  `;

  for (const chunk of chunks) {
    await pool.query(query, [
      chunk.documentId,
      chunk.name,
      chunk.index,
      chunk.content,
    ]);
  }

  console.log(`✅ Se insertaron ${chunks.length} fragmentos`);
}

async function clearTable() {
  await pool.query(`DELETE FROM document_chunks`);
  console.log("🧹 Tabla limpiada");
}

module.exports = {
  initTable,
  insertChunks,
  clearTable,
};
