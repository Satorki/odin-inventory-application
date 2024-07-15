const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  cast: [{ type: Schema.Types.ObjectId, ref: "Actor", required: true }],
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre", required: true }],
});

FilmSchema.virtual("url").get(function () {
  return `/film/${this._id}`;
});

module.exports = mongoose.model("Film", FilmSchema);
