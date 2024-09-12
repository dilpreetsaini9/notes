import { exec } from "child_process";
import open from "open";

exec("nodemon ../index.js", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting the server: ${err.message}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});

open("http://localhost:8085");
