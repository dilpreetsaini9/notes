import express from "express";
import upload from "../middleware/multer.js";
import { downloadFiles, redirectFallfack } from "../controllers/index.js";
import noteCTLR from "../controllers/noteController.js";
import fileCTLR from "../controllers/fileController.js";
import postCTLR from "../controllers/postController.js";
import auth from "../controllers/auth.js";
import verifyHcaptcha from "../middleware/hcaptcha.js";
import sessionChecker from "../middleware/sessionChecker.js";

const router = express.Router();

router.get("/", sessionChecker, noteCTLR.main);
router.get("/post", sessionChecker, noteCTLR.getPost);
router.get("/files", sessionChecker, fileCTLR.getFiles);
router.get("/newfile", sessionChecker, fileCTLR.uploadFile);
router.get("/newnote", sessionChecker, noteCTLR.newNote);

router.get("/download/:filename", sessionChecker, downloadFiles);
router.post(
  "/newfile",
  sessionChecker,
  upload.single("fileUpload"),
  postCTLR.uploadFile
);
router.post("/", sessionChecker, postCTLR.uploadNote);
router.get("/auth", auth.authPage);
router.post(
  "/auth",
  express.urlencoded({ extended: true }),
  verifyHcaptcha,
  auth.verifyPassword
);
router.delete("/deletefile/:id", sessionChecker, fileCTLR.deleteFiles);
router.delete("/deletenote/:id", sessionChecker, noteCTLR.deleteNote);

router.get("*", sessionChecker, redirectFallfack);

export default router;
