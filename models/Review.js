const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
    place : {type: Schema.ObjectId, ref: 'Place'},
    owner: {type: Schema.ObjectId, ref: 'User'},
    propx: Number,
    propy: Number,
    avgrev: Number,
    comment: String
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  
  const Review = mongoose.model("Review", reviewSchema);
  
  module.exports = Review;