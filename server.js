import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db/dbconc.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
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
//signup

//login route

// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});