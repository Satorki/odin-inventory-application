const express = require("express");
const router = express.Router();

const part_controller = require("../controllers/partController");
const category_controller = require("../controllers/categoryController");

router.get("/", part_controller.index);

router.get("/part/create", part_controller.part_create_get);
router.post("/part/create", part_controller.part_create_post);

router.get("/part/:id/delete", part_controller.part_delete_get);
router.post("/part/:id/delete", part_controller.part_delete_post);

router.get("/part/:id/update", part_controller.part_update_get);
router.post("/part/:id/update", part_controller.part_update_post);

router.get("/part/:id", part_controller.part_detail);
router.get("/parts", part_controller.part_list);

router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);

router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);

router.get("/category/:id", category_controller.category_detail);
router.get("/categories", category_controller.category_list);

module.exports = router;
