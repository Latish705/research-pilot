import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";

const researchPaperRouter = Router();

researchPaperRouter.get("/",verifyToken);
researchPaperRouter.post("/",verifyToken);


export default researchPaperRouter;
