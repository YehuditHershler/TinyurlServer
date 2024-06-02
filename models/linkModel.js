import mongoose from "mongoose";

const LinkModel = mongoose.Schema({
  originalUrl: { type: String, required: true },
  clicks: [{
    insertedAt: Date,
    ipAddress: String,
    targetParamValue: String,
  }],
  targetParamName: String,
  targetValues: [{
    name: String,
    value: String,
  }],
});

export default mongoose.model("links", LinkModel);
// const LinkModel = mongoose.model('Link', linkSchema);