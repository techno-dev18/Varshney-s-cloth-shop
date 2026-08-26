import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/user.js";
import Cart from "./models/Cart.js";
import ProductModel from "./models/ProductModel.js";
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
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Varshney's Cloth Shop API Running");
});
const createProduct = async (productData) => {
  try{
const newProduct = new ProductModel(productData);
   const savedProduct = await newProduct.save();
   return savedProduct;
  }catch(error){
    console.error("Error creating product:", error);
    throw error;
  }
}
app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/api/products", async (req, res) => {
  try {
    const savedProduct = await createProduct(req.body);
    if(savedProduct){
       res.status(200).json({ message: "Product created successfully", product: savedProduct });
    }
  }
  catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }});

// PRODUCT ROUTES

app.use(
  "/api/products",
  productRoutes
);
//cart routes
app.post("/api/cart", async (req, res) => {
  try {
    const {
      userId,
      productId,
      selectedSize
    } = req.body;

    if (!userId || !productId || !selectedSize) {
      return res.status(400).json({
        success: false,
        message: "User, product and size are required"
      });
    }

    const existingItem = await Cart.findOne({
      user: userId,
      product: productId,
      selectedSize
    });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart quantity updated",
        cartItem: existingItem
      });
    }

    const cartItem = await Cart.create({
      user: userId,
      product: productId,
      selectedSize,
      quantity: 1
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem
    });

  } catch (error) {

    console.error("Add Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product to cart"
    });
  }
});
app.get("/api/cart/:userId", async (req, res) => {
  try {

    const cartItems = await Cart.find({
      user: req.params.userId
    }).populate("product");

    res.status(200).json({
      success: true,
      cartItems
    });

  } catch (error) {

    console.error("Get Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cart"
    });
  }
});
app.put("/api/cart/:cartId", async (req, res) => {
  try {
    const { action } = req.body;

    const cartItem = await Cart.findById(
      req.params.cartId
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    if (action === "increment") {
      cartItem.quantity += 1;
    }

    if (action === "decrement") {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    }

    await cartItem.save();

    res.status(200).json({
      success: true,
      cartItem
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to update cart"
    });
  }
});
app.delete("/api/cart/:cartId", async (req, res) => {
  try {

    const deletedItem =
      await Cart.findByIdAndDelete(
        req.params.cartId
      );

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to remove item"
    });
  }
});
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