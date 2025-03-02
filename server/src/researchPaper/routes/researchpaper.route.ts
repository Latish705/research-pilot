import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import { handleGetResearchPaper, handleSaveResearchPaper } from "../controllers/researchpaper.controller";

const researchPaperRouter = Router();

researchPaperRouter.get("/:paperId",verifyToken,handleGetResearchPaper);
researchPaperRouter.post("/save",verifyToken,handleSaveResearchPaper);


export default researchPaperRouter;
