import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const redirectFallfack = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  res.redirect("/");
};

const downloadFiles = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      if (!res.headersSent) {
        console.error("Error downloading file:", err);
        res.status(404).send("File not found.");
      }
    }
  });
};

export { redirectFallfack, downloadFiles };
