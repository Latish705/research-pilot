import app from "./app";
import connectDb from "./utils/db";

const PORT = process.env.PORT || 8080;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}  url: http://localhost:${PORT}`
    );
  });
});
