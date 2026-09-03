import dotenv from "dotenv";
import dns from "dns";

import connectDB from "./db/dbconc.js";
import ProductModel from "./models/ProductModel.js";

dotenv.config();

// Optional DNS configuration for MongoDB Atlas connection
dns.setServers(["8.8.8.8", "1.1.1.1"]);

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
    tagline: "A timeless black shirt for every occasion.",
    description:
      "A classic black shirt designed with a clean silhouette and comfortable fabric, making it suitable for both casual and formal occasions.",
    features: [
      "Premium fabric",
      "Comfortable fit",
      "Classic black color",
      "Suitable for casual and formal wear"
    ],
    details: [
      "Material: Cotton blend",
      "Fit: Regular",
      "Sleeves: Full sleeves",
      "Care: Machine wash"
    ]
  },

  {
    productName: "White Formal Shirt",
    category: "Shirts",
    gender: "male",
    ratings: 4.4,
    brand: "Arrow",
    price: 2800,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Sharp and sophisticated formal wear.",
    description:
      "A crisp white formal shirt designed for office meetings, professional events and sophisticated everyday styling.",
    features: [
      "Formal design",
      "Breathable fabric",
      "Comfortable fit",
      "Easy to style"
    ],
    details: [
      "Material: Cotton",
      "Fit: Regular",
      "Collar: Spread collar",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Blue Denim Jeans",
    category: "Jeans",
    gender: "male",
    ratings: 4.6,
    brand: "Levi's",
    price: 3500,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Everyday denim with timeless style.",
    description:
      "Classic blue denim jeans designed for everyday comfort with a versatile look that works with almost any outfit.",
    features: [
      "Durable denim",
      "Classic blue wash",
      "Comfortable fit",
      "Everyday wear"
    ],
    details: [
      "Material: Denim",
      "Fit: Regular",
      "Rise: Mid-rise",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Black Slim Fit Jeans",
    category: "Jeans",
    gender: "male",
    ratings: 4.5,
    brand: "Jack & Jones",
    price: 3200,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Sleek denim for a modern look.",
    description:
      "Slim-fit black jeans offering a modern silhouette with comfortable stretch for all-day movement.",
    features: [
      "Slim fit",
      "Stretch fabric",
      "Deep black color",
      "Modern design"
    ],
    details: [
      "Material: Stretch denim",
      "Fit: Slim",
      "Rise: Mid-rise",
      "Care: Machine wash"
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
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Bold style with a premium finish.",
    description:
      "A premium leather-style jacket designed to add a bold and sophisticated edge to your wardrobe.",
    features: [
      "Premium finish",
      "Modern biker-inspired design",
      "Durable construction",
      "Multiple pockets"
    ],
    details: [
      "Material: Faux leather",
      "Fit: Regular",
      "Closure: Zipper",
      "Care: Wipe clean"
    ]
  },

  {
    productName: "Women's Floral Dress",
    category: "Dresses",
    gender: "female",
    ratings: 4.6,
    brand: "ONLY",
    price: 4200,
    discountPercentage: 30,
    imgURL:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Elegant floral style for beautiful days.",
    description:
      "A feminine floral dress featuring a stylish print and comfortable silhouette perfect for outings and special occasions.",
    features: [
      "Floral print",
      "Lightweight fabric",
      "Comfortable fit",
      "Elegant design"
    ],
    details: [
      "Material: Polyester blend",
      "Fit: Regular",
      "Length: Midi",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Women's Black Dress",
    category: "Dresses",
    gender: "female",
    ratings: 4.7,
    brand: "Zara",
    price: 5200,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "A sophisticated black dress for every occasion.",
    description:
      "A stylish black dress with a clean and elegant silhouette suitable for parties, dinners and evening events.",
    features: [
      "Elegant black design",
      "Comfortable fabric",
      "Versatile styling",
      "Modern silhouette"
    ],
    details: [
      "Material: Polyester blend",
      "Fit: Regular",
      "Length: Midi",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Women's Casual Top",
    category: "Tops",
    gender: "female",
    ratings: 4.3,
    brand: "H&M",
    price: 1800,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1564257577054-0d7c7f6e2b75",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Effortless comfort for everyday styling.",
    description:
      "A casual women's top designed for relaxed everyday outfits with a lightweight and comfortable feel.",
    features: [
      "Soft fabric",
      "Casual design",
      "Lightweight",
      "Easy to pair"
    ],
    details: [
      "Material: Cotton blend",
      "Fit: Regular",
      "Sleeves: Short sleeves",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Oversized Graphic T-Shirt",
    category: "T-Shirts",
    gender: "unisex",
    ratings: 4.5,
    brand: "Urban Monkey",
    price: 1600,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Streetwear comfort with bold personality.",
    description:
      "An oversized graphic T-shirt created for relaxed streetwear looks and comfortable everyday styling.",
    features: [
      "Oversized fit",
      "Graphic design",
      "Soft fabric",
      "Unisex style"
    ],
    details: [
      "Material: Cotton",
      "Fit: Oversized",
      "Sleeves: Half sleeves",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Classic White T-Shirt",
    category: "T-Shirts",
    gender: "unisex",
    ratings: 4.4,
    brand: "Uniqlo",
    price: 1400,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "A wardrobe essential made simple.",
    description:
      "A classic white T-shirt designed with a clean look, comfortable fabric and versatile styling options.",
    features: [
      "Classic white color",
      "Soft cotton fabric",
      "Comfortable fit",
      "Everyday essential"
    ],
    details: [
      "Material: Cotton",
      "Fit: Regular",
      "Sleeves: Half sleeves",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Women's Blue Denim Jacket",
    category: "Jackets",
    gender: "female",
    ratings: 4.6,
    brand: "ONLY",
    price: 3800,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Classic denim with a modern feminine touch.",
    description:
      "A versatile blue denim jacket designed to layer effortlessly over casual outfits throughout the year.",
    features: [
      "Classic denim",
      "Versatile design",
      "Comfortable fit",
      "Easy layering"
    ],
    details: [
      "Material: Denim",
      "Fit: Regular",
      "Closure: Button",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Beige Chinos",
    category: "Trousers",
    gender: "male",
    ratings: 4.4,
    brand: "Peter England",
    price: 2600,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Smart casual trousers for every day.",
    description:
      "Classic beige chinos offering a smart casual appearance with comfortable construction for everyday wear.",
    features: [
      "Classic beige color",
      "Smart casual design",
      "Comfortable fabric",
      "Versatile styling"
    ],
    details: [
      "Material: Cotton blend",
      "Fit: Regular",
      "Rise: Mid-rise",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Women's Wide Leg Trousers",
    category: "Trousers",
    gender: "female",
    ratings: 4.5,
    brand: "Mango",
    price: 3300,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Elegant wide-leg comfort with modern style.",
    description:
      "Stylish wide-leg trousers designed to provide a relaxed fit while maintaining an elegant and contemporary appearance.",
    features: [
      "Wide-leg silhouette",
      "Comfortable fit",
      "Modern design",
      "Versatile styling"
    ],
    details: [
      "Material: Polyester blend",
      "Fit: Wide leg",
      "Rise: High-rise",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Women's Knit Sweater",
    category: "Sweaters",
    gender: "female",
    ratings: 4.6,
    brand: "Forever 21",
    price: 2900,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Cozy warmth with effortless style.",
    description:
      "A soft knit sweater designed to provide warmth and comfort while keeping your winter wardrobe stylish.",
    features: [
      "Soft knit fabric",
      "Warm and comfortable",
      "Classic design",
      "Easy layering"
    ],
    details: [
      "Material: Acrylic blend",
      "Fit: Regular",
      "Sleeves: Full sleeves",
      "Care: Gentle wash"
    ]
  },

  {
    productName: "Men's Grey Hoodie",
    category: "Hoodies",
    gender: "male",
    ratings: 4.7,
    brand: "Puma",
    price: 3200,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Everyday comfort for a relaxed lifestyle.",
    description:
      "A comfortable grey hoodie designed for casual wear, travel and relaxed everyday styling.",
    features: [
      "Soft fabric",
      "Adjustable hood",
      "Front pocket",
      "Comfortable fit"
    ],
    details: [
      "Material: Cotton blend",
      "Fit: Regular",
      "Sleeves: Full sleeves",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Women's Sports Leggings",
    category: "Activewear",
    gender: "female",
    ratings: 4.7,
    brand: "Nike",
    price: 2800,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Flexible performance for active days.",
    description:
      "Comfortable sports leggings designed for workouts, running and active lifestyles with a flexible fit.",
    features: [
      "Stretch fabric",
      "Flexible fit",
      "Comfortable waistband",
      "Suitable for workouts"
    ],
    details: [
      "Material: Polyester and elastane",
      "Fit: Slim",
      "Waist: High-rise",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Men's Polo T-Shirt",
    category: "T-Shirts",
    gender: "male",
    ratings: 4.5,
    brand: "Lacoste",
    price: 4200,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1625910513413-5fc45c6e4b7a",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Classic polo styling with premium comfort.",
    description:
      "A refined polo T-shirt combining classic styling with comfortable fabric for smart casual occasions.",
    features: [
      "Classic polo collar",
      "Premium fabric",
      "Smart casual design",
      "Comfortable fit"
    ],
    details: [
      "Material: Cotton blend",
      "Fit: Regular",
      "Collar: Polo collar",
      "Care: Machine wash"
    ]
  },

  {
    productName: "Women's Summer Skirt",
    category: "Skirts",
    gender: "female",
    ratings: 4.4,
    brand: "Mango",
    price: 2500,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Light, stylish and perfect for summer.",
    description:
      "A lightweight summer skirt designed for comfortable warm-weather styling and effortless everyday outfits.",
    features: [
      "Lightweight fabric",
      "Summer-friendly design",
      "Comfortable fit",
      "Versatile styling"
    ],
    details: [
      "Material: Polyester blend",
      "Fit: Regular",
      "Length: Midi",
      "Care: Machine wash"
    ]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");
    console.log(`Preparing to insert ${products.length} products...`);

    // Remove existing products
    await ProductModel.deleteMany({});

    // Insert all 18 products
    await ProductModel.insertMany(products);

    console.log(
      `✅ ${products.length} products inserted successfully`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:");
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();