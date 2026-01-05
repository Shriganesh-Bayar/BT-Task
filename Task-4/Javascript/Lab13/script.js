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
        }
    }
}

function yesOrno(message) {
    while (true) {
        try {
            let answer = prompt(message).toLowerCase();
            if (answer === null || answer.trim() === "")
                throw new ValidationError("Input cannot be empty");
            if (answer !== "yes" && answer !== "no")
                throw new ValidationError("Only yes or no is allowed");
            return answer;
        } catch (e) {
            alert(e.message);
        }
    }
}

function membership() {
    while (true) {
        try {
            let answer = prompt("Enter membership (Silver / Gold / Platinum):").toLowerCase();
            if (answer === null || answer.trim() === "")
                throw new ValidationError("Input cannot be empty");
            if (answer !== "gold" && answer !== "silver" && answer !== "platinum")
                throw new ValidationError("Only gold, silver or platinum");
            return answer;
        } catch (e) {
            alert(e.message);
        }
    }
}

function getNumber(message, integer) {
    while (true) {
        try {
            let answer = prompt(message);
            if (answer === null || answer.trim() === "")
                throw new ValidationError("Input cannot be empty");
            if (isNaN(Number(answer)))
                throw new ValidationError("Only numbers are allowed");
            answer = Number(answer);
            if (integer && !Number.isInteger(answer))
                throw new ValidationError("Only integer is allowed");
            if (answer <= 0)
                throw new ValidationError("Value should be positive number");
            return answer;
        } catch (e) {
            alert(e.message);
        }
    }
}

function getDiscountFunction(type) {
    let rate = 0;
    switch (type) {
        case "silver": rate = 0.05; break;
        case "gold": rate = 0.10; break;
        case "platinum": rate = 0.15; break;
    }
    return function (amount) {
        return amount * rate;
    };
}

function checkInventory(itemCode, requestedQty) {
    const inventory = {
        A101: 10,
        B202: 5,
        C303: 20,
        D404: 8
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let stockQuantity = inventory[itemCode];
            if (stockQuantity === undefined)
                reject(`Item ${itemCode} not found in inventory`);
            else if (requestedQty <= stockQuantity)
                resolve({ itemCode, stockQuantity });
            else
                reject(`Insufficient stock for ${itemCode}. Available: ${stockQuantity}`);
        }, 1000);
    });
}

async function simulatePayment(paymentMode) {
    console.log("Processing payment...");
    console.log("Please wait...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Payment confirmed via", paymentMode);
    return {
        paymentMode,
        paymentStatus: "SUCCESS",
        time: new Date().toISOString()
    };
}

function completeBilling(callbackFn) {
    callbackFn(invoiceData);
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
    } else {
        localStorage.removeItem(CART_KEY);
        localStorage.removeItem(INVOICE_KEY);
    }
}

let proceed = "no";
if (cart.length > 0)
    proceed = yesOrno("Add another item? (yes/no)");

async function addItems() {
    if ((cart.length > 0 && proceed === "yes") || cart.length === 0) {
        while (true) {
            let itemCode = prompt("Enter Item Code:");
            let description = prompt("Enter Item Description:");
            let quantity = getNumber("Enter the quantity", true);
            let pricePerUnit = getNumber("Enter Price Per Unit:", false);
            let totalPrice = quantity * pricePerUnit;

            await checkInventory(itemCode, quantity)
                .then(() => {
                    cart.push({
                        itemCode,
                        description,
                        quantity,
                        pricePerUnit,
                        totalPrice
                    });
                })
                .catch(err => {
                    alert(err);
                });

            let more = yesOrno("Add another item? (yes/no)");
            if (more !== "yes") break;
        }
    }
}

async function processOrder() {
    await addItems();

    let grandTotal = 0;
    cart.forEach(item => grandTotal += item.totalPrice);

    let isMember = yesOrno("Are you a member? (yes/no)");
    let membershipType = "None";
    let discountAmount = 0;

    if (isMember === "yes") {
        membershipType = membership();
        const calc = getDiscountFunction(membershipType);
        discountAmount = calc(grandTotal);
    }

    let discountedTotal = grandTotal - discountAmount;
    let gstAmount = discountedTotal * 0.18;
    let platformFee = discountedTotal * 0.002;
    let totalWithTax = discountedTotal + gstAmount + platformFee;

    let paymentMode = getPaymentMode();
    let surcharge = 0;
    let convenienceFee = 0;

    if (paymentMode === "card" && totalWithTax < 1000)
        surcharge = totalWithTax * 0.025;
    else
        convenienceFee = totalWithTax * 0.01;

    let finalAmount = totalWithTax + surcharge + convenienceFee;
    let invoiceNumber = "INV" + Math.floor(Math.random() * 1000000);
    let invoiceDate = new Date();
    let email = getEmail();

    const paymentResult = await simulatePayment(paymentMode);

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
        paymentStatus: paymentResult.paymentStatus,
        paymentTime: paymentResult.time,
        email,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(INVOICE_KEY, JSON.stringify(invoiceData));

    completeBilling(function (data) {
        console.log("\n===========INVOICE ===========");
        console.log("Invoice No   :", data.invoiceNumber);
        console.log("Invoice Date :", new Date(data.invoiceDate).toLocaleString());
        console.log("------------------------------------------");
        data.cartItems.forEach((item, index) => {
            console.log(
                `${index + 1}. ${item.itemCode} | ${item.description} | Qty: ${item.quantity} | ₹${item.pricePerUnit} | Total: ₹${item.totalPrice}`
            );
        });
        console.log("------------------------------------------");
        console.log("FINAL AMOUNT PAYABLE: ₹" + data.finalAmount.toFixed(2));
        console.log("------------------------------------------");
        console.log(`Thank you for shopping, confirmation sent to ${data.email}`);
    });
}

processOrder();
