const { ObjectId, Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: ObjectId,
  username: {
    type: String,
    required: true,
  },
});

module.exports = model("User", userSchema);
