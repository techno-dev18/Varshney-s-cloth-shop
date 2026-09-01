import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const router = express.Router();


// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

router.post("/", async (req, res) => {

  try {

    const {
      userId,
      shippingAddress,
      paymentMethod,
      totalAmount
    } = req.body;


    // -------------------------------
    // VALIDATION
    // -------------------------------

    if (!userId) {

      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });

    }


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
        !String(
          shippingAddress[field]
        ).trim()
      ) {

        return res.status(400).json({
          success: false,
          message:
            `${field} is required`
        });

      }

    }


    // -------------------------------
    // GET CART
    // -------------------------------

    const cartItems =
      await Cart.find({
        user: userId
      }).populate("product");


    if (!cartItems.length) {

      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });

    }


    // -------------------------------
    // CREATE ORDER ITEMS
    // -------------------------------

    const orderItems =
      cartItems.map(item => {

        if (!item.product) {
          throw new Error(
            "A product in your cart no longer exists"
          );
        }


        const product =
          item.product;


        const price =
          Number(product.price) || 0;

        const discount =
          Number(
            product.discountPercentage
          ) || 0;


        const sellingPrice =
          Math.round(
            price -
            (price * discount) / 100
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


    // -------------------------------
    // CALCULATE TOTAL ON SERVER
    // -------------------------------

    const calculatedTotal =
      orderItems.reduce(
        (total, item) =>
          total +
          item.price *
          item.quantity,
        0
      );


    // -------------------------------
    // CREATE ORDER
    // -------------------------------

    const order =
      await Order.create({

        user: userId,

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


    // -------------------------------
    // CLEAR CART
    // -------------------------------

    await Cart.deleteMany({
      user: userId
    });


    // -------------------------------
    // RESPONSE
    // -------------------------------

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
        "Failed to create order",

      error:
        error.message

    });

  }

});


// ==========================================
// GET USER ORDERS
// GET /api/orders/:userId
// ==========================================

router.get("/:userId", async (req, res) => {

  try {

    const orders =
      await Order.find({
        user: req.params.userId
      })
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


// ==========================================
// GET SINGLE ORDER
// GET /api/orders/order/:orderId
// ==========================================

router.get(
  "/order/:orderId",
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.orderId
        );


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
        "Get Single Order Error:",
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