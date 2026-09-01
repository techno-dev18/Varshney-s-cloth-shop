import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      trim: true,
      default: ""
    },

    city: {
      type: String,
      trim: true,
      default: ""
    },

    state: {
      type: String,
      trim: true,
      default: ""
    },

    pincode: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    _id: false
  }
);


const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },


    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email"
      ]
    },


    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must contain at least 6 characters"]
    },


    phone: {
      type: String,
      trim: true,
      default: ""
    },


    profileImage: {
      type: String,
      default: ""
    },


    address: {
      type: addressSchema,
      default: () => ({})
    },


    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer"
    }

  },

  {
    timestamps: true
  }
);


const User =
  mongoose.model("User", userSchema);

export default User;