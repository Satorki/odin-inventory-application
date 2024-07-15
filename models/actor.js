const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
});

ActorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

ActorSchema.virtual("url").get(function () {
  return `/actor/${this._id}`;
});

module.exports = mongoose.model("Actor", ActorSchema);
