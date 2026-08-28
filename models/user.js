import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================

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
      trim: true
    },

    phone: {
      type: String,
      trim: true,
      default: ""
    },

    // =========================
    // SECURITY
    // =========================

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must contain at least 6 characters"]
    },

    // =========================
    // PROFILE
    // =========================

    profileImage: {
      type: String,
      default: ""
    },

    // =========================
    // ADDRESS
    // =========================

    address: {
      houseNo: {
        type: String,
        default: ""
      },

      street: {
        type: String,
        default: ""
      },

      city: {
        type: String,
        default: ""
      },

      state: {
        type: String,
        default: ""
      },

      pincode: {
        type: String,
        default: ""
      },

      country: {
        type: String,
        default: "India"
      }
    },

    // =========================
    // ACCOUNT
    // =========================

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },

  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);