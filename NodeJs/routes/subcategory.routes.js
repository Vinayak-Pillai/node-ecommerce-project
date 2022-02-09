import express from "express";
import { checkSession } from "../controller/session.controller";
import {
  getSubcategory,
  getSubcategoryonCategory,
  insertSubcategoryData,
} from "../controller/subcategory.controller";

const router = express.Router();

router.post("/insert-subcategory", insertSubcategoryData); ///api to insert subcategory. Pass the categoryId in body.
router.post("/get-all-subcategories", getSubcategory); ///api to get all subcategories. No body required.
router.post("/get-subcategories", getSubcategoryonCategory); ///api to get subcategories on the basis of category id passed in body.

export default router;
