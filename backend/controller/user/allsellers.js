const Seller = require("../../models/sellerModel");

async function allSellers(req, res) {
    try {
        console.log("Fetching all sellers");

        // Fetching all sellers from the database
        const allsellers = await Seller.find();

        res.json({
            message: "All Sellers fetched successfully",
            data: allsellers,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred while fetching all sellers",
            error: true,
            success: false
        });
    }
}

module.exports = allSellers
