import mongoose, { Document, Schema } from "mongoose";
import { IResearchPaper } from "../types/researchpaper.type";
import { IUser } from "../../user/models/user.model";

export interface IPaperUser extends Document {
  paperId: IResearchPaper["_id"];
  userId: IUser["_id"];
  role: string;
  status: string;
}

const PaperUserSchema = new Schema<IPaperUser>(
  {
    paperId: {
      type: Schema.Types.ObjectId,
      ref: "ResearchPaper",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true, default: "viewer" },
  },
  { timestamps: true }
);

const PaperUser = mongoose.model<IPaperUser>("PaperUser", PaperUserSchema);

export default PaperUser;
