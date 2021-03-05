import express from "express";
import { config } from "./config/config";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";
async function init() {
  const app = express();

  const PORT = config.port || 3000;
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api", router);

  app.listen(PORT, () => {
    console.log("Server on port", PORT);
  });
}
init();
