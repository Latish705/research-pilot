import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import {
  addCollaborator,
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

researchPaperRouter.post("/addCollaborator", verifyToken, addCollaborator);

export default researchPaperRouter;
