
const productModel = require("../../models/productModel");  // Product model

async function UploadMyProductController(req, res) {
  const { productName, sellerName, sellerLocation,district, category, productImage, description, price, sellingPrice } = req.body;

  console.log("Product name:", productName);
  console.log("Seller name:", sellerName);
  console.log("Seller location:", sellerLocation);

  try {
  

    // Create a new product document using the request body
    const uploadProduct = new productModel({
      productName,
      sellerName,
      sellerLocation,
      district,
      category,
      productImage,
      description,
      price,
      sellingPrice,
      
    });

    // Save the new product document to the database
    const saveProduct = await uploadProduct.save();

    // Send response on successful product upload
    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadMyProductController;
