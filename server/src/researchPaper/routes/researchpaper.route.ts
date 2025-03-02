import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import {
  handleGetAllPaper,
  handleGetResearchPaper,
  handleSaveResearchPaper,
  handleUpdateResearchPaper,
} from "../controllers/researchpaper.controller";

const researchPaperRouter = Router();

researchPaperRouter.get("/:paperId", verifyToken, handleGetResearchPaper);
researchPaperRouter.post("/save", verifyToken, handleSaveResearchPaper);
researchPaperRouter.put(
  "/update/:paperId",
  verifyToken,
  handleUpdateResearchPaper
);
researchPaperRouter.get("/", verifyToken, handleGetAllPaper);

export default researchPaperRouter;
