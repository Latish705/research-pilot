import mongoose, { Document, Schema } from "mongoose";

import { IUser } from "../../user/models/user.model";
import { IResearchPaperModel } from "./researchpaper.model";

export interface IPaperUser extends Document {
  paperId: IResearchPaperModel["_id"];
  collaboratorId: IUser["_id"];
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
    collaboratorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: { type: String, required: true, default: "viewer" },
  },
  { timestamps: true }
);

const PaperUser = mongoose.model<IPaperUser>("PaperUser", PaperUserSchema);

export default PaperUser;
