const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },

  humanapi: {

      humanId: {
        type: String,
        required: false
      },
      accessToken: {
        type: String,
        required: false
      },
      clientUserId: {
        type: String,
        required: false
      },
      publicToken: {
        type: String,
        required: false
      }
  }
});

UserSchema.plugin(timestamps);
const User = module.exports = mongoose.model('User', UserSchema);
