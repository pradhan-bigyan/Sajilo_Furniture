const { google } = require("googleapis");
const Order = require("../../models/orderModel");
const SoldItem = require("../../models/soldItemmodel");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"];
const auth = new google.auth.GoogleAuth({
  keyFile: "/etc/secrets/sajilofurniture-4f3afc44831d.json", 
  scopes: SCOPES,
});
const sheets = google.sheets({ version: "v4", auth });
const drive = google.drive({ version: "v3", auth });

const completeOrderController = async (req, res) => {
  const { orderId } = req.params;
  const { email } = req.body;
  const additionalemail = "io38041721@student.ku.edu.np";

  try {
    // Fetch the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
        error: true,
      });
    }

    // Create a SoldItem entry
    const soldItem = new SoldItem({
      orderId: order._id,
      userId: order.userId,
      products: order.products,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus,
      deliveryAddress: order.deliveryAddress,
      status: "delivered",
      completedAt: new Date(),
    });

    // Save the sold item to the database
    await soldItem.save();

    // Delete the order from the Order model
    await Order.findByIdAndDelete(orderId);

    // Check if the spreadsheet already exists for the seller
    const sellerName = order.products[0]?.seller || "Unknown_Seller";
    const sellerEmail = email; // Include seller's email in the order data
    const sheetTitle = `${sellerName}_Sold_Items`;

    let spreadsheet = await findSpreadsheet(sheetTitle);

    if (!spreadsheet) {
      // Create a new spreadsheet if none exists for this seller
      spreadsheet = await createOrFetchSpreadsheet(sheetTitle);
      // Set headers in bold
      await setHeadings(spreadsheet.spreadsheetId);
    }

    const dataToAppend = order.products.map(product => [
      new Date().toISOString(),
      order.userId,
      product.productId,
      product.productName,
      product.quantity,
      product.price,
      order.totalAmount,
      order.paymentStatus,
      JSON.stringify(order.deliveryAddress),
    ]);

    // Append data to the existing spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheet.spreadsheetId,
      range: "Sheet1!A2", // Start appending from row 2 (to leave space for headings)
      valueInputOption: "USER_ENTERED",
      resource: { values: dataToAppend },
    });

    // Share the sheet with the seller and an additional email
    if (sellerEmail) {
      await drive.permissions.create({
        fileId: spreadsheet.spreadsheetId,
        requestBody: {
          role: "writer", // "writer" allows the seller to edit
          type: "user",
          emailAddress: sellerEmail,
        },
      });
    }

    if (additionalemail) {
      await drive.permissions.create({
        fileId: spreadsheet.spreadsheetId,
        requestBody: {
          role: "writer", // "writer" allows the additional email to edit
          type: "user",
          emailAddress: additionalemail,
        },
      });
    }

    res.status(200).json({
      message: "Order completed successfully and logged in Google Sheets, shared with both emails!",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in completeOrderController:", error);
    res.status(500).json({
      message: error.message || "Failed to complete the order.",
      success: false,
      error: true,
    });
  }
};

// Helper: Find an existing spreadsheet by title (Google Drive search)
async function findSpreadsheet(title) {
  try {
    const response = await drive.files.list({
      q: `name = '${title}' and mimeType = 'application/vnd.google-apps.spreadsheet'`,
      fields: "files(id, name)",
    });
    const file = response.data.files.find(file => file.name === title);
    return file ? { spreadsheetId: file.id } : null;
  } catch (error) {
    console.error("Error finding spreadsheet:", error);
    return null;
  }
}

// Helper: Create a new spreadsheet for the seller
async function createOrFetchSpreadsheet(title) {
  try {
    const sheetsResponse = await sheets.spreadsheets.create({
      resource: {
        properties: { title },
      },
      fields: "spreadsheetId",
    });
    return sheetsResponse.data;
  } catch (error) {
    console.error("Error creating spreadsheet:", error);
    throw new Error("Failed to create or fetch Google Sheets.");
  }
}

// Helper: Set headings in bold in the first row
async function setHeadings(spreadsheetId) {
  const requests = [
    {
      updateCells: {
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: "Date" } },
              { userEnteredValue: { stringValue: "User ID" } },
              { userEnteredValue: { stringValue: "Product ID" } },
              { userEnteredValue: { stringValue: "Product Name" } },
              { userEnteredValue: { stringValue: "Quantity" } },
              { userEnteredValue: { stringValue: "Price" } },
              { userEnteredValue: { stringValue: "Total Amount" } },
              { userEnteredValue: { stringValue: "Payment Status" } },
              { userEnteredValue: { stringValue: "Delivery Address" } },
            ],
          },
        ],
        fields: "userEnteredValue",
        start: { sheetId: 0, rowIndex: 0, columnIndex: 0 },
      },
    },
    {
      updateCells: {
        rows: [
          {
            values: [
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
              { userEnteredFormat: { textFormat: { bold: true } } },
            ],
          },
        ],
        fields: "userEnteredFormat.textFormat.bold",
        start: { sheetId: 0, rowIndex: 0, columnIndex: 0 },
      },
    },
  ];

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: { requests },
  });
}

module.exports = completeOrderController;
