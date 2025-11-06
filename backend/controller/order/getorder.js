const orderModel = require("../../models/orderModel");

const getORderController = async (req, res) => {
    try {
        // Fetch all orders and sort them by createdAt in descending order
        const allOrders = await orderModel.find().sort({ createdAt: -1 });

        res.json({
            message: "All Orders",
            success: true,
            error: false,
            data: allOrders,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "Failed to fetch orders.",
            error: true,
            success: false,
        });
    }
};

module.exports = getORderController;
