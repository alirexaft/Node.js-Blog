const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String }, 
  token: { type: String },
  role: { type: String, enum: ['Admin', 'Writer','User' ]},
  actionLimits: {type: String, enum: ['create-comment', 'create-post']},
  isDeleted: {type: Boolean, default: false},
  deletedDate: {type: Date},

});
module.exports = mongoose.model("user", userSchema);