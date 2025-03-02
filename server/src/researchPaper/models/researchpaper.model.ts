import mongoose, { Schema, Model } from "mongoose";
import env from "dotenv";
import { IResearchPaper, IResearchPaperModel } from "../types/researchpaper.type";

env.config();

const ResearchPaperSchema = new Schema<IResearchPaper>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true }, // Added to match IResearchPaper
    collaborators: { type: [String], required: false }, // Optional
  },
  { timestamps: true }
);

const ResearchPaper: IResearchPaperModel = mongoose.model<IResearchPaper, IResearchPaperModel>(
  "ResearchPaper",
  ResearchPaperSchema
);

export default ResearchPaper;
