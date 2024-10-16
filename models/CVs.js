const mongoose = require("mongoose");

const CVSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    description: {
      type: String,
      required: true
    },
    education: [
      {
        degree: {
          type: String,
          required: true
        },
        institution: {
          type: String,
          required: true
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date,
          required: false
        },
        description: {
          type: String,
          required: false
        }
      },
    ],
    experience: [
      {
        title: {
          type: String,
          required: true 
        },
        company: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: false
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date,
          required: false
        }
      },
    ],
    skills: {
      type: [String],
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    },
  },
);

const CV = mongoose.model('CV', CVSchema);

module.exports = CV;
