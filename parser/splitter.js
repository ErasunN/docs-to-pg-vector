const DEFAULT_CHUNK_SIZE = 1000; // en caracteres
const DEFAULT_OVERLAP = 100;

function splitDocument(doc, options = {}) {
  const chunkSize = options.chunkSize || DEFAULT_CHUNK_SIZE;
  const overlap = options.overlap || DEFAULT_OVERLAP;

  const chunks = [];
  const text = doc.content;
  let i = 0;
  let index = 0;

  while (i < text.length) {
    const chunkText = text.slice(i, i + chunkSize);
    chunks.push({
      documentId: doc.id,
      name: doc.name,
      index,
      content: chunkText,
    });
    index++;
    i += chunkSize - overlap;
  }

  return chunks;
}

function splitDocuments(docs, options = {}) {
  return docs.flatMap((doc) => splitDocument(doc, options));
}

export default {
  splitDocument,
  splitDocuments,
};
