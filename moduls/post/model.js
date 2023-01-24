const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: {type: String},
  body: {type: String},
  createdDate: { type: Date, default: Date.now },
  updatedDate: {type: Date},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
  status: {type: String, enum: ['pending', 'confirmed']},
  isDeleted: {type: Boolean, default: false},
  deletedDate: {type: Date}

});

module.exports = mongoose.model("post", postSchema);