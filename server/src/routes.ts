import { Router } from "express";
import userRouter from "./user/routes/user.route";
import researchPaperRouter from "./researchPaper/routes/researchpaper.route";

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/researchpaper",researchPaperRouter)

export default appRouter;
