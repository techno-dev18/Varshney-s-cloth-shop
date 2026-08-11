const dotenv =require("dotenv");
import dns from "dns";

import connectDB from "./db/dbconc.js";
import ProductModel from "./models/ProductModel.js";
import fs from "fs";
dotenv.config();
const readStream=fs.readFileSync("seedProducts.js", "utf-8");
const jsonData = JSON.parse(readStream);
const products = [

  {
    productName: "Classic Black Shirt",
    category: "Shirts",
    gender: "male",
    ratings: 4.5,
    brand: "Varshney",
    price: 2200,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Luxury Black Shirt",
    description: "Premium cotton black shirt.",
    features: [
      "100% Cotton",
      "Regular Fit",
      "Premium Fabric"
    ],
    details: [
      "Wash Cold",
      "Machine Wash",
      "Made in India"
    ]
  },

  {
    productName: "Classic Blue Jeans",
    category: "Jeans",
    gender: "male",
    ratings: 4.6,
    brand: "Levi's",
    price: 3500,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
    sizes: ["30", "32", "34", "36"],
    tagline: "Classic Denim Jeans",
    description:
      "Comfortable premium denim jeans.",
    features: [
      "Premium Denim",
      "Slim Fit",
      "Durable Fabric"
    ],
    details: [
      "Machine Wash",
      "Cold Water",
      "Made in India"
    ]
  },

  {
    productName: "Premium Leather Jacket",
    category: "Jackets",
    gender: "male",
    ratings: 4.8,
    brand: "Roadster",
    price: 5999,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Premium Winter Jacket",
    description:
      "Stylish jacket for a premium look.",
    features: [
      "Premium Material",
      "Regular Fit",
      "Warm Fabric"
    ],
    details: [
      "Dry Clean",
      "Do Not Bleach",
      "Made in India"
    ]
  }

];

const seedDatabase = async () => {

  try {

    dns.setServers([
      "8.8.8.8",
      "1.1.1.1"
    ]);
    
    await connectDB();
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);
    console.log(
      "Products inserted successfully"
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Seeding failed:"
    );
    console.error(error.message);

    process.exit(1);
  }
};

seedDatabase();