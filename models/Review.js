const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
    header: String,
    comment: String,
    imageURL:[String],
    ratings:{
        firstProperty: Number,
        secondProperty: Number,
    }
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  
  const Review = mongoose.model("Review", reviewSchema);
  
  module.exports = Review;