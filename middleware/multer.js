import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 999);
    const extension = path.extname(file.originalname);
    cb(null, req.body.title + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

export default upload;
