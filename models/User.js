const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    imgURL: {type:String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=100&h=100" },
    myreviews: [{type: Schema.Types.ObjectId,ref: 'Review'}],
    facebookID: String,
    googleID:String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

