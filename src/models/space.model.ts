import { model, models, Schema } from "mongoose";

const spaceSchema = new Schema(
  {
    spaceName: { type: String, required: true },
    spaceUrlKey: {
      type: String,
      required: true,
    },
    
    spaceOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    // logoImage: { type: String, required: true }, //cloudinary url
    message: { type: String, required: true },
    questions: { type: [String], required: true }, // Array of questions
    submissions: [
      { type: Schema.Types.ObjectId, ref: "Submission", default: [] },
    ],
  },
  { timestamps: true }
);

const Space = models.Space || model("Space", spaceSchema);

export default Space;
