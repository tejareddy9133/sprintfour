const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("posts", PostSchema);
module.exports = { postModel };
