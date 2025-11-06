// productController.js
const Product = require("../../models/productModel"); 

// Get products by district
const getproductbydistrict = async (req, res) => {
  const { district } = req.query;  // Now district is in the request body

  try {
    if (!district) {
      return res.status(400).json({ message: "District is required" });
    }

    const products = await Product.find({ district: district });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this district" });
    }

    res.json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getproductbydistrict;
