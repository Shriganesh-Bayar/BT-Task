let cart = [];
let grandTotal = 0;

while (true) {
    let itemCode = prompt("Enter Item Code:");
    let description = prompt("Enter Item Description:");
    let quantity = Number(prompt("Enter Quantity:"));
    let pricePerUnit = Number(prompt("Enter Price Per Unit:"));

    let totalPrice = quantity * pricePerUnit;

    cart.push({
        itemCode,
        description,
        quantity,
        pricePerUnit,
        totalPrice
    });

    let more = prompt("Add another item? (yes/no)").toLowerCase();
    if (more !== "yes") break;
}

cart.forEach(item => grandTotal += item.totalPrice);

let membershipType = "None";
let discountRate = 0;
let discountAmount = 0;
let discountedTotal = grandTotal;

let isMember = prompt("Are you a member? (yes/no)").toLowerCase();

if (isMember === "yes") {
    membershipType = prompt("Enter membership (Silver / Gold / Platinum):").toLowerCase();

    if (membershipType === "silver") discountRate = 0.05;
    else if (membershipType === "gold") discountRate = 0.10;
    else if (membershipType === "platinum") discountRate = 0.15;
    else {
        membershipType = "None";
        discountRate = 0;
    }
}

discountAmount = grandTotal * discountRate;
discountedTotal = grandTotal - discountAmount;

let gstRate = 0.18;
let platformFeeRate = 0.002;

let gstAmount = discountedTotal * gstRate;
let platformFee = discountedTotal * platformFeeRate;

let totalWithTax = discountedTotal + gstAmount + platformFee;

let paymentMode = prompt("Enter payment mode (Card / UPI / Cash):").toLowerCase();
let surcharge = 0;
let convenienceFee = 0;

if (paymentMode === "card" && totalWithTax < 1000) {
    surcharge = totalWithTax * 0.025;
} else {
    convenienceFee = totalWithTax * 0.01;
}

let finalTotalBeforeInvoice = totalWithTax + surcharge + convenienceFee;

let invoiceNumber = "INV" + Math.floor(Math.random() * 1000000);
let invoiceDate = new Date();
let finalAmount = finalTotalBeforeInvoice;

console.log("\n===========INVOICE ===========");
console.log("Invoice No   :", invoiceNumber);
console.log("Invoice Date :", invoiceDate.toLocaleString());
console.log("------------------------------------------");

cart.forEach((item, index) => {
    console.log(
        `${index + 1}. ${item.itemCode} | ${item.description} | Qty: ${item.quantity} | ` +
        `₹${item.pricePerUnit} | Total: ₹${item.totalPrice}`
    );
});

console.log("------------------------------------------");
console.log("Subtotal           : ₹" + grandTotal.toFixed(2));
console.log("Discount           : -₹" + discountAmount.toFixed(2));
console.log("GST (18%)          : ₹" + gstAmount.toFixed(2));
console.log("Platform Fee       : ₹" + platformFee.toFixed(2));
console.log("Surcharge          : ₹" + surcharge.toFixed(2));
console.log("Convenience Fee    : ₹" + convenienceFee.toFixed(2));
console.log("------------------------------------------");
console.log("FINAL AMOUNT PAYABLE: ₹" + finalAmount.toFixed(2));
console.log("------------------------------------------");
console.log("Payment Successful");
console.log("Invoice Generated");

let emailAddress = prompt("Enter your email address (@karunya.edu):");

// size of @karunya.edu = 12 => more than 12 is needed
let validEmail = emailAddress && (emailAddress.length > 12) && emailAddress.endsWith("@karunya.edu"); 

if (validEmail) {
    console.log("Invoice sent to:", emailAddress);
} else {
    console.log("Invalid email. Invoice email not sent.");
}

let invoiceData = {
    invoiceNumber,
    invoiceDate: invoiceDate.toISOString(),
    items: cart,
    subtotal: grandTotal,
    discount: discountAmount,
    gst: gstAmount,
    platformFee,
    surcharge,
    convenienceFee,
    finalAmount,
    paymentMode,
    email: emailAddress
};

let invoiceJSON = JSON.stringify(invoiceData, null, 4);
console.log("----- INVOICE JSON -----");
console.log(invoiceJSON);

if (typeof localStorage !== "undefined") {
    localStorage.setItem(invoiceNumber, invoiceJSON);
    console.log("Invoice saved to localStorage");
}

console.log("Thank you for shopping ");
console.log("==========================================\n");
