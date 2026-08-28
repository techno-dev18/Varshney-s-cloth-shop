import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();


// ==========================================
// REGISTER USER
// POST /api/users/register
// ==========================================

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // Check required fields

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });

    }


    // Check if user already exists

    const existingUser =
      await User.findOne({
        email: email.toLowerCase()
      });


    if (existingUser) {

      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });

    }


    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 10);


    // Create user

    const user =
      await User.create({

        name: name.trim(),

        email: email.toLowerCase().trim(),

        password: hashedPassword

      });


    // Send response

    res.status(201).json({

      success: true,

      message: "Account created successfully",

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      }

    });


  } catch (error) {

    console.error(
      "Registration Error:",
      error
    );


    res.status(500).json({

      success: false,

      message: "Registration failed"

    });

  }

});


// ==========================================
// LOGIN USER
// POST /api/users/login
// ==========================================

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Check required fields

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required"

      });

    }


    // Find user

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


    // Compare password

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


    // Successful login

    res.status(200).json({

      success: true,

      message: "Login successful",

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

      message: "Login failed"

    });

  }

});

// ===============================
// GET USER PROFILE
// ===============================

router.get("/:userId", async (req, res) => {

  try {

    const user = await User.findById(
      req.params.userId
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
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
      message: "Failed to fetch profile"
    });

  }

});


// ===============================
// UPDATE USER PROFILE
// ===============================

// ===============================
// UPDATE USER PROFILE
// ===============================

router.put("/:userId", async (req, res) => {

  try {

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
        message: "User not found"
      });

    }


    // =========================
    // NAME
    // =========================

    if (name !== undefined) {

      if (!name.trim()) {

        return res.status(400).json({
          success: false,
          message: "Name cannot be empty"
        });

      }

      user.name = name.trim();

    }


    // =========================
    // PHONE
    // =========================

    if (phone !== undefined) {

      user.phone =
        phone.trim();

    }


    // =========================
    // PROFILE IMAGE
    // =========================

    if (profileImage !== undefined) {

      user.profileImage =
        profileImage.trim();

    }


    // =========================
    // ADDRESS
    // =========================

    if (address !== undefined) {

      user.address = {
        ...user.address?.toObject?.(),
        ...address
      };

    }


    const updatedUser =
      await user.save();


    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({

      success: true,

      message:
        "Profile updated successfully",

      user: {

        id: updatedUser._id,

        name: updatedUser.name,

        email: updatedUser.email,

        phone: updatedUser.phone,

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

});
// ==========================================
// CHANGE PASSWORD
// PUT /api/users/:userId/password
// ==========================================

router.put("/:userId/password", async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword
    } = req.body;


    // Check fields

    if (!currentPassword || !newPassword) {

      return res.status(400).json({
        success: false,
        message: "Current password and new password are required"
      });

    }


    // Check new password length

    if (newPassword.length < 6) {

      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters"
      });

    }


    // Find user

    const user = await User.findById(
      req.params.userId
    );


    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }


    // Verify current password

    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({
        success: false,
        message: "Current password is incorrect"
      });

    }


    // Hash new password

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );


    // Save new password

    user.password =
      hashedPassword;


    await user.save();


    res.status(200).json({

      success: true,

      message:
        "Password changed successfully"

    });


  } catch (error) {

    console.error(
      "Change Password Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to change password"

    });

  }

});

export default router;