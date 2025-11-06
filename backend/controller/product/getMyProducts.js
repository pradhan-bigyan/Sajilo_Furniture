const productModel = require("../../models/productModel");

const getmyProductsController = async (req, res) => {
    try {
        const { shopName, shopLocation } = req.query; // Extract query parameters

        // Validate that both parameters are provided
        if (!shopName || !shopLocation) {
            return res.status(400).json({
                message: "Shop name and shop location are required.",
                success: false,
                error: true,
            });
        }

        // Filter products by shop name and shop location
        const filteredProducts = await productModel.find({
            sellerName: shopName,
            sellerLocation: shopLocation,
        }).sort({ createdAt: -1 });

        res.json({
            message: "Filtered Products",
            success: true,
            error: false,
            data: filteredProducts,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getmyProductsController;
