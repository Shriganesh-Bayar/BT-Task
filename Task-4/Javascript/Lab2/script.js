// Lab 1: Add Items to Cart

let cart = [];
let grandTotal = 0;

while (true) {
    // 1. Take item details from user
    let itemCode = prompt("Enter Item Code:");
    let description = prompt("Enter Item Description:");
    let quantity = Number(prompt("Enter Quantity:"));
    let pricePerUnit = Number(prompt("Enter Price Per Unit:"));

    // 2. Calculate total price for the item
    let totalPrice = quantity * pricePerUnit;

    // 3. Create item object
    let item = {
        itemCode: itemCode,
        description: description,
        quantity: quantity,
        pricePerUnit: pricePerUnit,
        totalPrice: totalPrice
    };

    // 4. Push item into cart array
    cart.push(item);

    // 5. Ask if user wants to add another item
    let choice = prompt("Do you want to add another item? (yes/no)").toLowerCase();
    if (choice !== "yes") {
        break;
    }
}

// 6. Calculate grand total
for (let item of cart) {
    grandTotal += item.totalPrice;
}

// Apply Membership Discount

let membershipType = "None";
let discountRate = 0;
let discountAmount = 0;
let discountedTotal = grandTotal;

// Ask if user is a member
let isMember = prompt("Are you a member? (yes/no)").toLowerCase();

if (isMember === "yes") {
    // Ask for membership type
    membershipType = prompt(
        "Enter membership type (Silver / Gold / Platinum):"
    ).toLowerCase();

    // Assign discount rate
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

// Calculate discount amount
discountAmount = grandTotal * discountRate;

// Subtract discount from grand total
discountedTotal = grandTotal - discountAmount;

// Display results
console.log("----- MEMBERSHIP DISCOUNT DETAILS -----");
console.log("Membership Type :", membershipType);
console.log("Discount Rate   :", discountRate * 100 + "%");
console.log("Discount Amount : ₹" + discountAmount.toFixed(2));
console.log("Total After Discount : ₹" + discountedTotal.toFixed(2));

