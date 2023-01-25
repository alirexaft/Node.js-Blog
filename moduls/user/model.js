const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


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
userSchema.plugin(mongoosePaginate);
const User = mongoose.model("user", userSchema);
User.paginate().then({});

module.exports = User;