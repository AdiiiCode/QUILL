const mongoose = require("mongoose");

const Blogs = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  snippets: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  im:{
    type:String,
  },
},
{
  timestamps: true,
});

const blogs = mongoose.model("Blogs Data", Blogs);

module.exports = blogs;
