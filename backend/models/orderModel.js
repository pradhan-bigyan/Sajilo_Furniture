// module.exports = Order;
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            productName: String,
            quantity: Number,
            price: Number,
            imageUrl: String,
            seller: String,
            sellerLocation: String,
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["successful", "failed", "pending"], required: true },
    paymentToken: String,
    paymentPidx: String,
    deliveryAddress: { 
        name: { type: String, required: true },
        phone: { type: String, required: true },
        district: { type: String, required: true },
        address: { type: String, required: true },
        area: { type: String, required: true },
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "out for delivery", "delivered", "cancelled"],
        default: "pending",
    },
    statusHistory: [
        {
            status: { type: String, required: true },
            updatedAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
