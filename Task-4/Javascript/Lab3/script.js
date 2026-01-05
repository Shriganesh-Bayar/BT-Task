
let cart = [];
let grandTotal = 0;

while (true) {
    let itemCode = prompt("Enter Item Code:");
    let description = prompt("Enter Item Description:");
    let quantity = Number(prompt("Enter Quantity:"));
    let pricePerUnit = Number(prompt("Enter Price Per Unit:"));

    let totalPrice = quantity * pricePerUnit;

    let item = {
        itemCode: itemCode,
        description: description,
        quantity: quantity,
        pricePerUnit: pricePerUnit,
        totalPrice: totalPrice
    };

    cart.push(item);

    let choice = prompt("Do you want to add another item? (yes/no)").toLowerCase();
    if (choice !== "yes") {
        break;
    }
}

for (let item of cart) {
    grandTotal += item.totalPrice;
}


let membershipType = "None";
let discountRate = 0;
let discountAmount = 0;
let discountedTotal = grandTotal;

let isMember = prompt("Are you a member? (yes/no)").toLowerCase();

if (isMember === "yes") {
    membershipType = prompt(
        "Enter membership type (Silver / Gold / Platinum):"
    ).toLowerCase();

    if (membershipType === "silver") {
        discountRate = 0.05;
    } else if (membershipType === "gold") {
        discountRate = 0.10;
    } else if (membershipType === "platinum") {
        discountRate = 0.15;
    } else {
        discountRate = 0;
        membershipType = "None";
    }
}

discountAmount = grandTotal * discountRate;

discountedTotal = grandTotal - discountAmount;

console.log("----- MEMBERSHIP DISCOUNT DETAILS -----");
console.log("Membership Type :", membershipType);
console.log("Discount Rate   :", discountRate * 100 + "%");
console.log("Discount Amount : ₹" + discountAmount.toFixed(2));
console.log("Total After Discount : ₹" + discountedTotal.toFixed(2));


let gstRate = 0.18;
let platformFeeRate = 0.002;

let gstAmount = 0;
let platformFee = 0;
let totalWithTax = 0;


gstAmount = discountedTotal * gstRate;

platformFee = discountedTotal * platformFeeRate;

totalWithTax = discountedTotal + gstAmount + platformFee;

console.log("----- TAX & PLATFORM FEE DETAILS -----");
console.log("GST (18%)           : ₹" + gstAmount.toFixed(2));
console.log("Platform Fee (0.2%) : ₹" + platformFee.toFixed(2));
console.log("Total Payable Amount: ₹" + totalWithTax.toFixed(2));
