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
    productName: "Classic Essential T-Shirt",
    category: "T-Shirts",
    gender: "unisex",
    ratings: 4.5,
    brand: "Urban Core",
    price: 799,
    discountPercentage: 15,
    imgURL:
      "https://www.pexels.com/photo/man-in-black-crew-neck-t-shirt-holding-white-metal-bar-9558581/",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "A clean everyday essential.",
    description:
      "A versatile everyday T-shirt designed for casual outfits and comfortable daily wear.",
    features: [
      "Soft cotton fabric",
      "Regular fit",
      "Crew neckline",
      "Breathable construction"
    ],
    details: [
      "Suitable for everyday wear",
      "Easy to pair with trousers, jeans and shorts",
      "Machine washable"
    ]
  },

  {
    productName: "Everyday Cotton Tee",
    category: "T-Shirts",
    gender: "unisex",
    ratings: 4.4,
    brand: "Threadline",
    price: 699,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Simple comfort for every day.",
    description:
      "A minimal cotton T-shirt with a timeless silhouette for everyday casual styling.",
    features: [
      "Cotton fabric",
      "Classic silhouette",
      "Comfortable neckline",
      "Lightweight feel"
    ],
    details: [
      "Designed for casual styling",
      "Suitable for regular use",
      "Easy-care fabric"
    ]
  },

  {
    productName: "Minimal Casual T-Shirt",
    category: "T-Shirts",
    gender: "unisex",
    ratings: 4.6,
    brand: "North Avenue",
    price: 899,
    discountPercentage: 20,
    imgURL:
      "https://www.pexels.com/photo/man-in-casual-clothes-on-balcony-4724770/",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Minimal look. Maximum versatility.",
    description:
      "A clean-cut casual T-shirt made for simple and versatile everyday outfits.",
    features: [
      "Comfort-fit design",
      "Soft-touch fabric",
      "Crew neck",
      "Everyday construction"
    ],
    details: [
      "Works with casual and smart-casual outfits",
      "Suitable for all-day wear",
      "Regular fit"
    ]
  },


  // =========================================================
  // 2. HOODIES
  // =========================================================

  {
    productName: "Classic Pullover Hoodie",
    category: "Hoodies",
    gender: "unisex",
    ratings: 4.7,
    brand: "Street Core",
    price: 1499,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Comfort built for everyday layers.",
    description:
      "A classic pullover hoodie designed for relaxed streetwear and comfortable layering.",
    features: [
      "Pullover construction",
      "Adjustable hood",
      "Relaxed fit",
      "Soft interior"
    ],
    details: [
      "Ideal for casual outfits",
      "Suitable for cooler weather",
      "Easy to layer"
    ]
  },

  {
    productName: "Relaxed Street Hoodie",
    category: "Hoodies",
    gender: "unisex",
    ratings: 4.5,
    brand: "Urban District",
    price: 1699,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Relaxed style for the streets.",
    description:
      "A relaxed hoodie inspired by contemporary streetwear silhouettes.",
    features: [
      "Relaxed fit",
      "Hooded design",
      "Long sleeves",
      "Soft fabric"
    ],
    details: [
      "Designed for casual styling",
      "Suitable for layering",
      "Comfort-focused construction"
    ]
  },

  {
    productName: "Everyday Comfort Hoodie",
    category: "Hoodies",
    gender: "unisex",
    ratings: 4.6,
    brand: "Daily Wear Co.",
    price: 1599,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Your everyday comfort layer.",
    description:
      "A practical hoodie made for relaxed everyday dressing and cool-weather comfort.",
    features: [
      "Comfortable fit",
      "Hooded neckline",
      "Long sleeves",
      "Layer-friendly design"
    ],
    details: [
      "Good for travel and casual use",
      "Pairs easily with trousers and shorts",
      "Designed for repeated wear"
    ]
  },


  // =========================================================
  // 3. SWEATSHIRTS
  // =========================================================

  {
    productName: "Classic Crew Sweatshirt",
    category: "Sweatshirts",
    gender: "unisex",
    ratings: 4.5,
    brand: "Urban Core",
    price: 1299,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Clean and comfortable layering.",
    description:
      "A classic crew-neck sweatshirt designed for comfortable everyday layering.",
    features: [
      "Crew neckline",
      "Long sleeves",
      "Comfortable construction",
      "Casual silhouette"
    ],
    details: [
      "Suitable for casual outfits",
      "Easy to layer",
      "Designed for everyday wear"
    ]
  },

  {
    productName: "Relaxed Everyday Sweatshirt",
    category: "Sweatshirts",
    gender: "unisex",
    ratings: 4.4,
    brand: "Threadline",
    price: 1399,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Easy comfort for cooler days.",
    description:
      "A relaxed sweatshirt created for simple casual outfits and comfortable layering.",
    features: [
      "Relaxed fit",
      "Crew neck",
      "Long sleeves",
      "Soft feel"
    ],
    details: [
      "Suitable for everyday casual wear",
      "Pairs well with trousers and cargo pants",
      "Layer-friendly"
    ]
  },

  {
    productName: "Modern Casual Sweatshirt",
    category: "Sweatshirts",
    gender: "unisex",
    ratings: 4.6,
    brand: "North Avenue",
    price: 1499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    tagline: "A modern take on casual layering.",
    description:
      "A versatile sweatshirt with a simple modern silhouette for everyday styling.",
    features: [
      "Modern fit",
      "Crew neckline",
      "Long sleeves",
      "Everyday fabric"
    ],
    details: [
      "Suitable for casual outfits",
      "Comfortable for extended wear",
      "Easy to style"
    ]
  },


  // =========================================================
  // 4. TROUSERS
  // =========================================================

  {
    productName: "Classic Tailored Trousers",
    category: "Trousers",
    gender: "male",
    ratings: 4.5,
    brand: "Executive Line",
    price: 1899,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Sharp tailoring for everyday style.",
    description:
      "Classic trousers designed with a clean silhouette for smart and semi-formal outfits.",
    features: [
      "Tailored silhouette",
      "Clean finish",
      "Comfortable waistband",
      "Versatile styling"
    ],
    details: [
      "Suitable for office and smart-casual outfits",
      "Pairs well with shirts and blazers",
      "Designed for polished styling"
    ]
  },

  {
    productName: "Modern Straight Trousers",
    category: "Trousers",
    gender: "male",
    ratings: 4.4,
    brand: "Form & Fit",
    price: 1799,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36"],
    tagline: "A clean straight-leg silhouette.",
    description:
      "Modern straight trousers designed for smart-casual and everyday professional dressing.",
    features: [
      "Straight fit",
      "Clean construction",
      "Comfortable waistband",
      "Versatile design"
    ],
    details: [
      "Suitable for workwear",
      "Easy to pair with formal and casual tops",
      "Designed for regular use"
    ]
  },

  {
    productName: "Everyday Formal Trousers",
    category: "Trousers",
    gender: "male",
    ratings: 4.6,
    brand: "Urban Formal",
    price: 1999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36", "38"],
    tagline: "Professional style without the effort.",
    description:
      "A refined pair of trousers designed for office, formal and smart-casual occasions.",
    features: [
      "Smart silhouette",
      "Comfortable fit",
      "Clean finish",
      "Professional styling"
    ],
    details: [
      "Suitable for office wear",
      "Pairs well with blazers and shirts",
      "Designed for polished outfits"
    ]
  },


  // =========================================================
  // 5. SHORTS
  // =========================================================

  {
    productName: "Classic Casual Shorts",
    category: "Shorts",
    gender: "male",
    ratings: 4.5,
    brand: "Weekend Co.",
    price: 899,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1583176407414-cefc059dc06d?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Easy summer comfort.",
    description:
      "Casual shorts designed for relaxed warm-weather outfits and everyday comfort.",
    features: [
      "Casual silhouette",
      "Comfortable fit",
      "Easy movement",
      "Everyday styling"
    ],
    details: [
      "Suitable for summer wear",
      "Great for casual outings",
      "Easy to pair with T-shirts"
    ]
  },

  {
    productName: "Relaxed Weekend Shorts",
    category: "Shorts",
    gender: "male",
    ratings: 4.4,
    brand: "Daily Motion",
    price: 999,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1583176407414-cefc059dc06d?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Made for relaxed days.",
    description:
      "Relaxed everyday shorts designed for weekends, travel and casual activities.",
    features: [
      "Relaxed fit",
      "Comfort-focused design",
      "Casual silhouette",
      "Lightweight feel"
    ],
    details: [
      "Suitable for travel",
      "Ideal for casual outings",
      "Easy everyday styling"
    ]
  },

  {
    productName: "Everyday Summer Shorts",
    category: "Shorts",
    gender: "male",
    ratings: 4.6,
    brand: "Coastal Wear",
    price: 1099,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1583176407414-cefc059dc06d?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    tagline: "Light, casual and summer-ready.",
    description:
      "Comfortable summer shorts designed for relaxed warm-weather dressing.",
    features: [
      "Summer-friendly design",
      "Comfortable fit",
      "Casual styling",
      "Easy movement"
    ],
    details: [
      "Suitable for warm weather",
      "Pairs well with casual T-shirts",
      "Good for vacations and weekends"
    ]
  },


  // =========================================================
  // 6. CARGO PANTS
  // =========================================================

  {
    productName: "Classic Utility Cargo Pants",
    category: "Cargo Pants",
    gender: "unisex",
    ratings: 4.7,
    brand: "Utility Lab",
    price: 1699,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1644955734676-9f24f7d4f929?auto=format&fit=crop&w=800&q=80",
    sizes: ["28", "30", "32", "34", "36"],
    tagline: "Utility-inspired everyday style.",
    description:
      "Cargo pants designed around a practical utility-inspired silhouette for casual outfits.",
    features: [
      "Cargo pocket styling",
      "Relaxed silhouette",
      "Utility-inspired design",
      "Everyday construction"
    ],
    details: [
      "Suitable for streetwear",
      "Pairs well with T-shirts and hoodies",
      "Designed for casual use"
    ]
  },

  {
    productName: "Relaxed Utility Cargo",
    category: "Cargo Pants",
    gender: "unisex",
    ratings: 4.5,
    brand: "Street Utility",
    price: 1799,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1644955734676-9f24f7d4f929?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36"],
    tagline: "Relaxed fit with utility character.",
    description:
      "Relaxed cargo pants inspired by contemporary streetwear and utility fashion.",
    features: [
      "Relaxed fit",
      "Cargo pocket design",
      "Casual silhouette",
      "Streetwear styling"
    ],
    details: [
      "Suitable for everyday casual outfits",
      "Works with oversized T-shirts",
      "Easy to style with sneakers"
    ]
  },

  {
    productName: "Urban Cargo Trousers",
    category: "Cargo Pants",
    gender: "unisex",
    ratings: 4.6,
    brand: "Urban Field",
    price: 1899,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1644955734676-9f24f7d4f929?auto=format&fit=crop&w=800&q=80",
    sizes: ["28", "30", "32", "34", "36"],
    tagline: "Utility meets modern streetwear.",
    description:
      "Modern cargo trousers designed for practical styling and contemporary casual outfits.",
    features: [
      "Cargo pocket details",
      "Modern relaxed shape",
      "Utility-inspired styling",
      "Comfort-focused design"
    ],
    details: [
      "Suitable for streetwear",
      "Easy to pair with hoodies",
      "Designed for everyday outfits"
    ]
  },


  // =========================================================
  // 7. BLAZERS
  // =========================================================

  {
    productName: "Classic Structured Blazer",
    category: "Blazers",
    gender: "male",
    ratings: 4.7,
    brand: "Executive Line",
    price: 2999,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80",
    sizes: ["38", "40", "42", "44"],
    tagline: "Polished structure for modern dressing.",
    description:
      "A structured blazer designed for professional, formal and smart-casual styling.",
    features: [
      "Structured silhouette",
      "Classic lapel",
      "Smart finish",
      "Versatile styling"
    ],
    details: [
      "Suitable for office wear",
      "Works for formal occasions",
      "Pairs well with trousers"
    ]
  },

  {
    productName: "Modern Smart Blazer",
    category: "Blazers",
    gender: "male",
    ratings: 4.5,
    brand: "Form & Fit",
    price: 3299,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80",
    sizes: ["38", "40", "42", "44", "46"],
    tagline: "Smart tailoring with modern character.",
    description:
      "A contemporary blazer designed to transition between professional and smart-casual outfits.",
    features: [
      "Modern cut",
      "Classic lapel",
      "Tailored appearance",
      "Versatile construction"
    ],
    details: [
      "Suitable for business occasions",
      "Can be styled casually",
      "Pairs with trousers and shirts"
    ]
  },

  {
    productName: "Everyday Formal Blazer",
    category: "Blazers",
    gender: "male",
    ratings: 4.6,
    brand: "Urban Formal",
    price: 2899,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80",
    sizes: ["38", "40", "42", "44"],
    tagline: "A reliable formal wardrobe essential.",
    description:
      "A versatile blazer created for office meetings, events and polished everyday dressing.",
    features: [
      "Formal silhouette",
      "Clean tailoring",
      "Classic design",
      "Easy layering"
    ],
    details: [
      "Suitable for office outfits",
      "Works with formal trousers",
      "Suitable for events"
    ]
  },


  // =========================================================
  // 8. SUITS
  // =========================================================

  {
    productName: "Classic Business Suit",
    category: "Suits",
    gender: "male",
    ratings: 4.8,
    brand: "Executive Line",
    price: 4999,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    sizes: ["38", "40", "42", "44", "46"],
    tagline: "Timeless tailoring for important occasions.",
    description:
      "A classic suit designed for business meetings, formal events and sophisticated dressing.",
    features: [
      "Tailored silhouette",
      "Formal construction",
      "Classic styling",
      "Professional appearance"
    ],
    details: [
      "Suitable for business occasions",
      "Ideal for formal events",
      "Designed for polished styling"
    ]
  },

  {
    productName: "Modern Formal Suit",
    category: "Suits",
    gender: "male",
    ratings: 4.7,
    brand: "Form & Fit",
    price: 5499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    sizes: ["38", "40", "42", "44"],
    tagline: "Modern tailoring for formal occasions.",
    description:
      "A refined formal suit with a contemporary silhouette for professional and special occasions.",
    features: [
      "Modern tailoring",
      "Formal silhouette",
      "Clean finish",
      "Professional styling"
    ],
    details: [
      "Suitable for weddings and formal events",
      "Ideal for professional occasions",
      "Pairs with formal shirts"
    ]
  },

  {
    productName: "Premium Occasion Suit",
    category: "Suits",
    gender: "male",
    ratings: 4.8,
    brand: "Royal Form",
    price: 5999,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    sizes: ["40", "42", "44", "46"],
    tagline: "Refined tailoring for standout occasions.",
    description:
      "A premium-looking formal suit designed for weddings, celebrations and important events.",
    features: [
      "Refined silhouette",
      "Formal design",
      "Clean tailoring",
      "Occasion-ready styling"
    ],
    details: [
      "Suitable for weddings",
      "Ideal for formal celebrations",
      "Designed for sophisticated outfits"
    ]
  },


  // =========================================================
  // 9. ETHNIC WEAR
  // =========================================================

  {
    productName: "Classic Ethnic Kurta",
    category: "Ethnic Wear",
    gender: "male",
    ratings: 4.6,
    brand: "Heritage Loom",
    price: 1599,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Traditional style with a modern finish.",
    description:
      "A classic ethnic kurta designed for festive celebrations, cultural occasions and traditional styling.",
    features: [
      "Traditional silhouette",
      "Comfortable fit",
      "Ethnic detailing",
      "Versatile styling"
    ],
    details: [
      "Suitable for festive occasions",
      "Works with traditional bottoms",
      "Suitable for cultural events"
    ]
  },

  {
    productName: "Festive Ethnic Kurta",
    category: "Ethnic Wear",
    gender: "male",
    ratings: 4.5,
    brand: "Heritage Loom",
    price: 1799,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    tagline: "Made for celebrations.",
    description:
      "A festive ethnic kurta designed for traditional celebrations and special family occasions.",
    features: [
      "Festive styling",
      "Comfortable construction",
      "Traditional design",
      "Easy movement"
    ],
    details: [
      "Suitable for festivals",
      "Ideal for family celebrations",
      "Pairs well with traditional trousers"
    ]
  },

  {
    productName: "Traditional Celebration Kurta",
    category: "Ethnic Wear",
    gender: "male",
    ratings: 4.7,
    brand: "Royal Heritage",
    price: 1999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Traditional elegance for special moments.",
    description:
      "A traditional kurta designed to bring a refined ethnic look to celebrations and cultural occasions.",
    features: [
      "Traditional silhouette",
      "Festive styling",
      "Comfortable fit",
      "Elegant appearance"
    ],
    details: [
      "Suitable for festive events",
      "Ideal for celebrations",
      "Easy to style traditionally"
    ]
  },


  // =========================================================
  // 10. SAREES
  // =========================================================

  {
    productName: "Classic Traditional Saree",
    category: "Sarees",
    gender: "female",
    ratings: 4.8,
    brand: "Heritage Weaves",
    price: 2499,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    tagline: "Timeless Indian elegance.",
    description:
      "A traditional saree designed for festive occasions, celebrations and elegant ethnic styling.",
    features: [
      "Traditional drape",
      "Elegant appearance",
      "Festive styling",
      "Classic silhouette"
    ],
    details: [
      "Suitable for celebrations",
      "Ideal for festive occasions",
      "Designed for traditional styling"
    ]
  },

  {
    productName: "Festive Heritage Saree",
    category: "Sarees",
    gender: "female",
    ratings: 4.7,
    brand: "Heritage Weaves",
    price: 2999,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    tagline: "A graceful choice for celebrations.",
    description:
      "A heritage-inspired saree designed for festive dressing and traditional celebrations.",
    features: [
      "Traditional styling",
      "Elegant drape",
      "Festive appearance",
      "Classic design"
    ],
    details: [
      "Suitable for festivals",
      "Ideal for family occasions",
      "Pairs well with traditional accessories"
    ]
  },

  {
    productName: "Elegant Occasion Saree",
    category: "Sarees",
    gender: "female",
    ratings: 4.9,
    brand: "Royal Heritage",
    price: 3499,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    tagline: "Elegant traditional wear for special occasions.",
    description:
      "A refined saree designed for weddings, celebrations and other special occasions.",
    features: [
      "Occasion-ready styling",
      "Traditional drape",
      "Elegant appearance",
      "Classic ethnic design"
    ],
    details: [
      "Suitable for weddings",
      "Ideal for celebrations",
      "Pairs with traditional jewellery"
    ]
  },


  // =========================================================
  // 11. PALAZZOS
  // =========================================================

  {
    productName: "Classic Wide-Leg Palazzo",
    category: "Palazzos",
    gender: "female",
    ratings: 4.6,
    brand: "Modern Muse",
    price: 1299,
    discountPercentage: 15,
    imgURL:
      "https://images.pexels.com/photos/2659787/pexels-photo-2659787.jpeg?auto=compress&cs=tinysrgb&w=800",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Relaxed elegance with a flowing silhouette.",
    description:
      "Wide-leg palazzo pants designed for comfortable and contemporary women's styling.",
    features: [
      "Wide-leg silhouette",
      "Flowing design",
      "Comfortable fit",
      "Versatile styling"
    ],
    details: [
      "Suitable for casual outfits",
      "Works well with fitted tops",
      "Ideal for relaxed styling"
    ]
  },

  {
    productName: "Flowing Everyday Palazzo",
    category: "Palazzos",
    gender: "female",
    ratings: 4.5,
    brand: "Urban Muse",
    price: 1399,
    discountPercentage: 10,
    imgURL:
      "https://images.pexels.com/photos/2659787/pexels-photo-2659787.jpeg?auto=compress&cs=tinysrgb&w=800",
    sizes: ["S", "M", "L"],
    tagline: "Comfortable flow for everyday outfits.",
    description:
      "Flowing palazzo pants designed for comfortable everyday fashion and relaxed silhouettes.",
    features: [
      "Wide-leg fit",
      "Flowing construction",
      "Comfortable design",
      "Easy styling"
    ],
    details: [
      "Suitable for daily wear",
      "Pairs with tops and kurtis",
      "Ideal for relaxed outfits"
    ]
  },

  {
    productName: "Contemporary Palazzo Pants",
    category: "Palazzos",
    gender: "female",
    ratings: 4.7,
    brand: "Modern Muse",
    price: 1499,
    discountPercentage: 20,
    imgURL:
      "https://images.pexels.com/photos/2659787/pexels-photo-2659787.jpeg?auto=compress&cs=tinysrgb&w=800",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Modern comfort with a graceful fall.",
    description:
      "Contemporary wide-leg palazzo pants designed for stylish casual and semi-formal outfits.",
    features: [
      "Wide-leg silhouette",
      "Comfortable construction",
      "Modern styling",
      "Flowing appearance"
    ],
    details: [
      "Suitable for casual occasions",
      "Pairs with kurtis and tops",
      "Easy to dress up or down"
    ]
  },


  // =========================================================
  // 12. COATS
  // =========================================================

  {
    productName: "Classic Winter Coat",
    category: "Coats",
    gender: "female",
    ratings: 4.7,
    brand: "Winter Edit",
    price: 2999,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1542542856-d29decffd6ba?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Warm layering with a refined finish.",
    description:
      "A stylish winter coat designed for cold-weather layering and polished seasonal outfits.",
    features: [
      "Winter-ready design",
      "Long silhouette",
      "Layer-friendly construction",
      "Refined appearance"
    ],
    details: [
      "Suitable for cold weather",
      "Works with casual and formal outfits",
      "Designed for seasonal layering"
    ]
  },

  {
    productName: "Elegant Winter Overcoat",
    category: "Coats",
    gender: "female",
    ratings: 4.6,
    brand: "Winter Edit",
    price: 3299,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1542542856-d29decffd6ba?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    tagline: "A polished layer for colder days.",
    description:
      "A refined winter overcoat designed to complement seasonal outfits while providing a layered outer look.",
    features: [
      "Long outer layer",
      "Winter styling",
      "Elegant silhouette",
      "Layer-friendly design"
    ],
    details: [
      "Suitable for winter outfits",
      "Works over sweaters and dresses",
      "Designed for polished seasonal looks"
    ]
  },

  {
    productName: "Modern Cold-Weather Coat",
    category: "Coats",
    gender: "female",
    ratings: 4.5,
    brand: "Urban Winter",
    price: 3499,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1542542856-d29decffd6ba?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    tagline: "Modern outerwear for winter styling.",
    description:
      "A contemporary winter coat designed for comfortable layering and seasonal fashion.",
    features: [
      "Cold-weather outerwear",
      "Modern silhouette",
      "Comfortable layering",
      "Seasonal design"
    ],
    details: [
      "Suitable for winter",
      "Ideal for outdoor use",
      "Easy to layer"
    ]
  },


  // =========================================================
  // 13. SPORTS WEAR
  // =========================================================

  {
    productName: "Performance Training Wear",
    category: "Sports Wear",
    gender: "unisex",
    ratings: 4.7,
    brand: "Active Motion",
    price: 1399,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Designed for active movement.",
    description:
      "Sportswear designed for workouts, training sessions and active everyday routines.",
    features: [
      "Movement-friendly design",
      "Athletic silhouette",
      "Comfort-focused construction",
      "Training-ready style"
    ],
    details: [
      "Suitable for workouts",
      "Good for training sessions",
      "Designed for active use"
    ]
  },

  {
    productName: "Everyday Active Sportswear",
    category: "Sports Wear",
    gender: "unisex",
    ratings: 4.6,
    brand: "Active Motion",
    price: 1499,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tagline: "Comfort for training and movement.",
    description:
      "Active sportswear designed for exercise, gym sessions and everyday active lifestyles.",
    features: [
      "Athletic construction",
      "Movement-friendly fit",
      "Comfortable design",
      "Sport-inspired styling"
    ],
    details: [
      "Suitable for gym workouts",
      "Good for training",
      "Suitable for active routines"
    ]
  },

  {
    productName: "Training Essentials Set",
    category: "Sports Wear",
    gender: "unisex",
    ratings: 4.5,
    brand: "Motion Lab",
    price: 1599,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Built around an active lifestyle.",
    description:
      "A sportswear essential designed for training, exercise and comfortable active movement.",
    features: [
      "Training-focused design",
      "Comfortable fit",
      "Athletic styling",
      "Movement-friendly construction"
    ],
    details: [
      "Suitable for exercise",
      "Good for training sessions",
      "Designed for active lifestyles"
    ]
  },


  // =========================================================
  // 14. ACCESSORIES
  // =========================================================

  {
    productName: "Classic Everyday Watch",
    category: "Accessories",
    gender: "unisex",
    ratings: 4.7,
    brand: "Timecraft",
    price: 1999,
    discountPercentage: 15,
    imgURL:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    tagline: "A timeless finishing touch.",
    description:
      "A classic wristwatch designed to complement everyday outfits with a refined accessory look.",
    features: [
      "Classic watch design",
      "Everyday styling",
      "Versatile accessory",
      "Timeless appearance"
    ],
    details: [
      "Suitable for everyday wear",
      "Works with casual and formal outfits",
      "Designed as a wardrobe accessory"
    ]
  },

  {
    productName: "Minimal Style Watch",
    category: "Accessories",
    gender: "unisex",
    ratings: 4.6,
    brand: "Timecraft",
    price: 2299,
    discountPercentage: 10,
    imgURL:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    tagline: "Minimal design for everyday style.",
    description:
      "A minimal wristwatch designed as a versatile accessory for everyday fashion.",
    features: [
      "Minimal appearance",
      "Classic wristwatch format",
      "Everyday styling",
      "Versatile accessory"
    ],
    details: [
      "Suitable for casual outfits",
      "Works with smart-casual looks",
      "Easy everyday accessory"
    ]
  },

  {
    productName: "Premium Fashion Watch",
    category: "Accessories",
    gender: "unisex",
    ratings: 4.8,
    brand: "Timecraft",
    price: 2499,
    discountPercentage: 20,
    imgURL:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    tagline: "A refined accessory for polished looks.",
    description:
      "A fashion-focused wristwatch designed to add a refined finishing touch to everyday and formal outfits.",
    features: [
      "Fashion accessory",
      "Classic watch styling",
      "Versatile design",
      "Refined appearance"
    ],
    details: [
      "Suitable for formal and casual outfits",
      "Designed for everyday styling",
      "Makes a versatile wardrobe accessory"
    ]
  }

];


// =========================================================
// DATABASE CONNECTION + SEED
// =========================================================

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