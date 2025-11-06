const Order = require("../../models/orderModel"); // Corrected model import

const getUserOrderController = async (req, res) => {
  try {
    
    const { userId } = req.body;

   

    // Fetch all orders for the given user and sort them by createdAt in descending order
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({
      message: "All Orders",
      success: true,
      error: false,
      data: orders, 
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Failed to fetch orders.",
      success: false,
      error: true,
    });
  }
};

module.exports = getUserOrderController;
