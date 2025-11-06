/*
const Order = require('../../models/orderModel'); 

const saveOrder = async (req, res) => {
    try {
        const { products, totalAmount, paymentStatus, paymentToken, paymentPidx, deliveryAddress } = req.body;

        // Validate required fields
        if (!deliveryAddress || !deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
            return res.status(400).json({
                success: false,
                message: 'Complete delivery address is required.'
            });
        }

        // Create a new order instance
        const order = new Order({
            products,
            totalAmount,
            paymentStatus,
            paymentToken,
            paymentPidx,
            deliveryAddress,
            createdAt: new Date()
        });

        // Save the order in the database
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order saved successfully!',
            data: order
        });
    } catch (error) {
        console.error("Error saving the order:", error);

        res.status(500).json({
            success: false,
            message: 'Failed to save the order. Please try again later.',
            error: error.message
        });
    }
};

module.exports = saveOrder;
*/

const Order = require('../../models/orderModel'); 

const saveOrder = async (req, res) => {
    try {
        
        const { userId, products, totalAmount, paymentStatus, paymentToken, paymentPidx, deliveryAddress } = req.body;

        // Validate required fields
        if (!deliveryAddress || !deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
            return res.status(400).json({
                success: false,
                message: 'Complete delivery address is required.'
            });
        }

        // Create a new order instance
        const order = new Order({
            userId,
            products,
            totalAmount,
            paymentStatus,
            paymentToken,
            paymentPidx,
            deliveryAddress,
            createdAt: new Date()
        });

        // Save the order in the database
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order saved successfully!',
            data: order
        });
    } catch (error) {
        console.error("Error saving the order:", error);

        res.status(500).json({
            success: false,
            message: 'Failed to save the order. Please try again later.',
            error: error.message
        });
    }
};

module.exports = saveOrder;
