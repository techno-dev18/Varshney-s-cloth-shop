import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();


// ========================================
// ADD PRODUCT TO CART
// POST /api/cart
// ========================================

router.post("/", async (req, res) => {

  try {

    const {
      userId,
      productId,
      selectedSize
    } = req.body;


    // Validate request

    if (
      !userId ||
      !productId ||
      !selectedSize
    ) {

      return res.status(400).json({
        success: false,
        message:
          "User, product and size are required"
      });

    }


    // Check if product with same size
    // already exists in user's cart

    const existingItem =
      await Cart.findOne({
        user: userId,
        product: productId,
        selectedSize
      });


    // If already exists,
    // increase quantity

    if (existingItem) {

      existingItem.quantity += 1;

      await existingItem.save();

      return res.status(200).json({

        success: true,

        message:
          "Cart quantity updated",

        cartItem:
          existingItem

      });

    }


    // Create new cart item

    const cartItem =
      await Cart.create({

        user: userId,

        product: productId,

        selectedSize,

        quantity: 1

      });


    res.status(201).json({

      success: true,

      message:
        "Product added to cart",

      cartItem

    });


  } catch (error) {

    console.error(
      "Add Cart Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to add product to cart",

      error:
        error.message

    });

  }

});


// ========================================
// GET USER CART
// GET /api/cart/:userId
// ========================================

router.get("/:userId", async (req, res) => {

  try {

    const cartItems =
      await Cart.find({
        user: req.params.userId
      })
      .populate("product");


    res.status(200).json({

      success: true,

      cartItems

    });


  } catch (error) {

    console.error(
      "Get Cart Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch cart",

      error:
        error.message

    });

  }

});


// ========================================
// UPDATE CART QUANTITY
// PUT /api/cart/:cartId
// ========================================

router.put("/:cartId", async (req, res) => {

  try {

    const { action } =
      req.body;


    const cartItem =
      await Cart.findById(
        req.params.cartId
      );


    if (!cartItem) {

      return res.status(404).json({

        success: false,

        message:
          "Cart item not found"

      });

    }


    // Increase quantity

    if (
      action === "increment"
    ) {

      cartItem.quantity += 1;

    }


    // Decrease quantity

    else if (
      action === "decrement"
    ) {

      if (
        cartItem.quantity > 1
      ) {

        cartItem.quantity -= 1;

      }

    }


    // Invalid action

    else {

      return res.status(400).json({

        success: false,

        message:
          "Invalid cart action"

      });

    }


    await cartItem.save();


    res.status(200).json({

      success: true,

      message:
        "Cart quantity updated",

      cartItem

    });


  } catch (error) {

    console.error(
      "Update Cart Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to update cart",

      error:
        error.message

    });

  }

});


// ========================================
// DELETE CART ITEM
// DELETE /api/cart/:cartId
// ========================================

router.delete("/:cartId", async (req, res) => {

  try {

    const deletedItem =
      await Cart.findByIdAndDelete(
        req.params.cartId
      );


    if (!deletedItem) {

      return res.status(404).json({

        success: false,

        message:
          "Cart item not found"

      });

    }


    res.status(200).json({

      success: true,

      message:
        "Item removed from cart"

    });


  } catch (error) {

    console.error(
      "Delete Cart Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to remove item"

    });

  }

});


export default router;