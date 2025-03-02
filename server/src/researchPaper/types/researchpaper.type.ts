import mongoose, { Document } from "mongoose";
import { IUser } from "../../user/models/user.model";

export interface IResearchPaper extends Document {
  title: string;
  author: IUser["_id"];
  content: string;
  collaborators: string[];
}
export interface IResearchPaperModel extends mongoose.Model<IResearchPaper> {}
