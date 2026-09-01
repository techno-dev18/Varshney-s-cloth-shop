import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// CREATE JWT
// ==========================================

const createToken = (userId) => {

  return jwt.sign(
    {
      userId
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

};


// ==========================================
// REGISTER
// POST /api/users/register
// ==========================================

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });

    }


    if (password.length < 6) {

      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters"
      });

    }


    const normalizedEmail =
      email.toLowerCase().trim();


    const existingUser =
      await User.findOne({
        email: normalizedEmail
      });


    if (existingUser) {

      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });

    }


    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    const user =
      await User.create({

        name: name.trim(),

        email: normalizedEmail,

        password: hashedPassword,

        role: "customer"

      });


    const token =
      createToken(user._id);


    res.cookie(
      "token",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",

        maxAge:
          7 * 24 * 60 * 60 * 1000
      }
    );


    res.status(201).json({

      success: true,

      message:
        "Account created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    });


  } catch (error) {

    console.error(
      "Registration Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Registration failed"

    });

  }

});


// ==========================================
// LOGIN
// POST /api/users/login
// ==========================================

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required"

      });

    }


    const user =
      await User.findOne({

        email:
          email.toLowerCase().trim()

      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    const token =
      createToken(user._id);


    res.cookie(
      "token",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",

        maxAge:
          7 * 24 * 60 * 60 * 1000
      }
    );


    res.status(200).json({

      success: true,

      message:
        "Login successful",

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    });


  } catch (error) {

    console.error(
      "Login Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Login failed"

    });

  }

});


// ==========================================
// CURRENT USER
// GET /api/users/me
// ==========================================

router.get(
  "/me",
  protect,
  async (req, res) => {

    res.status(200).json({

      success: true,

      user: req.user

    });

  }
);


// ==========================================
// LOGOUT
// POST /api/users/logout
// ==========================================

router.post(
  "/logout",
  (req, res) => {

    res.clearCookie(
      "token",
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax"
      }
    );


    res.status(200).json({

      success: true,

      message:
        "Logged out successfully"

    });

  }
);


// ==========================================
// GET PROFILE
// GET /api/users/:userId
// ==========================================

router.get(
  "/:userId",
  protect,
  async (req, res) => {

    try {

      // User can only access own profile

      if (
        req.user._id.toString() !==
        req.params.userId
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You are not allowed to access this profile"

        });

      }


      const user =
        await User.findById(
          req.params.userId
        ).select("-password");


      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found"

        });

      }


      res.status(200).json({

        success: true,

        user

      });


    } catch (error) {

      console.error(
        "Get Profile Error:",
        error
      );


      res.status(500).json({

        success: false,

        message:
          "Failed to fetch profile"

      });

    }

  }
);


// ==========================================
// UPDATE PROFILE
// PUT /api/users/:userId
// ==========================================

router.put(
  "/:userId",
  protect,
  async (req, res) => {

    try {

      if (
        req.user._id.toString() !==
        req.params.userId
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You cannot update another user's profile"

        });

      }


      const {
        name,
        phone,
        profileImage,
        address
      } = req.body;


      const user =
        await User.findById(
          req.params.userId
        );


      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found"

        });

      }


      if (name !== undefined) {

        if (
          name.trim().length < 2
        ) {

          return res.status(400).json({

            success: false,

            message:
              "Name must contain at least 2 characters"

          });

        }

        user.name =
          name.trim();

      }


      if (phone !== undefined) {

        user.phone =
          phone.trim();

      }


      if (
        profileImage !==
        undefined
      ) {

        user.profileImage =
          profileImage;

      }


      if (
        address !== undefined
      ) {

        user.address =
          address;

      }


      const updatedUser =
        await user.save();


      res.status(200).json({

        success: true,

        message:
          "Profile updated successfully",

        user: {

          id: updatedUser._id,

          name: updatedUser.name,

          email: updatedUser.email,

          phone:
            updatedUser.phone,

          profileImage:
            updatedUser.profileImage,

          address:
            updatedUser.address,

          role:
            updatedUser.role

        }

      });


    } catch (error) {

      console.error(
        "Update Profile Error:",
        error
      );


      res.status(500).json({

        success: false,

        message:
          "Failed to update profile"

      });

    }

  }
);


export default router;