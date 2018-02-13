const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
    place : Schema.Types.ObjectId,
    comment: String,
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  
  const Comments = mongoose.model("Comment", commentSchema);
  
  module.exports = Comments;