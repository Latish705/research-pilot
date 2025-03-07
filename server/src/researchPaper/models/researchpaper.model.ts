import mongoose, { Schema, Model } from "mongoose";
import env from "dotenv";
import { IResearchPaper } from "../types/researchpaper.type";

env.config();

export interface IResearchPaperModel extends Document {
  title: string;
  content: string;
}

const ResearchPaperSchema = new Schema<IResearchPaper>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }, // Added to match IResearchPaper
  },
  { timestamps: true }
);

const ResearchPaper = mongoose.model("ResearchPaper", ResearchPaperSchema);

export default ResearchPaper;
