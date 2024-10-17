const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    cv: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CV', 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true 
    },
    content: {
      type: String,
      required: true 
    }
  },
  {timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
