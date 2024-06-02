import mongoose from "mongoose";

const LinkModel = mongoose.Schema({
  originalUrl: { type: String, required: true },
  clicks: [{
    insertedAt: Date,
    ipAddress: String,
  }],
});

export default mongoose.model("links", LinkModel);