const mongoose = require('mongoose');

const soldItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productName: String,
      quantity: Number,
      price: Number,
      imageUrl: String,
      seller: String,
      sellerLocation: String,
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["successful", "failed", "pending"], required: true },
  deliveryAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["delivered"], // Update this to include `delivered`
    required: true,
  },
  completedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const SoldItem = mongoose.model('SoldItem', soldItemSchema);

module.exports = SoldItem;
