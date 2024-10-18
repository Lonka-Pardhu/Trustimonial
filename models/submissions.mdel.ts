// models/Submission.ts
import { Schema, model, models } from "mongoose";

const submissionSchema = new Schema(
  {
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Submission || model("Submission", submissionSchema);
