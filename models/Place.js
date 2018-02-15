const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    imageURL: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=100&h=100" },
    description: String,
    location: {lng:Number,lat:Number},
    reviews: [{type: Schema.ObjectId, ref: 'Review'}]
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  
  const Place = mongoose.model("Place", placeSchema);
  
  module.exports = Place;