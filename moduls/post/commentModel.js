const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  text: {type: String},
  status: {type: String, enum: ['pending', 'comfirmed']},
  createdDate: { type: Date, default: Date.now },
  isDeleted: {type: Boolean, default: false},
  deletedDate: {type: Date}
});

module.exports = mongoose.model("comment", commentSchema);