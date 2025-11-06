const Order = require("../../models/orderModel"); // Corrected model import

const ConfirmOrderController = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the order by ID
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                success: false,
                error: true,
            });
        }

        // Update order status to "confirmed"
        order.status = "confirmed";
        order.statusHistory.push({ status: "confirmed", updatedAt: new Date() });

        // Save the order
        await order.save();

        res.status(200).json({
            message: "Order confirmed successfully",
            success: true,
            error: false,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to confirm order",
            success: false,
            error: true,
        });
    }
};

module.exports = ConfirmOrderController;
