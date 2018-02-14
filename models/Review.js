const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
    place : Schema.Types.ObjectId,
    stars: Number,
    //tag:?
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  
  const Review = mongoose.model("Review", reviewSchema);
  
  module.exports = Review;