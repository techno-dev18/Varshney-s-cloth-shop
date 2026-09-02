import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

router.post("/", protect, async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod
    } = req.body;

    // --------------------------------------
    // VALIDATE SHIPPING ADDRESS
    // --------------------------------------

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required"
      });
    }

    const requiredAddressFields = [
      "name",
      "phone",
      "address",
      "city",
      "state",
      "pincode"
    ];

    for (const field of requiredAddressFields) {
      if (
        !shippingAddress[field] ||
        !String(shippingAddress[field]).trim()
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }


    // --------------------------------------
    // GET AUTHENTICATED USER'S CART
    // --------------------------------------

    const cartItems = await Cart.find({
      user: req.user._id
    }).populate("product");

    if (!cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });
    }


    // --------------------------------------
    // CREATE ORDER ITEMS
    // --------------------------------------

    const orderItems = cartItems.map(item => {
      if (!item.product) {
        throw new Error(
          "A product in your cart no longer exists"
        );
      }

      const product = item.product;

      const price = Number(product.price) || 0;

      const discount =
        Number(product.discountPercentage) || 0;

      const sellingPrice = Math.round(
        price - (price * discount) / 100
      );

      return {
        product: product._id,

        productName:
          product.productName,

        imgURL:
          product.imgURL,

        price:
          sellingPrice,

        quantity:
          item.quantity,

        selectedSize:
          item.selectedSize
      };
    });


    // --------------------------------------
    // CALCULATE TOTAL ON SERVER
    // --------------------------------------

    const calculatedTotal =
      orderItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      );


    // --------------------------------------
    // CREATE ORDER
    // --------------------------------------

    const order = await Order.create({
      user: req.user._id,

      items: orderItems,

      shippingAddress,

      paymentMethod:
        paymentMethod ||
        "Cash on Delivery",

      paymentStatus:
        "Pending",

      orderStatus:
        "Placed",

      totalAmount:
        calculatedTotal
    });


    // --------------------------------------
    // CLEAR USER'S CART
    // --------------------------------------

    await Cart.deleteMany({
      user: req.user._id
    });


    // --------------------------------------
    // RESPONSE
    // --------------------------------------

    res.status(201).json({
      success: true,

      message:
        "Order placed successfully",

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
        "Failed to create order"
    });
  }
});


// ==========================================
// GET USER ORDERS
// GET /api/orders
// ==========================================

router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).sort({
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
      message: "Failed to fetch orders"
    });
  }
});


// ==========================================
// GET SINGLE ORDER
// GET /api/orders/order/:orderId
// ==========================================

router.get(
  "/order/:orderId",
  protect,
  async (req, res) => {
    try {
      const order =
        await Order.findOne({
          _id: req.params.orderId,
          user: req.user._id
        });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      res.status(200).json({
        success: true,
        order
      });

    } catch (error) {
      console.error(
        "Get Single Order Error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch order"
      });
    }
  }
);


export default router;