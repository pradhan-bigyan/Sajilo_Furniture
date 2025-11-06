const Order = require("../../models/orderModel"); // Corrected model import

const sellerupdateOrderStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatuses = ["shipped", "out for delivery", "delivered", "cancelled"];

        // Check if the provided status is valid
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status update",
                success: false,
                error: true,
            });
        }

        // Find the order by ID
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                success: false,
                error: true,
            });
        }

        // Update the order status
        order.status = status;
        order.statusHistory.push({ status, updatedAt: new Date() });

        // Save the order
        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            success: true,
            error: false,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update order status",
            success: false,
            error: true,
        });
    }
};

module.exports = sellerupdateOrderStatusController;
