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

        email: user.email

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


export default router;