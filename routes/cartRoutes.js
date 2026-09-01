import express from "express";
import Cart from "../models/Cart.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


// ===============================
// ADD PRODUCT TO CART
// ===============================

router.post("/", protect, async (req, res) => {

  try {

    const {
      productId,
      selectedSize
    } = req.body;


    if (!productId || !selectedSize) {

      return res.status(400).json({

        success: false,

        message:
          "Product and size are required"

      });

    }


    const existingItem =
      await Cart.findOne({

        user: req.user._id,

        product: productId,

        selectedSize

      });


    if (existingItem) {

      existingItem.quantity += 1;

      await existingItem.save();

    } else {

      await Cart.create({

        user: req.user._id,

        product: productId,

        selectedSize,

        quantity: 1

      });

    }


    res.status(200).json({

      success: true,

      message:
        "Product added to cart"

    });


  } catch (error) {

    console.error(
      "Add Cart Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to add product"

    });

  }

});


// ===============================
// GET USER CART
// ===============================

router.get("/", protect, async (req, res) => {

  try {

    const cartItems =
      await Cart.find({
        user: req.user._id
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
        "Failed to fetch cart"

    });

  }

});


// ===============================
// UPDATE CART QUANTITY
// ===============================

router.put(
  "/:cartId",
  protect,
  async (req, res) => {

    try {

      const {
        action
      } = req.body;


      const cartItem =
        await Cart.findOne({

          _id: req.params.cartId,

          user: req.user._id

        });


      if (!cartItem) {

        return res.status(404).json({

          success: false,

          message:
            "Cart item not found"

        });

      }


      if (action === "increment") {

        cartItem.quantity += 1;

      }


      if (action === "decrement") {

        if (cartItem.quantity > 1) {

          cartItem.quantity -= 1;

        }

      }


      await cartItem.save();


      res.status(200).json({

        success: true,

        message:
          "Cart updated successfully"

      });


    } catch (error) {

      console.error(
        "Update Cart Error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to update cart"

      });

    }

  }
);


// ===============================
// DELETE CART ITEM
// ===============================

router.delete(
  "/:cartId",
  protect,
  async (req, res) => {

    try {

      const deletedItem =
        await Cart.findOneAndDelete({

          _id: req.params.cartId,

          user: req.user._id

        });


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
          "Failed to remove cart item"

      });

    }

  }
);

export default router;