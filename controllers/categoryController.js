const Category = require("../models/category");
const Part = require("../models/part");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Category List",
    list_categories: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category] = await Promise.all([
    Category.findById(req.params.id).populate("name").exec(),
  ]);

  if (category === null) {
    const err = new Error("category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: category.name,
    category: category,
  });
});

exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create category" });
};

exports.category_create_post = [
  body("name", "category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete GET");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete POST");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update GET");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update POST");
});
