import express from "express";
import {
  deleteCategory,
  getallCategories,
  insertCategoryData,
  updateCategories,
} from "../controller/category.controller";
import { checkSession } from "../controller/session.controller";

const router = express.Router();

router.post("/insert-category", insertCategoryData); //insert categories by passing c_name in body
router.post("/get-all-categories", getallCategories); //get all categories
router.post("/update-category", updateCategories); //updates the category when c_id is provided
router.post("/delete-category", deleteCategory); //deletes the category based on c_id

export default router;
