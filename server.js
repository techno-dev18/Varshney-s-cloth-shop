import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/user.js";
import Cart from "./models/Cart.js";
import Product from "./models/ProductModel.js";
import bcrypt from "bcrypt";
import connectDB from "./db/dbconc.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
const app = express();
// MIDDLEWARE
app.use(cors(
  {origin:"*",
    credentials:true,
    optionsSuccessStatus:200      
  }
));
app.use(express.json());
// DATABASE
connectDB();
// HOME ROUTE

app.get("/", (req, res) => {
  res.send("Varshney's Cloth Shop API Running");
});
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Varshney's Cloth Shop API is running"
  });
});

// PRODUCT ROUTES


//cart routes
app.use("/api/cart", cartRoutes);
//user routes

//signup
app.post("https://varshney-s-cloth-shop.onrender.com/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
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

//login route
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

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

    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});
// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});