import dotenv from "dotenv";
import dns from "dns";

import connectDB from "./db/dbconc.js";
import ProductModel from "./models/ProductModel.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const products = [
  // =========================================================
  // 1. T-SHIRTS
  // =========================================================

  {
    productName: "Classic Grey T-Shirt",
    category: "T-Shirts",
    gender: "unisex",
    ratings: 4.5,
    brand: "Varshney",
    price: 1499,
    discountPercentage: 15,
    imgURL:
      "https://www.pexels.com/photo/stylish-tattooed-man-in-sunglasses-poses-29138677/ ",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "A timeless everyday essential",
    description:
      "A soft cotton T-shirt designed for everyday comfort and effortless styling.",
    features: [
      "100% Cotton",
      "Breathable Fabric",
      "Regular Fit",
      "Soft Finish"
    ],
    details: [
      "Round Neck",
      "Half Sleeves",
      "Machine Wash",
      "Made in India"
    ]
  },

  {
    productName: "Slim Fit Black T-Shirt",
    category: "T-Shirts",
    gender: "male",
    ratings: 4.6,
    brand: "Nike",
    price: 1799,
    discountPercentage: 20,
    imgURL:
      "https://www.pexels.com/photo/strong-and-confident-man-outdoors-portrait-30752888/",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Clean style for every day",
    description:
      "A modern slim-fit black T-shirt made from lightweight breathable cotton.",
    features: [
      "Slim Fit",
      "Cotton Fabric",
      "Lightweight",
      "Fade Resistant"
    ],
    details: [
      "Round Neck",
      "Half Sleeves",
      "Machine Wash",
      "Regular Length"
    ]
  },

  {
    productName: "Classic Polo T-Shirt",
    category: "T-Shirts",
    gender: "male",
    ratings: 4.5,
    brand: "U.S. Polo Assn.",
    price: 1899,
    discountPercentage: 20,
    imgURL:
      "https://www.pexels.com/photo/a-man-wearing-a-polo-shirt-9301162/",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Smart casual comfort",
    description:
      "A premium polo T-shirt combining classic styling with comfortable cotton fabric.",
    features: [
      "Premium Cotton",
      "Classic Collar",
      "Breathable",
      "Regular Fit"
    ],
    details: [
      "Polo Collar",
      "Half Sleeves",
      "Machine Wash",
      "Everyday Wear"
    ]
  },

  {
    productName: "Oversized Graphic T-Shirt",
    category: "T-Shirts",
    gender: "unisex",
    ratings: 4.7,
    brand: "Urban Monkey",
    price: 1699,
    discountPercentage: 18,
    imgURL:
      "https://www.pexels.com/photo/woman-modeling-oversized-graphic-t-shirt-in-studio-37011552/ ",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Bold streetwear energy",
    description:
      "An oversized graphic T-shirt created for relaxed streetwear looks.",
    features: [
      "Oversized Fit",
      "Graphic Print",
      "Soft Cotton",
      "Streetwear Design"
    ],
    details: [
      "Round Neck",
      "Half Sleeves",
      "Machine Wash",
      "Unisex Design"
    ]
  },

  // =========================================================
  // 2. HOODIES
  // =========================================================

  {
    productName: "Classic Grey Hoodie",
    category: "Hoodies",
    gender: "unisex",
    ratings: 4.7,
    brand: "Puma",
    price: 3299,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Your everyday winter essential",
    description:
      "A warm fleece hoodie designed for casual everyday wear.",
    features: [
      "Fleece Lining",
      "Adjustable Hood",
      "Soft Fabric",
      "Front Pocket"
    ],
    details: [
      "Full Sleeves",
      "Regular Fit",
      "Machine Wash",
      "Winter Wear"
    ]
  },

  {
    productName: "Black Premium Hoodie",
    category: "Hoodies",
    gender: "male",
    ratings: 4.6,
    brand: "Adidas",
    price: 3799,
    discountPercentage: 25,
    imgURL:
      "https://www.pexels.com/photo/young-man-in-black-hoodie-against-gray-background-28701960/",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Minimal style, maximum comfort",
    description:
      "A premium black hoodie with a soft interior and modern silhouette.",
    features: [
      "Premium Cotton",
      "Soft Interior",
      "Kangaroo Pocket",
      "Adjustable Hood"
    ],
    details: [
      "Full Sleeves",
      "Regular Fit",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Oversized Beige Hoodie",
    category: "Hoodies",
    gender: "unisex",
    ratings: 4.5,
    brand: "Roadster",
    price: 2999,
    discountPercentage: 15,
    imgURL:
     "https://www.pexels.com/photo/young-woman-with-hands-on-hood-in-studio-7479813/",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Relaxed comfort for modern wardrobes",
    description:
      "A relaxed oversized hoodie suitable for casual outfits and travel.",
    features: [
      "Oversized Fit",
      "Soft Fleece",
      "Warm Fabric",
      "Modern Design"
    ],
    details: [
      "Full Sleeves",
      "Hooded",
      "Machine Wash",
      "Unisex"
    ]
  },

  // =========================================================
  // 3. SWEATSHIRTS
  // =========================================================

  {
    productName: "Classic Navy Sweatshirt",
    category: "Sweatshirts",
    gender: "male",
    ratings: 4.5,
    brand: "Roadster",
    price: 2499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Classic warmth for everyday wear",
    description:
      "A comfortable navy sweatshirt with a clean minimal design.",
    features: [
      "Soft Cotton",
      "Warm Fabric",
      "Regular Fit",
      "Minimal Design"
    ],
    details: [
      "Crew Neck",
      "Full Sleeves",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Women's Cream Sweatshirt",
    category: "Sweatshirts",
    gender: "female",
    ratings: 4.6,
    brand: "H&M",
    price: 2299,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Soft comfort with feminine style",
    description:
      "A cozy cream sweatshirt designed for relaxed everyday outfits.",
    features: [
      "Soft Fabric",
      "Comfort Fit",
      "Warm Material",
      "Minimal Style"
    ],
    details: [
      "Crew Neck",
      "Full Sleeves",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Urban Graphic Sweatshirt",
    category: "Sweatshirts",
    gender: "unisex",
    ratings: 4.4,
    brand: "Urban Monkey",
    price: 2699,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Street-inspired everyday style",
    description:
      "A graphic sweatshirt designed for contemporary streetwear looks.",
    features: [
      "Graphic Print",
      "Soft Cotton",
      "Relaxed Fit",
      "Durable Fabric"
    ],
    details: [
      "Crew Neck",
      "Full Sleeves",
      "Machine Wash",
      "Unisex"
    ]
  },

  // =========================================================
  // 4. TROUSERS
  // =========================================================

  {
    productName: "Formal Grey Trouser",
    category: "Trousers",
    gender: "male",
    ratings: 4.6,
    brand: "Louis Philippe",
    price: 2999,
    discountPercentage: 22,
    imgURL:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Professional style refined",
    description:
      "Comfortable formal trousers designed for office and professional occasions.",
    features: [
      "Premium Fabric",
      "Slim Fit",
      "Wrinkle Resistant",
      "Comfort Stretch"
    ],
    details: [
      "Mid Rise",
      "Front Pockets",
      "Dry Clean",
      "Formal Wear"
    ]
  },

  {
    productName: "Women's Black Trousers",
    category: "Trousers",
    gender: "female",
    ratings: 4.5,
    brand: "Mango",
    price: 3199,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Elegant everyday tailoring",
    description:
      "Modern black trousers designed for office and smart casual styling.",
    features: [
      "Tailored Fit",
      "Stretch Fabric",
      "Elegant Design",
      "Comfort Waist"
    ],
    details: [
      "High Rise",
      "Side Pockets",
      "Machine Wash",
      "Formal Wear"
    ]
  },

  {
    productName: "Beige Chino Trousers",
    category: "Trousers",
    gender: "male",
    ratings: 4.4,
    brand: "Peter England",
    price: 2699,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Smart casual made easy",
    description:
      "Versatile beige trousers perfect for casual and semi-formal outfits.",
    features: [
      "Cotton Blend",
      "Comfort Fit",
      "Classic Color",
      "Durable Fabric"
    ],
    details: [
      "Mid Rise",
      "Belt Loops",
      "Machine Wash",
      "Everyday Wear"
    ]
  },

  // =========================================================
  // 5. SHORTS
  // =========================================================

  {
    productName: "Classic Casual Shorts",
    category: "Shorts",
    gender: "male",
    ratings: 4.4,
    brand: "Roadster",
    price: 1499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1617953644310-e690da9be982?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Easy comfort for relaxed days",
    description:
      "Lightweight casual shorts designed for holidays and everyday summer wear.",
    features: [
      "Lightweight Fabric",
      "Comfort Waist",
      "Side Pockets",
      "Casual Fit"
    ],
    details: [
      "Above Knee",
      "Drawstring",
      "Machine Wash",
      "Summer Wear"
    ]
  },

  {
    productName: "Denim Summer Shorts",
    category: "Shorts",
    gender: "female",
    ratings: 4.5,
    brand: "ONLY",
    price: 1799,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-c5b4d77d0a40",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Summer style with denim attitude",
    description:
      "Comfortable denim shorts created for casual summer outfits.",
    features: [
      "Denim Fabric",
      "Classic Design",
      "Comfort Fit",
      "Durable"
    ],
    details: [
      "Mid Rise",
      "Front Pockets",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Sports Training Shorts",
    category: "Shorts",
    gender: "unisex",
    ratings: 4.6,
    brand: "Adidas",
    price: 1699,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Move freely, train harder",
    description:
      "Lightweight sports shorts designed for training and active lifestyles.",
    features: [
      "Quick Dry",
      "Stretch Fabric",
      "Lightweight",
      "Breathable"
    ],
    details: [
      "Elastic Waist",
      "Side Pockets",
      "Machine Wash",
      "Sports Wear"
    ]
  },

  // =========================================================
  // 6. CARGO PANTS
  // =========================================================

  {
    productName: "Classic Cargo Pants",
    category: "Cargo Pants",
    gender: "male",
    ratings: 4.6,
    brand: "Roadster",
    price: 2899,
    discountPercentage: 22,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-c5b4d77d0a40",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Utility meets everyday style",
    description:
      "Durable cargo pants with multiple pockets and a comfortable fit.",
    features: [
      "Multiple Pockets",
      "Cotton Blend",
      "Comfort Fit",
      "Durable Fabric"
    ],
    details: [
      "Mid Rise",
      "Button Closure",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Women's Utility Cargo",
    category: "Cargo Pants",
    gender: "female",
    ratings: 4.5,
    brand: "H&M",
    price: 2799,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Modern utility for everyday life",
    description:
      "Stylish women's cargo pants combining functionality with contemporary design.",
    features: [
      "Utility Pockets",
      "Relaxed Fit",
      "Comfort Fabric",
      "Modern Style"
    ],
    details: [
      "High Rise",
      "Button Closure",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Relaxed Olive Cargo",
    category: "Cargo Pants",
    gender: "unisex",
    ratings: 4.4,
    brand: "Urban Monkey",
    price: 2999,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Built for everyday adventures",
    description:
      "Relaxed olive cargo pants with a practical multi-pocket design.",
    features: [
      "Relaxed Fit",
      "Utility Pockets",
      "Durable Fabric",
      "Streetwear Style"
    ],
    details: [
      "Mid Rise",
      "Zip Fly",
      "Machine Wash",
      "Unisex"
    ]
  },

  // =========================================================
  // 7. TRACK PANTS
  // =========================================================

  {
    productName: "Sports Track Pants",
    category: "Track Pants",
    gender: "male",
    ratings: 4.5,
    brand: "Adidas",
    price: 2499,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Training comfort without limits",
    description:
      "Comfortable athletic track pants designed for workouts and everyday activity.",
    features: [
      "Quick Dry",
      "Stretchable",
      "Side Pockets",
      "Breathable"
    ],
    details: [
      "Elastic Waist",
      "Tapered Fit",
      "Machine Wash",
      "Sports Wear"
    ]
  },

  {
    productName: "Women's Performance Track Pants",
    category: "Track Pants",
    gender: "female",
    ratings: 4.6,
    brand: "Nike",
    price: 2799,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Performance meets comfort",
    description:
      "Flexible track pants designed for training, running and active lifestyles.",
    features: [
      "Stretch Fabric",
      "Quick Dry",
      "Lightweight",
      "Breathable"
    ],
    details: [
      "Elastic Waist",
      "Tapered Leg",
      "Machine Wash",
      "Sports Wear"
    ]
  },

  {
    productName: "Everyday Jogger Track Pants",
    category: "Track Pants",
    gender: "unisex",
    ratings: 4.5,
    brand: "Puma",
    price: 2299,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Relaxed movement every day",
    description:
      "Comfortable jogger-style track pants for travel and casual wear.",
    features: [
      "Soft Fabric",
      "Stretchable",
      "Elastic Waist",
      "Comfort Fit"
    ],
    details: [
      "Jogger Fit",
      "Side Pockets",
      "Machine Wash",
      "Unisex"
    ]
  },

  // =========================================================
  // 8. BLAZERS
  // =========================================================

  {
    productName: "Classic Black Blazer",
    category: "Blazers",
    gender: "male",
    ratings: 4.8,
    brand: "Louis Philippe",
    price: 6999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1593032465171-8f8d7d5e0a4e",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Sharp tailoring for important moments",
    description:
      "A classic black blazer designed for formal events and sophisticated occasions.",
    features: [
      "Premium Fabric",
      "Tailored Fit",
      "Structured Shoulders",
      "Elegant Finish"
    ],
    details: [
      "Notch Lapel",
      "Button Closure",
      "Dry Clean",
      "Formal Wear"
    ]
  },

  {
    productName: "Women's Beige Blazer",
    category: "Blazers",
    gender: "female",
    ratings: 4.7,
    brand: "Mango",
    price: 6499,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Modern tailoring with elegance",
    description:
      "A sophisticated beige blazer suitable for office and smart casual outfits.",
    features: [
      "Tailored Silhouette",
      "Premium Fabric",
      "Elegant Color",
      "Modern Cut"
    ],
    details: [
      "Single Breasted",
      "Button Closure",
      "Dry Clean",
      "Formal Wear"
    ]
  },

  {
    productName: "Navy Casual Blazer",
    category: "Blazers",
    gender: "male",
    ratings: 4.6,
    brand: "Van Heusen",
    price: 5999,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Smart style beyond the office",
    description:
      "A versatile navy blazer designed for business meetings and evening events.",
    features: [
      "Comfort Stretch",
      "Premium Finish",
      "Tailored Fit",
      "Versatile Style"
    ],
    details: [
      "Notch Lapel",
      "Two Button",
      "Dry Clean",
      "Smart Casual"
    ]
  },

  // =========================================================
  // 9. SUITS
  // =========================================================

  {
    productName: "Classic Navy Suit",
    category: "Suits",
    gender: "male",
    ratings: 4.8,
    brand: "Van Heusen",
    price: 9999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    sizes: ["38", "40", "42", "44"],
    tagline: "Confidence tailored perfectly",
    description:
      "A classic navy two-piece suit designed for formal and professional occasions.",
    features: [
      "Premium Fabric",
      "Tailored Fit",
      "Wrinkle Resistant",
      "Elegant Finish"
    ],
    details: [
      "Two Piece",
      "Notch Lapel",
      "Dry Clean",
      "Formal Wear"
    ]
  },

  {
    productName: "Charcoal Business Suit",
    category: "Suits",
    gender: "male",
    ratings: 4.7,
    brand: "Raymond",
    price: 11999,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1593032465171-8f8d7d5e0a4e",
    sizes: ["38", "40", "42", "44", "46"],
    tagline: "Professional elegance redefined",
    description:
      "A premium charcoal suit designed for business meetings and formal occasions.",
    features: [
      "Premium Wool Blend",
      "Tailored Fit",
      "Breathable",
      "Luxury Finish"
    ],
    details: [
      "Two Piece",
      "Flat Front",
      "Dry Clean",
      "Formal Wear"
    ]
  },

  {
    productName: "Women's Formal Suit",
    category: "Suits",
    gender: "female",
    ratings: 4.6,
    brand: "Mango",
    price: 8499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Power dressing made elegant",
    description:
      "A contemporary women's suit designed for office and formal occasions.",
    features: [
      "Tailored Fit",
      "Premium Fabric",
      "Modern Silhouette",
      "Comfort Stretch"
    ],
    details: [
      "Blazer and Trousers",
      "Button Closure",
      "Dry Clean",
      "Formal Wear"
    ]
  },

  // =========================================================
  // 10. KURTA
  // =========================================================

  {
    productName: "Classic White Kurta",
    category: "Kurta",
    gender: "male",
    ratings: 4.7,
    brand: "Manyavar",
    price: 2499,
    discountPercentage: 20,
    imgURL:
      "https://unsplash.com/photos/black-white-and-orange-floral-button-up-shirt-pbzNZOWaS50",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Timeless Indian elegance",
    description:
      "A classic white kurta designed for festivals, celebrations and traditional occasions.",
    features: [
      "Cotton Fabric",
      "Comfort Fit",
      "Traditional Design",
      "Breathable"
    ],
    details: [
      "Full Sleeves",
      "Straight Fit",
      "Hand Wash",
      "Made in India"
    ]
  },

  {
    productName: "Printed Festive Kurta",
    category: "Kurta",
    gender: "male",
    ratings: 4.6,
    brand: "Fabindia",
    price: 2899,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Festive style with a modern touch",
    description:
      "A printed festive kurta combining traditional craftsmanship with contemporary styling.",
    features: [
      "Printed Design",
      "Cotton Blend",
      "Comfort Fit",
      "Festive Style"
    ],
    details: [
      "Full Sleeves",
      "Mandarin Collar",
      "Hand Wash",
      "Ethnic Wear"
    ]
  },

  {
    productName: "Premium Black Kurta",
    category: "Kurta",
    gender: "male",
    ratings: 4.8,
    brand: "Varshney",
    price: 3299,
    discountPercentage: 22,
    imgURL:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Minimal luxury in traditional wear",
    description:
      "A premium black kurta designed for elegant festive and evening occasions.",
    features: [
      "Premium Fabric",
      "Minimal Design",
      "Comfort Fit",
      "Elegant Finish"
    ],
    details: [
      "Mandarin Collar",
      "Full Sleeves",
      "Dry Clean",
      "Festive Wear"
    ]
  },

  // =========================================================
  // 11. SHERWANI
  // =========================================================

  {
    productName: "Premium Wedding Sherwani",
    category: "Sherwani",
    gender: "male",
    ratings: 4.9,
    brand: "Manyavar",
    price: 15999,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Royal style for your special day",
    description:
      "A luxury embroidered sherwani designed for weddings and grand celebrations.",
    features: [
      "Silk Fabric",
      "Hand Embroidery",
      "Premium Finish",
      "Royal Design"
    ],
    details: [
      "Full Sleeves",
      "Embroidered Front",
      "Dry Clean",
      "Wedding Wear"
    ]
  },

  {
    productName: "Ivory Royal Sherwani",
    category: "Sherwani",
    gender: "male",
    ratings: 4.8,
    brand: "Manyavar",
    price: 18999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
    sizes: ["M", "L", "XL"],
    tagline: "Royal elegance for celebrations",
    description:
      "An ivory sherwani featuring refined embroidery and a premium traditional silhouette.",
    features: [
      "Premium Silk",
      "Detailed Embroidery",
      "Luxury Finish",
      "Traditional Design"
    ],
    details: [
      "Full Sleeves",
      "Mandarin Collar",
      "Dry Clean",
      "Wedding Wear"
    ]
  },

  {
    productName: "Modern Designer Sherwani",
    category: "Sherwani",
    gender: "male",
    ratings: 4.7,
    brand: "Kisah",
    price: 13999,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Tradition meets modern design",
    description:
      "A contemporary sherwani created for modern wedding celebrations.",
    features: [
      "Designer Pattern",
      "Premium Fabric",
      "Modern Fit",
      "Elegant Embroidery"
    ],
    details: [
      "Full Sleeves",
      "Mandarin Collar",
      "Dry Clean",
      "Wedding Wear"
    ]
  },

  // =========================================================
  // 12. SWEATERS
  // =========================================================

  {
    productName: "Women's Knit Sweater",
    category: "Sweaters",
    gender: "female",
    ratings: 4.6,
    brand: "Forever 21",
    price: 2900,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Cozy warmth with effortless style",
    description:
      "A soft knit sweater designed for warmth and comfortable winter styling.",
    features: [
      "Soft Knit",
      "Warm Fabric",
      "Comfort Fit",
      "Easy Layering"
    ],
    details: [
      "Full Sleeves",
      "Crew Neck",
      "Gentle Wash",
      "Winter Wear"
    ]
  },

  {
    productName: "Men's Wool Blend Sweater",
    category: "Sweaters",
    gender: "male",
    ratings: 4.7,
    brand: "Allen Solly",
    price: 3199,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Classic warmth for cold days",
    description:
      "A premium wool-blend sweater offering warmth and timeless style.",
    features: [
      "Wool Blend",
      "Warm Material",
      "Classic Design",
      "Comfort Fit"
    ],
    details: [
      "Full Sleeves",
      "Crew Neck",
      "Gentle Wash",
      "Winter Wear"
    ]
  },

  {
    productName: "Cable Knit Sweater",
    category: "Sweaters",
    gender: "unisex",
    ratings: 4.5,
    brand: "H&M",
    price: 2799,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Texture, warmth and comfort",
    description:
      "A cable-knit sweater with a timeless pattern and cozy feel.",
    features: [
      "Cable Knit",
      "Warm Fabric",
      "Soft Texture",
      "Relaxed Fit"
    ],
    details: [
      "Crew Neck",
      "Full Sleeves",
      "Gentle Wash",
      "Unisex"
    ]
  },

  // =========================================================
  // 13. ETHNIC WEAR
  // =========================================================

  {
    productName: "Men's Ethnic Kurta Set",
    category: "Ethnic Wear",
    gender: "male",
    ratings: 4.8,
    brand: "Manyavar",
    price: 4999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Celebrate tradition in style",
    description:
      "A traditional kurta set designed for festivals and family celebrations.",
    features: [
      "Premium Cotton",
      "Traditional Design",
      "Comfort Fit",
      "Elegant Finish"
    ],
    details: [
      "Kurta and Bottom",
      "Full Sleeves",
      "Dry Clean",
      "Festive Wear"
    ]
  },

  {
    productName: "Women's Festive Ethnic Set",
    category: "Ethnic Wear",
    gender: "female",
    ratings: 4.7,
    brand: "Biba",
    price: 4299,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Graceful traditional elegance",
    description:
      "A stylish ethnic outfit designed for festivals and traditional occasions.",
    features: [
      "Elegant Print",
      "Soft Fabric",
      "Comfort Fit",
      "Festive Design"
    ],
    details: [
      "Two Piece Set",
      "Three Quarter Sleeves",
      "Hand Wash",
      "Made in India"
    ]
  },

  {
    productName: "Royal Ethnic Celebration Set",
    category: "Ethnic Wear",
    gender: "female",
    ratings: 4.8,
    brand: "Aurelia",
    price: 5499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Traditional beauty for special moments",
    description:
      "A premium ethnic set combining traditional inspiration with contemporary styling.",
    features: [
      "Premium Fabric",
      "Detailed Design",
      "Comfort Fit",
      "Festive Style"
    ],
    details: [
      "Three Piece Set",
      "Embroidered Details",
      "Dry Clean",
      "Festive Wear"
    ]
  },

  // =========================================================
  // 14. KURTIS
  // =========================================================

  {
    productName: "Women's Floral Kurti",
    category: "Kurtis",
    gender: "female",
    ratings: 4.8,
    brand: "Biba",
    price: 1999,
    discountPercentage: 30,
    imgURL:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Elegant traditional wear",
    description:
      "A printed floral kurti designed for festive and everyday ethnic styling.",
    features: [
      "Rayon Fabric",
      "Soft Material",
      "Elegant Print",
      "Comfort Fit"
    ],
    details: [
      "Three Quarter Sleeves",
      "Straight Fit",
      "Hand Wash",
      "Made in India"
    ]
  },

  {
    productName: "Printed Cotton Kurti",
    category: "Kurtis",
    gender: "female",
    ratings: 4.5,
    brand: "Aurelia",
    price: 1799,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Everyday ethnic comfort",
    description:
      "A lightweight cotton kurti designed for comfortable everyday wear.",
    features: [
      "Cotton Fabric",
      "Breathable",
      "Printed Design",
      "Easy Fit"
    ],
    details: [
      "Three Quarter Sleeves",
      "Straight Cut",
      "Machine Wash",
      "Daily Wear"
    ]
  },

  {
    productName: "Embroidered Party Kurti",
    category: "Kurtis",
    gender: "female",
    ratings: 4.7,
    brand: "W",
    price: 2699,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Elegant details for festive evenings",
    description:
      "A beautifully embroidered kurti suitable for parties and festive occasions.",
    features: [
      "Embroidered Design",
      "Premium Fabric",
      "Comfort Fit",
      "Festive Style"
    ],
    details: [
      "Three Quarter Sleeves",
      "Straight Fit",
      "Dry Clean",
      "Party Wear"
    ]
  },

  // =========================================================
  // 15. SAREES
  // =========================================================

  {
    productName: "Women's Pink Saree",
    category: "Sarees",
    gender: "female",
    ratings: 4.9,
    brand: "Manyavar Mohey",
    price: 6999,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    sizes: ["Free Size"],
    tagline: "Festive elegance redefined",
    description:
      "A designer saree suitable for weddings, festivals and special occasions.",
    features: [
      "Silk Blend",
      "Designer Border",
      "Premium Finish",
      "Elegant Draping"
    ],
    details: [
      "Free Size",
      "Matching Blouse",
      "Dry Clean",
      "Made in India"
    ]
  },

  {
    productName: "Classic Banarasi Saree",
    category: "Sarees",
    gender: "female",
    ratings: 4.8,
    brand: "Mimosa",
    price: 7999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    sizes: ["Free Size"],
    tagline: "Traditional craftsmanship",
    description:
      "A rich traditional-inspired saree designed for weddings and celebrations.",
    features: [
      "Rich Fabric",
      "Traditional Pattern",
      "Decorative Border",
      "Premium Finish"
    ],
    details: [
      "Free Size",
      "Matching Blouse",
      "Dry Clean",
      "Wedding Wear"
    ]
  },

  {
    productName: "Elegant Party Wear Saree",
    category: "Sarees",
    gender: "female",
    ratings: 4.7,
    brand: "Libas",
    price: 5999,
    discountPercentage: 22,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    sizes: ["Free Size"],
    tagline: "Effortless elegance for every celebration",
    description:
      "A lightweight party-wear saree featuring an elegant contemporary design.",
    features: [
      "Lightweight Fabric",
      "Elegant Border",
      "Comfortable",
      "Party Design"
    ],
    details: [
      "Free Size",
      "Blouse Included",
      "Dry Clean",
      "Party Wear"
    ]
  },

  // =========================================================
  // 16. LEHENGAS
  // =========================================================

  {
    productName: "Women's Designer Lehenga",
    category: "Lehengas",
    gender: "female",
    ratings: 5.0,
    brand: "Kalki Fashion",
    price: 24999,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Luxury bridal collection",
    description:
      "A luxurious embroidered lehenga designed for weddings and grand celebrations.",
    features: [
      "Heavy Embroidery",
      "Premium Fabric",
      "Bridal Design",
      "Luxury Finish"
    ],
    details: [
      "Lehenga and Blouse",
      "Dupatta Included",
      "Dry Clean",
      "Bridal Wear"
    ]
  },

  {
    productName: "Pastel Wedding Lehenga",
    category: "Lehengas",
    gender: "female",
    ratings: 4.8,
    brand: "Aza",
    price: 21999,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    sizes: ["S", "M", "L"],
    tagline: "Soft colors, timeless elegance",
    description:
      "A pastel lehenga designed for weddings, receptions and festive occasions.",
    features: [
      "Pastel Colors",
      "Detailed Embroidery",
      "Premium Fabric",
      "Elegant Design"
    ],
    details: [
      "Three Piece Set",
      "Dupatta Included",
      "Dry Clean",
      "Wedding Wear"
    ]
  },

  {
    productName: "Festive Embroidered Lehenga",
    category: "Lehengas",
    gender: "female",
    ratings: 4.7,
    brand: "Biba",
    price: 12999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Celebrate in beautiful tradition",
    description:
      "A festive embroidered lehenga designed for celebrations and family functions.",
    features: [
      "Embroidered Fabric",
      "Festive Design",
      "Comfortable",
      "Premium Finish"
    ],
    details: [
      "Three Piece Set",
      "Dupatta Included",
      "Dry Clean",
      "Festive Wear"
    ]
  },

  // =========================================================
  // 17. GOWNS
  // =========================================================

  {
    productName: "Women's Party Gown",
    category: "Gowns",
    gender: "female",
    ratings: 4.8,
    brand: "Forever New",
    price: 8499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Evening elegance",
    description:
      "An elegant gown designed for parties, receptions and evening events.",
    features: [
      "Premium Satin",
      "Elegant Design",
      "Comfort Fit",
      "Flowing Silhouette"
    ],
    details: [
      "Full Length",
      "Sleeveless",
      "Dry Clean",
      "Party Wear"
    ]
  },

  {
    productName: "Elegant Evening Gown",
    category: "Gowns",
    gender: "female",
    ratings: 4.7,
    brand: "Zara",
    price: 9499,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Make every entrance memorable",
    description:
      "A sophisticated evening gown featuring a graceful silhouette and premium finish.",
    features: [
      "Premium Fabric",
      "Elegant Silhouette",
      "Soft Finish",
      "Evening Design"
    ],
    details: [
      "Full Length",
      "Sleeveless",
      "Dry Clean",
      "Party Wear"
    ]
  },

  {
    productName: "Floral Summer Gown",
    category: "Gowns",
    gender: "female",
    ratings: 4.5,
    brand: "ONLY",
    price: 5999,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Light and graceful summer style",
    description:
      "A beautiful floral gown designed for summer parties and special occasions.",
    features: [
      "Floral Print",
      "Lightweight Fabric",
      "Comfort Fit",
      "Flowing Design"
    ],
    details: [
      "Midi Length",
      "Short Sleeves",
      "Machine Wash",
      "Party Wear"
    ]
  },

  // =========================================================
  // 18. LEGGINGS
  // =========================================================

  {
    productName: "Women's Black Leggings",
    category: "Leggings",
    gender: "female",
    ratings: 4.4,
    brand: "Zivame",
    price: 999,
    discountPercentage: 35,
    imgURL:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Daily comfort made simple",
    description:
      "Stretchable leggings designed for daily wear with a comfortable waistband.",
    features: [
      "Cotton Blend",
      "Elastic Waist",
      "Soft Fabric",
      "Stretchable"
    ],
    details: [
      "High Rise",
      "Full Length",
      "Machine Wash",
      "Daily Wear"
    ]
  },

  {
    productName: "High Waist Active Leggings",
    category: "Leggings",
    gender: "female",
    ratings: 4.7,
    brand: "Nike",
    price: 2499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Move with confidence",
    description:
      "High-waisted performance leggings designed for workouts and active lifestyles.",
    features: [
      "Stretch Fabric",
      "Moisture Wicking",
      "High Waist",
      "Supportive Fit"
    ],
    details: [
      "Full Length",
      "Elastic Waist",
      "Machine Wash",
      "Activewear"
    ]
  },

  {
    productName: "Everyday Cotton Leggings",
    category: "Leggings",
    gender: "female",
    ratings: 4.5,
    brand: "Aurelia",
    price: 1199,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Comfort for every day",
    description:
      "Soft cotton leggings suitable for casual outfits and everyday use.",
    features: [
      "Cotton Blend",
      "Soft Fabric",
      "Stretchable",
      "Comfort Fit"
    ],
    details: [
      "Full Length",
      "Elastic Waist",
      "Machine Wash",
      "Daily Wear"
    ]
  },

  // =========================================================
  // 19. PALAZZOS
  // =========================================================

  {
    productName: "Classic Black Palazzos",
    category: "Palazzos",
    gender: "female",
    ratings: 4.5,
    brand: "Mango",
    price: 2299,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Flowing comfort with elegant style",
    description:
      "Wide-leg black palazzos designed for comfortable everyday and office wear.",
    features: [
      "Wide Leg",
      "Flowing Fabric",
      "Comfort Waist",
      "Elegant Design"
    ],
    details: [
      "High Rise",
      "Full Length",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Printed Summer Palazzos",
    category: "Palazzos",
    gender: "female",
    ratings: 4.4,
    brand: "H&M",
    price: 1999,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Relaxed summer elegance",
    description:
      "Lightweight printed palazzos created for relaxed summer outfits.",
    features: [
      "Printed Design",
      "Lightweight",
      "Wide Leg",
      "Comfort Fit"
    ],
    details: [
      "High Rise",
      "Full Length",
      "Machine Wash",
      "Summer Wear"
    ]
  },

  {
    productName: "Formal Wide Leg Palazzos",
    category: "Palazzos",
    gender: "female",
    ratings: 4.6,
    brand: "ONLY",
    price: 2699,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Professional comfort with modern style",
    description:
      "Wide-leg trousers designed to create a sophisticated formal silhouette.",
    features: [
      "Wide Leg",
      "Premium Fabric",
      "Tailored Waist",
      "Modern Silhouette"
    ],
    details: [
      "High Rise",
      "Full Length",
      "Machine Wash",
      "Office Wear"
    ]
  },

  // =========================================================
  // 20. SKIRTS
  // =========================================================

  {
    productName: "Women's Summer Skirt",
    category: "Skirts",
    gender: "female",
    ratings: 4.4,
    brand: "Mango",
    price: 2500,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Light and stylish summer fashion",
    description:
      "A lightweight summer skirt designed for comfortable warm-weather styling.",
    features: [
      "Lightweight Fabric",
      "Comfort Fit",
      "Summer Design",
      "Versatile Style"
    ],
    details: [
      "Midi Length",
      "Regular Waist",
      "Machine Wash",
      "Summer Wear"
    ]
  },

  {
    productName: "Pleated Midi Skirt",
    category: "Skirts",
    gender: "female",
    ratings: 4.6,
    brand: "Zara",
    price: 2999,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Elegant movement in every step",
    description:
      "A sophisticated pleated midi skirt suitable for casual and semi-formal occasions.",
    features: [
      "Pleated Design",
      "Flowing Fabric",
      "Elegant Silhouette",
      "Comfort Fit"
    ],
    details: [
      "Midi Length",
      "High Rise",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  {
    productName: "Denim Mini Skirt",
    category: "Skirts",
    gender: "female",
    ratings: 4.5,
    brand: "ONLY",
    price: 2199,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Casual denim with modern attitude",
    description:
      "A stylish denim mini skirt designed for youthful casual outfits.",
    features: [
      "Denim Fabric",
      "Modern Design",
      "Comfort Fit",
      "Durable"
    ],
    details: [
      "Mini Length",
      "Button Closure",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  // =========================================================
  // 21. DRESSES
  // =========================================================

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
    tagline: "Beautiful floral style",
    description:
      "A feminine floral dress with a comfortable silhouette perfect for outings.",
    features: [
      "Floral Print",
      "Lightweight Fabric",
      "Comfort Fit",
      "Elegant Design"
    ],
    details: [
      "Midi Length",
      "Short Sleeves",
      "Machine Wash",
      "Casual Wear"
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
    tagline: "The timeless little black dress",
    description:
      "A sophisticated black dress suitable for dinners, parties and evening events.",
    features: [
      "Elegant Black Design",
      "Comfortable Fabric",
      "Modern Silhouette",
      "Versatile"
    ],
    details: [
      "Midi Length",
      "Sleeveless",
      "Dry Clean",
      "Party Wear"
    ]
  },

  {
    productName: "Casual Summer Dress",
    category: "Dresses",
    gender: "female",
    ratings: 4.5,
    brand: "H&M",
    price: 3199,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Easy summer elegance",
    description:
      "A lightweight casual dress designed for comfortable summer days.",
    features: [
      "Lightweight",
      "Breathable",
      "Comfort Fit",
      "Summer Design"
    ],
    details: [
      "Midi Length",
      "Short Sleeves",
      "Machine Wash",
      "Casual Wear"
    ]
  },

  // =========================================================
  // 22. COATS
  // =========================================================

  {
    productName: "Classic Black Coat",
    category: "Coats",
    gender: "male",
    ratings: 4.7,
    brand: "Van Heusen",
    price: 6999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1544441893-675973e31985",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Classic protection with refined style",
    description:
      "A sophisticated black coat designed for winter and formal occasions.",
    features: [
      "Warm Fabric",
      "Premium Finish",
      "Classic Design",
      "Comfort Fit"
    ],
    details: [
      "Full Length",
      "Button Closure",
      "Dry Clean",
      "Winter Wear"
    ]
  },

  {
    productName: "Women's Camel Coat",
    category: "Coats",
    gender: "female",
    ratings: 4.8,
    brand: "Mango",
    price: 7499,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1544441893-675973e31985",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Timeless winter elegance",
    description:
      "A sophisticated camel coat designed for cold-weather layering.",
    features: [
      "Warm Material",
      "Elegant Color",
      "Premium Finish",
      "Tailored Fit"
    ],
    details: [
      "Long Length",
      "Button Closure",
      "Dry Clean",
      "Winter Wear"
    ]
  },

  {
    productName: "Wool Blend Overcoat",
    category: "Coats",
    gender: "male",
    ratings: 4.6,
    brand: "Raymond",
    price: 8999,
    discountPercentage: 18,
    imgURL:
      "https://images.unsplash.com/photo-1544441893-675973e31985",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Premium warmth for winter",
    description:
      "A premium wool-blend overcoat designed for sophisticated winter dressing.",
    features: [
      "Wool Blend",
      "Warm Construction",
      "Premium Finish",
      "Long Silhouette"
    ],
    details: [
      "Full Length",
      "Button Closure",
      "Dry Clean",
      "Winter Wear"
    ]
  },

  // =========================================================
  // 23. WINTER WEAR
  // =========================================================

  {
    productName: "Classic Winter Jacket",
    category: "Winter Wear",
    gender: "male",
    ratings: 4.6,
    brand: "Puma",
    price: 4999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Stay warm in style",
    description:
      "A warm winter jacket designed for cold weather and everyday outdoor use.",
    features: [
      "Warm Lining",
      "Water Resistant",
      "Full Sleeves",
      "Comfort Fit"
    ],
    details: [
      "Zip Closure",
      "Side Pockets",
      "Machine Wash",
      "Winter Wear"
    ]
  },

  {
    productName: "Women's Puffer Jacket",
    category: "Winter Wear",
    gender: "female",
    ratings: 4.7,
    brand: "ONLY",
    price: 5299,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Warmth without the bulk",
    description:
      "A lightweight puffer jacket designed to keep you warm during winter.",
    features: [
      "Lightweight",
      "Insulated",
      "Warm Lining",
      "Modern Fit"
    ],
    details: [
      "Full Sleeves",
      "Zip Closure",
      "Machine Wash",
      "Winter Wear"
    ]
  },

  {
    productName: "Fleece Winter Pullover",
    category: "Winter Wear",
    gender: "unisex",
    ratings: 4.5,
    brand: "Decathlon",
    price: 2799,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Everyday warmth made comfortable",
    description:
      "A soft fleece pullover designed for outdoor activities and cold days.",
    features: [
      "Fleece Fabric",
      "Warm",
      "Lightweight",
      "Comfort Fit"
    ],
    details: [
      "Full Sleeves",
      "High Neck",
      "Machine Wash",
      "Unisex"
    ]
  },

  // =========================================================
  // 24. SPORTS WEAR
  // =========================================================

  {
    productName: "Performance Training T-Shirt",
    category: "Sports Wear",
    gender: "male",
    ratings: 4.7,
    brand: "Nike",
    price: 1999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Train harder, move better",
    description:
      "A lightweight performance T-shirt designed for workouts and training.",
    features: [
      "Moisture Wicking",
      "Quick Dry",
      "Lightweight",
      "Breathable"
    ],
    details: [
      "Round Neck",
      "Half Sleeves",
      "Machine Wash",
      "Sports Wear"
    ]
  },

  {
    productName: "Women's Active Training Set",
    category: "Sports Wear",
    gender: "female",
    ratings: 4.8,
    brand: "Nike",
    price: 3999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1506629905607-d9c297d8d5e6",
    sizes: ["XS", "S", "M", "L", "XL"],
    tagline: "Performance designed for movement",
    description:
      "A comfortable activewear set designed for workouts, running and fitness activities.",
    features: [
      "Stretch Fabric",
      "Moisture Wicking",
      "Breathable",
      "Flexible Fit"
    ],
    details: [
      "Top and Bottom",
      "Machine Wash",
      "Quick Dry",
      "Sports Wear"
    ]
  },

  {
    productName: "Training Jogger Set",
    category: "Sports Wear",
    gender: "unisex",
    ratings: 4.6,
    brand: "Adidas",
    price: 4299,
    discountPercentage: 25,
    imgURL:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Comfort that keeps you moving",
    description:
      "A versatile sports jogger set suitable for training, travel and everyday activity.",
    features: [
      "Stretch Fabric",
      "Breathable",
      "Comfort Fit",
      "Quick Dry"
    ],
    details: [
      "Top and Joggers",
      "Elastic Waist",
      "Machine Wash",
      "Unisex"
    ]
  },

  // =========================================================
  // 25. ACCESSORIES
  // =========================================================

  {
    productName: "Classic Leather Watch",
    category: "Accessories",
    gender: "male",
    ratings: 4.6,
    brand: "Fossil",
    price: 5999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    sizes: ["Free Size"],
    tagline: "Timeless detail for every outfit",
    description:
      "A classic leather-strap watch designed to complement formal and casual outfits.",
    features: [
      "Leather Strap",
      "Classic Dial",
      "Premium Finish",
      "Quartz Movement"
    ],
    details: [
      "Analog Display",
      "Adjustable Strap",
      "Water Resistant",
      "Gift Ready"
    ]
  },

  {
    productName: "Minimalist Women's Watch",
    category: "Accessories",
    gender: "female",
    ratings: 4.7,
    brand: "Titan",
    price: 4499,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    sizes: ["Free Size"],
    tagline: "Elegant simplicity for every day",
    description:
      "A minimalist watch with a clean dial and sophisticated finish.",
    features: [
      "Minimal Dial",
      "Premium Strap",
      "Elegant Design",
      "Quartz Movement"
    ],
    details: [
      "Analog Display",
      "Adjustable Strap",
      "Water Resistant",
      "Everyday Wear"
    ]
  },

  {
    productName: "Premium Fashion Sunglasses",
    category: "Accessories",
    gender: "unisex",
    ratings: 4.5,
    brand: "Ray-Ban",
    price: 6999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    sizes: ["Free Size"],
    tagline: "Complete your look",
    description:
      "Stylish sunglasses designed to add a sophisticated finishing touch to everyday outfits.",
    features: [
      "UV Protection",
      "Premium Frame",
      "Lightweight",
      "Modern Design"
    ],
    details: [
      "One Size",
      "Protective Case",
      "UV Protection",
      "Unisex"
    ]
  }
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB connected successfully.");

    console.log(
      `Preparing to insert ${products.length} products...`
    );

    // WARNING:
    // This removes all existing products before inserting
    // the new catalog.
    await ProductModel.deleteMany({});

    console.log("Existing products removed.");

    await ProductModel.insertMany(products);

    console.log(
      `✅ ${products.length} products inserted successfully.`
    );

    // Show category count
    const categoryCounts = {};

    products.forEach((product) => {
      categoryCounts[product.category] =
        (categoryCounts[product.category] || 0) + 1;
    });

    console.log("\nProducts by category:");

    Object.entries(categoryCounts).forEach(
      ([category, count]) => {
        console.log(`- ${category}: ${count}`);
      }
    );

    console.log(
      `\n✅ Total categories: ${Object.keys(categoryCounts).length}`
    );

    console.log(
      `✅ Total products: ${products.length}`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:");
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();