const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let discounts = [];
let loyaltyPrograms = [];
let emailMarketingList = [];

app.post("/payment", (req, res) => {
  const paymentDetails = req.body;

  if (paymentDetails.cardType === "MasterCard") {
    if (isValidMasterCard(paymentDetails.cardNumber)) {
      // Simulated payment success
      res.json({
        message: `Payment processed successfully with ${paymentDetails.cardType} ${paymentDetails.cardNumber}`,
        receipt: `REC${paymentDetails.cardNumber}${paymentDetails.cardType}`,
      });
    } else {
      res.status(400).json({ error: "Invalid MasterCard number" });
    }
  } else {
    res.status(400).json({ error: "Unsupported card type" });
  }
});

function isValidMasterCard(cardNumber) {
  // Simplified card number validation (not for production)
  return cardNumber.length === 16;
}

app.post("/shipping", (req, res) => {
  const shippingDetails = req.body;

  if (shippingDetails.destination && shippingDetails.weight) {
    res.json({
      message: "Shipping information sent successfully",
      trackingNumber: `${shippingDetails.destination}SHIPPING${shippingDetails.weight}`,
    });
  } else {
    res.status(400).json({ error: "Invalid shipping information" });
  }
});

app.post("/discounts", (req, res) => {
  const newDiscount = req.body;
  discounts.push(newDiscount);
  res.json({ message: "Discount added successfully", discount: newDiscount });
});

app.get("/discounts", (req, res) => {
  res.json(discounts);
});

app.post("/loyalty", (req, res) => {
  const newProgram = req.body;
  loyaltyPrograms.push(newProgram);
  res.json({
    message: "Loyalty program added successfully",
    program: newProgram,
  });
});

app.get("/loyalty", (req, res) => {
  res.json(loyaltyPrograms);
});

app.post("/emailMarketing", (req, res) => {
  const newUser = req.body;
  emailMarketingList.push(newUser);
  res.json({
    message: "User added to the email marketing list",
    user: newUser,
  });
});

app.get("/emailMarketing", (req, res) => {
  res.json(emailMarketingList);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
