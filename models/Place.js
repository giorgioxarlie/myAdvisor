const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    imageURL: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=50&h=50" },
    description: String,
    location: {lng:Number,lat:Number},
    ratings:[]
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  
  const Place = mongoose.model("Place", placeSchema);
  
  module.exports = Place;