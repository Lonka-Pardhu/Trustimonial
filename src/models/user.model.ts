import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  spaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Space" }], // Array of space IDs
});

const User = models.User || model("User", userSchema);

export default User;
