let cart = [];
let grandTotal = 0;

while (true) {
    let itemCode = prompt("Enter Item Code:");
    let description = prompt("Enter Item Description:");
    let quantity = Number(prompt("Enter Quantity:"));
    let pricePerUnit = Number(prompt("Enter Price Per Unit:"));

    let totalPrice = quantity * pricePerUnit;

    let item = {
        itemCode,
        description,
        quantity,
        pricePerUnit,
        totalPrice
    };

    cart.push(item);

    let choice = prompt("Add another item? (yes/no)").toLowerCase();
    if (choice !== "yes") break;
}

// Calculate grand total
cart.forEach(item => {
    grandTotal += item.totalPrice;
});

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


let invoiceNumber = "INV-" + Math.floor(Math.random() * 1000000);
let invoiceDate = new Date();
let finalAmount = finalTotalBeforeInvoice;

console.log("\n===========INVOICE ===========");
console.log("Invoice No   :", invoiceNumber);
console.log("Invoice Date :", invoiceDate.toLocaleString());
console.log("------------------------------------------");

console.log("Item Details:");
cart.forEach((item, index) => {
    console.log(`${index + 1}. ${item.itemCode} | ${item.description} | Qty: ${item.quantity} | ` + `₹${item.pricePerUnit} | Total: ₹${item.totalPrice}`);
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
console.log("==========================================\n");
