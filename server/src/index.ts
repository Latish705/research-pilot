import app from "./app";
import connectDb from "./utils/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}  url: http://localhost:${PORT}`
    );
  });
});
