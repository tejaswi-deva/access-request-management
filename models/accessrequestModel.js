const mongoose = require("mongoose");

const accessRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,required: true, trim: true
    },

    description: {
      type: String, required: true, trim: true
    },

    status: {
      type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING"
    },

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },

    actionedBy: {
      type: mongoose.Schema.Types.ObjectId, ref: "User"
    },

    actionedAt: {
      type: Date
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("AccessRequest", accessRequestSchema);
