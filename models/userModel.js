const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, required: true, trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["REQUESTER", "APPROVER"],
      required: true
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("User", userSchema);
