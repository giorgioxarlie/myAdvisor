const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    imgURL: String,
    myreviews: [{type: Schema.ObjectId, ref: 'Review'}],
    facebookID: String,
    googleID:String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

