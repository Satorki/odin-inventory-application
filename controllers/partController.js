const Part = require("../models/part");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [numParts, numCategories] = await Promise.all([
    Part.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Computer Parts Shop",
    part_count: numParts,
    category_count: numCategories,
  });
});

exports.part_list = asyncHandler(async (req, res, next) => {
  const allParts = await Part.find({}, "Part name")
    .sort({ name: 1 })
    .populate("name")
    .exec();

  res.render("part_list", { title: "Part list", part_list: allParts });
});

exports.part_detail = asyncHandler(async (req, res, next) => {
  const [part] = await Promise.all([
    Part.findById(req.params.id).populate("name").populate("category").exec(),
  ]);

  if (part === null) {
    // No results.
    const err = new Error("part not found");
    err.status = 404;
    return next(err);
  }

  res.render("part_detail", {
    name: part.name,
    part: part,
  });
});

exports.part_create_get = asyncHandler(async (req, res, next) => {
  const [allCategories] = await Promise.all([
    Category.find().sort({ name: 1 }).exec(),
  ]);

  res.render("part_form", {
    title: "Create Part",
    categories: allCategories,
  });
});

exports.part_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),
  body("stock", "Stock must not be empty but can be 0")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const part = new Part({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const [allCategories] = await Promise.all([
        Category.find().sort({ name: 1 }).exec(),
      ]);

      for (const category of allCategories) {
        if (book.category.indexOf(category._id) > -1) {
          category.checked = "true";
        }
      }
      res.render("part_form", {
        title: "Create Part",
        categories: allCategories,
        errors: errors.array(),
      });
    } else {
      await part.save();
      res.redirect(part.url);
    }
  }),
];

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
