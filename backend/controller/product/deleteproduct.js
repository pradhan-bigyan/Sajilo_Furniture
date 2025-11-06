const productModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        const { _id } = req.body;

        // Validate that the _id is provided in the request body
        if (!_id) {
            return res.status(400).json({
                message: "Product ID (_id) is required for deletion.",
                error: true,
                success: false,
            });
        }

        // Try to find and delete the product
        const deletedProduct = await productModel.findByIdAndDelete(_id);

        // If the product doesn't exist, return a 404 error
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found or already deleted.",
                error: true,
                success: false,
            });
        }

        // Respond with success if product deletion is successful
        res.json({
            message: "Product deleted successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        // Catch any other errors and respond with a 500 internal server error
        res.status(500).json({
            message: err.message || "Something went wrong. Please try again later.",
            error: true,
            success: false,
        });
    }
}

module.exports = deleteProductController;
