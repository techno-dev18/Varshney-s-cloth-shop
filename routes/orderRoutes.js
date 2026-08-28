import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();


// =====================================
// CREATE ORDER FROM USER CART
// =====================================

router.post("/", async (req, res) => {

  try {

    const { userId } = req.body;

    if (!userId) {

      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });

    }


    // Get user's cart

    const cartItems = await Cart.find({
      user: userId
    }).populate("product");


    if (!cartItems || cartItems.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });

    }


    // Convert cart items into order items

    const orderItems = cartItems.map(item => {

      const product = item.product;

      const price =
        Math.round(
          Number(product.price) -
          (
            Number(product.price) *
            Number(product.discountPercentage || 0)
          ) / 100
        );


      return {

        product: product._id,

        productName:
          product.productName,

        imgURL:
          product.imgURL,

        price: price,

        selectedSize:
          item.selectedSize,

        quantity:
          item.quantity

      };

    });


    // Calculate total

    const totalAmount =
      orderItems.reduce(
        (total, item) => {

          return total +
            item.price *
            item.quantity;

        },
        0
      );


    // Create order

    const order = await Order.create({

      user: userId,

      items: orderItems,

      totalAmount,

      status: "Pending"

    });


    // Empty user's cart

    await Cart.deleteMany({
      user: userId
    });


    res.status(201).json({

      success: true,

      message:
        "Order created successfully",

      order

    });


  } catch (error) {

    console.error(
      "Create Order Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to create order",

      error:
        error.message

    });

  }

});


// =====================================
// GET USER ORDERS
// =====================================

router.get("/:userId", async (req, res) => {

  try {

    const orders =
      await Order.find({
        user: req.params.userId
      })
      .populate("items.product")
      .sort({
        createdAt: -1
      });


    res.status(200).json({

      success: true,

      orders

    });


  } catch (error) {

    console.error(
      "Get Orders Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to fetch orders"

    });

  }

});


// =====================================
// GET SINGLE ORDER
// =====================================

router.get(
  "/order/:orderId",
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.orderId
        )
        .populate("items.product");


      if (!order) {

        return res.status(404).json({

          success: false,

          message:
            "Order not found"

        });

      }


      res.status(200).json({

        success: true,

        order

      });


    } catch (error) {

      console.error(
        "Get Order Error:",
        error
      );


      res.status(500).json({

        success: false,

        message:
          "Failed to fetch order"

      });

    }

  }
);


export default router;