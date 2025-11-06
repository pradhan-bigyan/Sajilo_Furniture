const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    sellerName: String,
    sellerLocation: String,
    district: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
  }, {
    timestamps: true
  });
const productModel = mongoose.model("product",productSchema)

module.exports = productModel