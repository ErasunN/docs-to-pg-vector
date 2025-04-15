const { google } = require("googleapis");
const { GOOGLE_CREDENTIALS_PATH } = require("../config");
const fs = require("fs");

function getGoogleClient() {
  const credentials = JSON.parse(fs.readFileSync(GOOGLE_CREDENTIALS_PATH, "utf8"));

  const scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/documents.readonly"
  ];

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes
  });

  return google.auth.getClient({ credentials, scopes });
}

module.exports = {
  getGoogleClient
};
