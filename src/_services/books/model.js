const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const BookModel = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Categories" },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", BookModel);
