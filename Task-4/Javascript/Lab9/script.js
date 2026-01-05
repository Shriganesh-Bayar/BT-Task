class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function getPaymentMode() {
    while (true) {
        try {
            let mode = prompt("Enter payment mode (Card / UPI / Cash):").toLowerCase();

            if (mode === null || mode.trim() === "")
                throw new ValidationError("Payment mode cannot be empty");

            if (mode !== "card" && mode !== "upi" && mode !== "cash")
                throw new ValidationError("Payment mode must be Card, UPI or Cash");

            return mode;
        } catch (e) {
            alert(e.message);
        } finally {
            console.log("Please try again");
        }
    }
}

function getEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@karunya\.edu$/;

    while (true) {
        try {
            let email = prompt("Enter your email (@karunya.edu):");

            if (email === null || email.trim() === "")
                throw new ValidationError("Email cannot be empty");

            if (!emailRegex.test(email))
                throw new ValidationError("Invalid email format. Must end with @karunya.edu");

            return email;

        } catch (e) {
            alert(e.message);
        } finally {
            console.log("Please try again");
        }
    }
}

function yesOrno(message) {
    while(true) {
        try {
            answer = prompt(message).toLowerCase();
            if (answer === null || answer.trim() === "")
                throw new ValidationError("Input cannot be empty");

            if(answer !== "yes" && answer !== "no")
                throw new ValidationError("Only yes or no is allowed");

            return answer;
        } catch (e) {
            alert(e.message);
        } finally {
            console.log("Please try again");
        }
    }
}

function membership(message) {
    while(true) {
        try {
            answer = prompt("Enter membership (Silver / Gold / Platinum):").toLowerCase();
            if (answer === null || answer.trim() === "")
                throw new ValidationError("Input cannot be empty");

            if(answer !== "gold" && answer !== "silver" && answer !== "platinum")
                throw new ValidationError("Only gold, silver or platinum");

            return answer;
        } catch (e) {
            alert(e.message);
        } finally {
            console.log("Please try again");
        }
    }
}

function getNumber(message, integer) {
    while(true) {
        try {
            let answer = prompt(message);
            if (answer === null || answer.trim() === "")
                throw new ValidationError("Input cannot be empty");

            if(isNaN(Number(answer)))
                throw new ValidationError("Only numbers are allowed");

            answer = Number(answer);
            if(integer && !Number.isInteger(answer))
                throw new ValidationError("Only integer is allowed");

            if(answer <= 0)
                throw new ValidationError("Value should be postive number");

            return answer;
        } catch (e) {
            alert(e.message);
        } finally {
            console.log("Please try again\n");
        }
    }
}

const CART_KEY = "cart";
const INVOICE_KEY = "invoice";

let cart = [];
let invoiceData = null;

let storedCart = localStorage.getItem(CART_KEY);
let storedInvoice = localStorage.getItem(INVOICE_KEY);

if (storedCart && storedInvoice) {
    let resume = yesOrno("Previous cart found.\nDo you want to resume it? (yes/no)");

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
    proceed = yesOrno("Add another item? (yes/no)");

console.log(proceed)
if ((cart.length > 0 && proceed === "yes") || cart.length === 0) {
    while (true) {
        let itemCode = prompt("Enter Item Code:");
        let description = prompt("Enter Item Description:");
        let quantity = getNumber("Enter the quantity", true);
        let pricePerUnit = getNumber("Enter Price Per Unit:", false);

        let totalPrice = quantity * pricePerUnit;

        cart.push({
            itemCode,
            description,
            quantity,
            pricePerUnit,
            totalPrice
        });

        let more = yesOrno("Add another item? (yes/no)");
        if (more !== "yes") break;
    }
}

let grandTotal = 0;
cart.forEach(item => grandTotal += item.totalPrice);

let membershipType = "None";
let discountRate = 0;

let isMember = yesOrno("Are you a member? (yes/no)");

if (isMember === "yes") {
    membershipType = membership();

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

let paymentMode = getPaymentMode();
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

let email = getEmail();
let message = `Thank you for shopping, A confirmation has been sent to ${email}.`;

console.log("Email Verified Successfully");
console.log("Sending confirmation message...");
console.log(message);

console.log("Thank you for shopping ");
console.log("==========================================\n");