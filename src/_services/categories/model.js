const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const CategoryModel = new Schema(
  {
    category: { type: String, required: true },
    booksList: [{ type: Schema.Types.ObjectId, ref: "Books" }],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Categories", CategoryModel);
