import client from "../database/redis.js";
import postService from "../services/postService.js";
import { convertSize } from "../utils/sizeConvertor.js";

const uploadFile = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  if (!req.body.title || !req.file) {
    return res.status(400).json({ error: "Title and file are required" });
  }
  const sizeOfFile = convertSize(req.file.size);
  const title = req.body.title;
  const filename = req.file.filename;
  const isUploaded = await postService.uploadFile(title, filename, sizeOfFile);
  if (isUploaded) {
    return res.redirect("/files");
  } else {
    return res.redirect("/");
  }
};

const uploadNote = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  if (!req.body) {
    return;
  }
  if (!req.body.titleValue) {
    return;
  }
  const title = req.body.titleValue;
  const payload = req.body.text;
  const isUploaded = await postService.uploadNote(title, payload);

  if (isUploaded) {
    return res.status(200).json({ message: "done" });
  } else {
    return res.status(400).json({ error: "SOMETHING WENT WRONG" });
  }
};
const postCTLR = {
  uploadFile,
  uploadNote,
};
export default postCTLR;
