
const axios = require("axios");

// Replace with your Khalti secret key
const KHALTI_SECRET_KEY = "test_public_key_dafa9deec1da4f28aa6bbf1ce8380543";

const processPayment = async (req, res) => {
    const { pidx } = req.body;

    if (!pidx) {
        return res.status(400).json({ success: false, message: "Payment ID (pidx) is required." });
    }

    try {
        // Verify the payment with Khalti Lookup API
        const response = await axios.post(
            "https://khalti.com/api/v2/epayment/lookup/",
            { pidx },
            {
                headers: {
                    Authorization: `Key ${KHALTI_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const { status, total_amount, transaction_id } = response.data;

        if (status === "Completed") {
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully.",
                data: { transaction_id, total_amount },
            });
        } else {
            // Handle other statuses
            return res.status(400).json({
                success: false,
                message: `Payment verification failed. Status: ${status}`,
                data: response.data,
            });
        }
    } catch (error) {
        console.error("Error verifying payment:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.response?.data || error.message,
        });
    }
};

module.exports = processPayment;

