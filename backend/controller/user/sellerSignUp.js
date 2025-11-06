
// const sellerModel = require("../../models/sellerModel");
// const bcrypt = require('bcryptjs');

// async function sellerSignUpController(req, res) {
//     try {
//         const { name, email, phoneNumber, address,district, password } = req.body;

//         // Check if the seller already exists
//         const seller = await sellerModel.findOne({ email });

//         if (seller) {
//             throw new Error("A seller with this email already exists.");
//         }

//         // Validate inputs
//         if (!email || !password || !name || !phoneNumber || !address) {
//             throw new Error("Please provide all required fields");
//         }

//         // Hash the password
//         const salt = bcrypt.genSaltSync(10);
//         const hashPassword = await bcrypt.hashSync(password, salt);

//         // Create the seller object with 'PENDING' role
//         const payload = {
//             name,
//             email,
//             phoneNumber,
//             address,
//             district,
//             password: hashPassword,
//             role: "PENDING",  // Set role to PENDING
//             verified: false,  // Initially set to false
//         };

//         // Save the seller to the database
//         const sellerData = new sellerModel(payload);
//         const savedSeller = await sellerData.save();

//         // Send success response
//         res.status(201).json({
//             data: savedSeller,
//             success: true,
//             message: "Seller account created successfully! Awaiting admin verification.",
//         });

//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             success: false,
//         });
//     }
// }

// module.exports = sellerSignUpController;
const sellerModel = require("../../models/sellerModel");
const bcrypt = require('bcryptjs');

async function sellerSignUpController(req, res) {
    try {
        const { name, email, phoneNumber, address, district, password, citizenshipCertificate, panPhoto } = req.body;

        // Check if the seller already exists
        const seller = await sellerModel.findOne({ email });

        if (seller) {
            throw new Error("A seller with this email already exists.");
        }

        // Validate inputs
        if (!email || !password || !name || !phoneNumber || !address) {
            throw new Error("Please provide all required fields");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        // Create the seller object with 'PENDING' role
        const payload = {
            name,
            email,
            phoneNumber,
            address,
            district,
            password: hashPassword,
            role: "PENDING",  // Set role to PENDING
            verified: false,  // Initially set to false
            citizenshipCertificate,  // Store the Cloudinary URL for citizenship certificate
            panPhoto,  // Store the Cloudinary URL for PAN card photo
        };

        // Save the seller to the database
        const sellerData = new sellerModel(payload);
        const savedSeller = await sellerData.save();

        // Send success response
        res.status(201).json({
            data: savedSeller,
            success: true,
            message: "Seller account created successfully! Awaiting admin verification.",
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
        });
    }
}

module.exports = sellerSignUpController;
