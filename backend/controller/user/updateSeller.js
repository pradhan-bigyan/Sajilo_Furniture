require('dotenv').config();
const nodemailer = require("nodemailer");
const Seller = require("../../models/sellerModel");

async function updateSeller(req, res) {
    try {
        const { email, role } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                error: true,
                success: false
            });
        }

        // Prepare payload
        const payload = {
            ...(role && { role }),
            ...(role === "VERIFIED" && { verified: true })
        };

        // Update seller in the database
        const updatedSeller = await Seller.findOneAndUpdate(
            { email },
            payload,
            { new: true } // Return updated document
        );

        if (!updatedSeller) {
            return res.status(404).json({
                message: "Seller not found",
                error: true,
                success: false
            });
        }

        // Send email if role is 'VERIFIED'
        if (role === "VERIFIED") {
            try {
                await sendVerificationEmail(updatedSeller);
            } catch (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({
                    message: "Role updated but email sending failed.",
                    error: true,
                    success: true
                });
            }
        }

        // Success response
        res.json({
            data: updatedSeller,
            message: "Seller Role Updated",
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error updating seller:", err);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        });
    }
}

// Helper function to send email using Ethereal's SMTP service
async function sendVerificationEmail(seller) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,   
                   pass: process.env.EMAIL_PW, 
        }
    });

    const mailOptions = {
        from: '"Sajilo Furniture" <evotingproject2080@gmail.com>', // sender address
        to: seller.email, // recipient email
        subject: 'Your Account is Verified', // subject line
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h1>Welcome to Sajilo Furniture!</h1>
                <p>Hello ${seller.name},</p>
                <p>We're excited to let you know that your account has been successfully verified. You now have access to all features available to verified sellers.</p>
                <p>Best regards,<br><strong>Sajilo Furniture</strong></p>
            </div>
        `, // HTML content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);  // Log the message ID
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send verification email. Details: " + error.message);
    }
}

module.exports = updateSeller;
