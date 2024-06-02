import mongoose from "mongoose";

const UserModel = mongoose.Schema({
  name: { type: String, required: true, default: "ploni" },
  // email: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
});

export default mongoose.model("users", UserModel);