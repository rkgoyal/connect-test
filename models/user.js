const mongoose = require('mongoose');

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
  humanapi:{
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

const User = module.exports = mongoose.model('User', UserSchema);
