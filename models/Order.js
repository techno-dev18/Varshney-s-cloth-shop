import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    productName: {
      type: String,
      required: true
    },

    imgURL: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    selectedSize: {
      type: String,
      required: true
    }
  },
  {
    _id: false
  }
);


const shippingAddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    state: {
      type: String,
      required: true,
      trim: true
    },

    pincode: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    _id: false
  }
);


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: value =>
          value.length > 0,
        message: "Order must contain at least one item"
      }
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash on Delivery"
      ],
      default: "Cash on Delivery"
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed"
      ],
      default: "Pending"
    },

    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Placed"
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);


const Order =
  mongoose.model("Order", orderSchema);

export default Order;