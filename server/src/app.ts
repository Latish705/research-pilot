import express from "express";
import cors from "cors";
// import appRouter from "./route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use("/api", appRouter);

export default app;
