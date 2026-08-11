import ProductModel from "../models/ProductModel.js";


// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {

    const products = await ProductModel.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products: products,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {

    const { productName } = req.params;

    const product =
      await ProductModel.findOne({
        productName: productName,
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: product,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};


// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {

    const product =
      await ProductModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: product,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {

    const { productName } = req.params;

    const deletedProduct =
      await ProductModel.findOneAndDelete({
        productName: productName,
      });

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};