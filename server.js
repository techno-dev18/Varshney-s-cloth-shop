import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/dbconc.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
dotenv.config();
const app = express();
// MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// DATABASE
connectDB();
// HOME ROUTE

app.get("/", (req, res) => {
  res.send("Varshney's Cloth Shop API Running");
});
app.use("/api/products", productRoutes);



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
app.use("/api/users", userRoutes);
 
//order route
app.use("/api/orders", orderRoutes);
//wishlist route
app.use("/api/wishlist", wishlistRoutes);
// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});