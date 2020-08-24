const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   user_name: {
      type: String,
      required: true,
      maxlength: [50, 'cannot exceed 20 charecters'],
   },
   first_name: {
      type: String,
      required: true,
      maxlength: [50, 'cannot exceed 20 charecters'],
   },
   last_name: {
      type: String,
      required: true,
      maxlength: [50, 'cannot exceed 20 charecters'],
   },
   password: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
