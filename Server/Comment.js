const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({

  comment: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  cod:
  {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
