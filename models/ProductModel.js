import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "unisex"],
    },

    ratings: {
      type: Number,
      default: 0,
    },

    brand: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    imgURL: {
      type: String,
      required: true,
    },

    sizes: {
      type: [String],
      default: [],
    },

    tagline: {
      type: String,
    },

    description: {
      type: String,
    },

    features: {
      type: [String],
      default: [],
    },

    details: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model(
  "Product",
  productSchema
);

export default ProductModel;