import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    spaces: [{ type: Schema.Types.ObjectId, ref: "Space" }],
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
