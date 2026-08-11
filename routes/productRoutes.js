import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";
const router = express.Router();
// GET ALL PRODUCTS
router.get("/", getProducts);
// GET ONE PRODUCT
router.get("/:productName", getProduct);
// CREATE PRODUCT
router.post("/", createProduct);
// DELETE PRODUCT
router.delete("/:productName", deleteProduct);
export default router;