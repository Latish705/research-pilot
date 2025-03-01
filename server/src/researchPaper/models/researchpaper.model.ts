import mongoose, { Schema, Model, Document } from "mongoose";
import env from "dotenv";
import { IResearchPaper, IResearchPaperModel } from "../types/researchpaper.type";

env.config();

const ResearchPaperSchema = new Schema<IResearchPaper>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    profile_pic: { type: String, required: false }, // Optional
    collaborators: { type: [String], required: false }, // Optional
}, { timestamps: true });

const ResearchPaper: IResearchPaperModel = mongoose.model<IResearchPaper, IResearchPaperModel>("ResearchPaper", ResearchPaperSchema);

export default ResearchPaper;
