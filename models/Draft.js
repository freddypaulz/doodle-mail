const mongoose = require('mongoose');

const DraftSchema = mongoose.Schema({
   from: {
      type: String,
      required: true,
      maxlength: [50, 'cannot exceed 20 charecters'],
   },
   to: {
      type: String,
      maxlength: [50, 'cannot exceed 20 charecters'],
   },
   subject: {
      type: String,
   },
   msg: {
      type: String,
   },
   status: {
      type: String,
      required: true,
   },
   time: {
      type: Date,
      default: Date.now,
   },
});

const Draft = mongoose.model('Draft', DraftSchema);

module.exports = Draft;
