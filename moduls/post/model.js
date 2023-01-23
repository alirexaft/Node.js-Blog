const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {type: String},
  body: {type: String},
  createdDate: { type: Date, default: Date.now },
  updatedDate: {type: Date}
});

module.exports = mongoose.model("post", postSchema);