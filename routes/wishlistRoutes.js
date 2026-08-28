import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();


// ===============================
// ADD TO WISHLIST
// ===============================

router.post("/", async (req, res) => {

  try {

    const {
      userId,
      productId
    } = req.body;

    if (!userId || !productId) {

      return res.status(400).json({
        success: false,
        message: "User and product are required"
      });

    }

    const existingItem =
      await Wishlist.findOne({
        user: userId,
        product: productId
      });

    if (existingItem) {

      return res.status(200).json({
        success: true,
        message: "Product already in wishlist",
        wishlistItem: existingItem
      });

    }

    const wishlistItem =
      await Wishlist.create({
        user: userId,
        product: productId
      });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlistItem
    });

  } catch (error) {

    console.error(
      "Add Wishlist Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist"
    });

  }

});


// ===============================
// GET USER WISHLIST
// ===============================

router.get("/:userId", async (req, res) => {

  try {

    const wishlist =
      await Wishlist.find({
        user: req.params.userId
      }).populate("product");

    res.status(200).json({
      success: true,
      wishlist
    });

  } catch (error) {

    console.error(
      "Get Wishlist Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist"
    });

  }

});


// ===============================
// REMOVE FROM WISHLIST
// ===============================

router.delete("/:wishlistId", async (req, res) => {

  try {

    const deletedItem =
      await Wishlist.findByIdAndDelete(
        req.params.wishlistId
      );

    if (!deletedItem) {

      return res.status(404).json({
        success: false,
        message: "Wishlist item not found"
      });

    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist"
    });

  } catch (error) {

    console.error(
      "Delete Wishlist Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to remove wishlist item"
    });

  }

});


export default router;