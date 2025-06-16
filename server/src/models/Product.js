const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    platform: { type: String },
    brand: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    releaseDate: { type: Date },
    genre: [{ type: String }],
    ageRating: { type: String },
    warranty: { type: String },
    shippingInfo: { type: String },
    description: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
