import app from "./app";
import connectDb from "./utils/db";
import dotenv from "dotenv";
import { startWebSocketServer } from "./utils/ws";

dotenv.config();

const PORT = process.env.PORT || 8080;
connectDb().then(() => {
  app.listen(PORT, () => {
    startWebSocketServer();
    console.log(
      `Server running on port ${PORT}  url: http://localhost:${PORT}`
    );
  });
});
