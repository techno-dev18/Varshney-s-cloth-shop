import express from "express";
import Product from "../models/ProductModel.js";

const router = express.Router();


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {

    console.error(
      "Error fetching products:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
});


// GET ONE PRODUCT
router.get("/:productId", async (req, res) => {
  try {

    const product =
      await Product.findById(
        req.params.productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    console.error(
      "Error fetching product:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});


// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {

    const newProduct =
      new Product(req.body);

    const savedProduct =
      await newProduct.save();

    res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      product: savedProduct
    });

  } catch (error) {

    console.error(
      "Error creating product:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create product"
    });
  }
});


// UPDATE PRODUCT
router.put("/:productId", async (req, res) => {
  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {

    console.error(
      "Error updating product:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update product"
    });
  }
});


// DELETE PRODUCT
router.delete("/:productId", async (req, res) => {
  try {

    const deletedProduct =
      await Product.findByIdAndDelete(
        req.params.productId
      );

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
      product: deletedProduct
    });

  } catch (error) {

    console.error(
      "Error deleting product:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete product"
    });
  }
});

export default router;