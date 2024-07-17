const Part = require("../models/part");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numParts, numCategories] = await Promise.all([
    Part.countDocuments({}).exec(),
    // Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Computer Parts Shop",
    nothing: 2,
    part_count: numParts,
    category_count: numCategories,
  });
});

exports.part_list = asyncHandler(async (req, res, next) => {
  const allParts = await Part.find({}, "Part name")
    .sort({ title: 1 })
    .populate("name")
    .exec();

  res.render("part_list", { title: "Part list", part_list: allParts });
});

exports.part_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Part detail: ${req.params.id}`);
});

exports.part_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Part create GET");
});

exports.part_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Part create POST");
});

exports.part_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Part delete GET");
});

exports.part_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Part delete POST");
});

exports.part_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Part update GET");
});

exports.part_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Part update POST");
});
