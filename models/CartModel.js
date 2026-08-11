const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    selectedSize: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    productDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
}, {
    timestamps: true
})
const cart = mongoose.model("Cart", cartSchema);
module.exports = cart;