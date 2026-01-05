
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

console.log("----- CART DETAILS -----");
cart.forEach((item, index) => {
    console.log(`Item ${index + 1}`);
    console.log(`Code        : ${item.itemCode}`);
    console.log(`Description : ${item.description}`);
    console.log(`Quantity    : ${item.quantity}`);
    console.log(`Price/unit  : ₹${item.pricePerUnit}`);
    console.log(`Total Price : ₹${item.totalPrice}`);
    console.log("------------------------");
});

console.log(`Grand Total: ₹${grandTotal}`);
