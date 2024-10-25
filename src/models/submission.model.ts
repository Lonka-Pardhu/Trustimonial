import { Schema, model, models } from "mongoose";

const submissionSchema = new Schema(
  {
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    spaceUrlKey: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Submission = models.Submission || model("Submission", submissionSchema);

export default Submission;
