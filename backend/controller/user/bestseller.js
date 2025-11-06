const Order = require("../../models/orderModel");

async function bestSellers(req, res) {
    try {
        console.log("Fetching best sellers...");

        // Aggregate best-selling products
        const bestSellers = await Order.aggregate([
            { $unwind: "$products" }, // Decompose the products array
            {
                $group: {
                    _id: "$products.productId", // Group by productId
                    productName: { $first: "$products.productName" }, // Product name
                    totalQuantitySold: { $sum: "$products.quantity" }, // Total quantity sold
                    imageUrl: { $first: "$products.imageUrl" }, // Product image URL
                    seller: { $first: "$products.seller" } // Seller's name
                }
            },
            { $sort: { totalQuantitySold: -1 } }, // Sort by totalQuantitySold in descending order
            { $limit: 10 } // Limit to top 10 sellers
        ]);

        res.json({
            success: true,
            message: "Best sellers retrieved successfully.",
            data: bestSellers,
        });
    } catch (err) {
        console.error("Error fetching best sellers:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
}

module.exports = bestSellers;
