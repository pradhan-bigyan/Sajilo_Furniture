const productModel = require('../../models/productModel');

async function updateMyProductController(req, res) {
    try {
        const { _id, ...resBody } = req.body;

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}


module.exports = updateMyProductController;
