const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  allowed: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  group: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'devicegroup'
  }]
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);