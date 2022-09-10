import * as dotenv from "dotenv";
import { app } from "electron";

dotenv.config();
export default Object.freeze({
  production: app.isPackaged,
  storeKey: "6tnTXEC5Xgf2qiNn8vXrun4F9srToGG3uVjPf4Vw",
  apiId: process.env.API_ID || "",
  apiHash: process.env.API_HASH || "",
});
