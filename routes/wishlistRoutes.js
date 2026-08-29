import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();


// ==========================================
// ADD PRODUCT TO WISHLIST
// POST /api/wishlist
// ==========================================

router.post("/", async (req, res) => {

  try {

    const {
      userId,
      productId
    } = req.body;


    // Check required fields

    if (!userId || !productId) {

      return res.status(400).json({
        success: false,
        message: "User and product are required"
      });

    }


    // Check if already in wishlist

    const existingItem =
      await Wishlist.findOne({
        user: userId,
        product: productId
      });


    if (existingItem) {

      return res.status(409).json({
        success: false,
        message: "Product already in wishlist",
        wishlistItem: existingItem
      });

    }


    // Create wishlist item

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

      message: "Failed to add product to wishlist",

      error: error.message

    });

  }

});


// ==========================================
// GET USER WISHLIST
// GET /api/wishlist/:userId
// ==========================================

router.get("/:userId", async (req, res) => {

  try {

    const wishlistItems =
      await Wishlist.find({
        user: req.params.userId
      }).populate("product");


    res.status(200).json({

      success: true,

      wishlistItems

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


// ==========================================
// DELETE WISHLIST ITEM
// DELETE /api/wishlist/:wishlistId
// ==========================================

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