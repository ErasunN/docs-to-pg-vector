require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

async function searchChunks(queryText, limit = 5) {
  const query = `
    SELECT document_id, document_name, chunk_index, content,
           similarity(content, $1) AS score
    FROM document_chunks
    WHERE content % $1
    ORDER BY score DESC
    LIMIT $2
  `;
  const result = await pool.query(query, [queryText, limit]);

  return result.rows;
}

module.exports = {
  searchChunks,
};
