const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    rating: Number,
    imageURL: String,
    location: {type:String, coordinates:[Number]}
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  
  const Place = mongoose.model("User", placeSchema);
  
  module.exports = Place;