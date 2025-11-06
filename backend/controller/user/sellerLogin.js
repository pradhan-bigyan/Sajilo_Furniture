const bcrypt = require('bcryptjs');
const sellerModel = require('../../models/sellerModel');
const jwt = require('jsonwebtoken');

async function sellerLoginController(req, res) {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    // Find the seller by email
    const seller = await sellerModel.findOne({ email });

    // If seller is not found, return an error
    if (!seller) {
      throw new Error("Seller not found");
    }

    // Check if the password matches the stored hash
    const checkPassword = await bcrypt.compare(password, seller.password);

    if (checkPassword) {
      // Create payload for JWT token
      const tokenData = {
        _id: seller._id,
        email: seller.email,
        role: seller.role,
        name: seller.name,
        adress: seller.address,
        district: seller.district,
        phonenumber: seller.phoneNumber
      };

      // Sign the JWT token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '8h', // Token expiration time
      });

      // Set token as an HTTP-only cookie
      const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure flag only for production
      };

      // Send the success response with the token in a cookie and role in the body
      res
        .cookie('token', token, tokenOption)
        .status(200)
        .json({
          message: "Login successfully",
          token, // Include the token in the response
          seller: {
            _id: seller._id,
            email: seller.email,
            role: seller.role,
            name: seller.name,
            address: seller.address,
            phonenumber: seller.phoneNumber,
            district: seller.district
          },
          success: true,
          error: false,
        });
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    // Handle errors
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = sellerLoginController;