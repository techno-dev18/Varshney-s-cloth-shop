import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true
    },

    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    imgURL: {
      type: String,
      required: true
    },

    sizes: {
      type: [String],
      required: true
    },

    tagline: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    features: {
      type: [String],
      default: []
    },

    details: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;