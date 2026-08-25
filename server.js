import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/user";
const bcrypt=require("bcrypt");
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
app.post("/cart", async (req, res) => {
  try {
    const { selectedSize, quantity, productDetails } = req.body;
  if(!selectedSize || !quantity || !productDetails){
return res.status(400).json({ message: "Missing required fields" });
  }
const newCartItem = new Cart(req.body).save();
res.status(200).json({ message: "Cart item added successfully", cartItem: newCartItem });
 }
    catch (error) {
    res.status(500).json({ message: "Internal server error" });}
});
app.get("/cart", async (req, res) => {
    try {
      const cartItems = await Cart.find().populate("productDetails");
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: "No cart items found" });
      }
      res.status(200).json({ cartItems });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
app.get("/cart/:Id", async (req, res) => {
    try {
      const cartItem = await Cart.findById(req.params.Id).populate("productDetails");
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.status(200).json({ cartItem });
    } catch (error) {
      console.error("Error fetching cart item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.delete("/cart/:Id", async (req, res) => {
    try {
      const deletedCartItem = await Cart.findByIdAndDelete(req.params.Id);
      if (!deletedCartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
      console.error("Error deleting cart item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.put("/cart/:Id", async (req, res) => {
    try {
      const {action} = req.body;  
      const updatedCartItem = await Cart.findByIdAndUpdate(req.params.Id, req.body, { new: true });
      if (!updatedCartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
     
      if(action === "increment" || action === "decrement"){
        const updatedQuantity = action === "increment" ? updatedCartItem.quantity + 1 : updatedCartItem.quantity - 1;
        updatedCartItem.quantity = updatedQuantity;
        await updatedCartItem.save();
      }
      else{
        return res.status(400).json({ message: "Invalid action" });
      }
    res.status(200).json({ message: "Cart item updated successfully", cartItem: updatedCartItem });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
//user routes

//signup
app.post("/api/users/register", async (req, res) => {
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

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

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