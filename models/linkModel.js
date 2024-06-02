  import mongoose from "mongoose";

  const LinkModel = mongoose.Schema({
    originalUrl: { type: String, required: true }
  });
  
  export default mongoose.model("links", LinkModel);