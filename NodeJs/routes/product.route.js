import express from "express";
import {
  getProductonscc,
  getProducts,
  getProductsonPrice,
  getProductsOnscc,
  insertProductData,
} from "../controller/product.controller";
import { checkSession } from "../controller/session.controller";

const router = express.Router();

router.post("/insert-product", insertProductData); ///api to insert product data.
router.post("/get-all-products", getProducts); ///api to get all products. No body required
router.post("/get-products", getProductsOnscc); ///api to get products on the basis of id(category or subcategory id's) passed in body. idcan be subcategoryId or categoryId.
router.post("/get-product-price-filter", getProductsonPrice); ///api to get products on price filter
router.post("/get-product/:cname/:scname", getProductonscc); ///api to get products on category name and sub category name on basis of params.

export default router;
