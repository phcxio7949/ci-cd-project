const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  //   email: {
  //     type: String,
  //     required: true,
  //     // unique: true
  //   },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   imgPath: {
  //     type: String,
  //     default: URL,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
