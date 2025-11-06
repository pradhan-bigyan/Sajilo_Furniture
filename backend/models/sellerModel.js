

// module.exports = Seller;
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "PENDING" },  // Initially set as 'PENDING'
    verified: { type: Boolean, default: false },  // Flag to track if admin has verified the seller
    citizenshipCertificate: { type: String },  // Store the URL for citizenship certificate
    panPhoto: { type: String },  // Store the URL for PAN card photo
}, {
    timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
