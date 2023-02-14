const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", ListSchema);
