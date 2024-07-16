const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  price: { type: Number, required: true },
  stock: { type: Number },
});

PartSchema.virtual("url").get(function () {
  return `/parts/${this._id}`;
});

module.exports = mongoose.model("Part", PartSchema);
