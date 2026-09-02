import express from "express";
import Wishlist from "../models/Wishlist.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


// ==========================================
// ADD TO WISHLIST
// POST /api/wishlist
// ==========================================

router.post("/", protect, async (req, res) => {

  try {

    const {
      productId
    } = req.body;


    if (!productId) {

      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });

    }


    const existingItem =
      await Wishlist.findOne({
        user: req.user._id,
        product: productId
      });


    if (existingItem) {

      return res.status(409).json({
        success: false,
        message: "Product already in wishlist"
      });

    }


    await Wishlist.create({

      user: req.user._id,

      product: productId

    });


    res.status(201).json({

      success: true,

      message:
        "Product added to wishlist"

    });


  } catch (error) {

    console.error(
      "Add Wishlist Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to add product to wishlist"

    });

  }

});


// ==========================================
// GET USER WISHLIST
// GET /api/wishlist
// ==========================================

router.get("/", protect, async (req, res) => {

  try {

    const wishlistItems =
      await Wishlist.find({

        user: req.user._id

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

      message:
        "Failed to fetch wishlist"

    });

  }

});


// ==========================================
// REMOVE FROM WISHLIST
// DELETE /api/wishlist/:wishlistId
// ==========================================

router.delete(
  "/:wishlistId",
  protect,
  async (req, res) => {

    try {

      const deletedItem =
        await Wishlist.findOneAndDelete({

          _id:
            req.params.wishlistId,

          user:
            req.user._id

        });


      if (!deletedItem) {

        return res.status(404).json({

          success: false,

          message:
            "Wishlist item not found"

        });

      }


      res.status(200).json({

        success: true,

        message:
          "Removed from wishlist"

      });


    } catch (error) {

      console.error(
        "Delete Wishlist Error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to remove wishlist item"

      });

    }

  }
);


export default router;

