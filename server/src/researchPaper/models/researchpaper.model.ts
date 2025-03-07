import mongoose, { Schema, Model } from "mongoose";
import env from "dotenv";
import { IUser } from "../../user/models/user.model";

env.config();

export interface IResearchPaperModel extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id
  title: string;
  author: IUser["_id"];
  content: string;
}

const ResearchPaperSchema = new Schema<IResearchPaperModel>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }, // Added to match IResearchPaper
  },
  { timestamps: true }
);

const ResearchPaper = mongoose.model("ResearchPaper", ResearchPaperSchema);

export default ResearchPaper;
