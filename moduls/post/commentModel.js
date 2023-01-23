const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
  text: {type: String},
  status: {type: String, enum: ['pending', 'comfirmed']},
  createdDate: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("comment", commentSchema);