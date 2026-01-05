const CART_KEY = "cart";
const INVOICE_KEY = "invoice";

let cart = [];
let invoiceData = null;

let storedCart = localStorage.getItem(CART_KEY);
let storedInvoice = localStorage.getItem(INVOICE_KEY);

if (storedCart && storedInvoice) {
    let resume = prompt("Previous cart found.\nDo you want to resume it? (yes/no)").toLowerCase();

    if (resume === "yes") {
        cart = JSON.parse(storedCart);
        invoiceData = JSON.parse(storedInvoice);
        console.log("Previous cart resumed");
    } else {
        localStorage.removeItem(CART_KEY);
        localStorage.removeItem(INVOICE_KEY);
        console.log("Starting fresh cart");
    }
}

let proceed = "no";
if(cart.length > 0) 
    proceed = prompt("Add another item? (yes/no)").toLowerCase();

console.log(proceed)
if ((cart.length > 0 && proceed === "yes") || cart.length === 0) {
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
}

let grandTotal = 0;
cart.forEach(item => grandTotal += item.totalPrice);

let membershipType = "None";
let discountRate = 0;

let isMember = prompt("Are you a member? (yes/no)").toLowerCase();

if (isMember === "yes") {
    membershipType = prompt(
        "Enter membership (Silver / Gold / Platinum):"
    ).toLowerCase();

    if (membershipType === "silver") discountRate = 0.05;
    else if (membershipType === "gold") discountRate = 0.10;
    else if (membershipType === "platinum") discountRate = 0.15;
    else {
        membershipType = "None";
        discountRate = 0;
    }
}

let discountAmount = grandTotal * discountRate;
let discountedTotal = grandTotal - discountAmount;


let gstRate = 0.18;
let platformFeeRate = 0.002;

let gstAmount = discountedTotal * gstRate;
let platformFee = discountedTotal * platformFeeRate;

let totalWithTax = discountedTotal + gstAmount + platformFee;

let paymentMode = prompt(
    "Enter payment mode (Card / UPI / Cash):"
).toLowerCase();

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

invoiceData = {
    invoiceNumber,
    invoiceDate: invoiceDate.toISOString(),
    cartItems: cart,
    subtotal: grandTotal,
    discount: discountAmount,
    gst: gstAmount,
    platformFee,
    surcharge,
    convenienceFee,
    finalAmount,
    paymentMode,
    email,
    timestamp: new Date().toISOString()
};

localStorage.setItem(CART_KEY, JSON.stringify(cart));
localStorage.setItem(INVOICE_KEY, JSON.stringify(invoiceData));
console.log("Cart & Invoice saved to localStorage");

let email = prompt("Enter your email (@karunya.edu):");
const emailRegex = /^[a-zA-Z0-9._%+-]+@karunya\.edu$/;
while (!emailRegex.test(email)) {
    console.error("Invalid email format. Must end with @karunya.edu");
    email = prompt("Enter a valid email (@karunya.edu):");
}

let message = `Thank you for shopping, A confirmation has been sent to ${email}.`;

console.log("Email Verified Successfully");
console.log("Sending confirmation message...");
console.log(message);

console.log("Thank you for shopping ");
console.log("==========================================\n");