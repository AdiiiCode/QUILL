const mongoose = require("mongoose");

const Signup = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
});

const SignUp = mongoose.model("SignUp", Signup);

module.exports = SignUp;
