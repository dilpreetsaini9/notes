import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
// import readIpAddress from "./middleware/getIpAddress.js";

const app = express();

app.use(cors());
// app.use(readIpAddress);
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
