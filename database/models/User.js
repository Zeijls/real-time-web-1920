const { ObjectId, Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: ObjectId,
  username: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: false,
  },
});

module.exports = model("User", userSchema);
