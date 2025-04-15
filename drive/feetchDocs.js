const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const { authorize } = require("../auth/auth");
const RateLimiter = require("../utils/rateLimiter");
const { RATE_LIMIT } = require("../config");

const limiter = new RateLimiter(RATE_LIMIT);

async function fetchAllDocsFromDrive(startFolderId = "root") {
  const auth = await authorize();
  const drive = google.drive({ version: "v3", auth });
  const docs = google.docs({ version: "v1", auth });

  const allDocuments = [];

  async function deepSearch(folderId) {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType)",
    });

    for (const file of res.data.files) {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        // Carpeta: buscamos dentro de ella
        await deepSearch(file.id);
      } else if (file.mimeType === "application/vnd.google-apps.document") {
        await limiter.wait();
        const docContent = await docs.documents.get({ documentId: file.id });
        const text = extractTextFromGoogleDoc(docContent.data);
        allDocuments.push({
          id: file.id,
          name: file.name,
          content: text,
        });
        console.log(`✅ Documento procesado: ${file.name}`);
      }
    }
  }

  await deepSearch(startFolderId);
  return allDocuments;
}

// Utilidad para extraer texto de un Google Doc
function extractTextFromGoogleDoc(doc) {
  const text = [];
  const body = doc.body.content;
  for (const element of body) {
    if (element.paragraph?.elements) {
      for (const elem of element.paragraph.elements) {
        if (elem.textRun?.content) {
          text.push(elem.textRun.content.trim());
        }
      }
    }
  }
  return text.join("\n").trim();
}

module.exports = {
  fetchAllDocsFromDrive,
};
