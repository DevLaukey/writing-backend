const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paperId: {
    type: Number,
    required: true,
  },
  deadline: {
    type: String,
    
  },
  pages: {
    type: Number,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  costPerPage: {
    type: Number,
    required: true,
  },
  assigned: {
    type: String,
    default: false,
  },
  attachments: {
    type: Buffer,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("order", orderSchema);
