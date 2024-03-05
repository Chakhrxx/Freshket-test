export class Calculator {
  // The 'menu' object holds the prices for various items in the calculator's menu.
  menu: Record<string, number>;

  constructor() {
    this.menu = {
      Red: 50,
      Green: 40,
      Blue: 30,
      Yellow: 50,
      Pink: 80,
      Purple: 90,
      Orange: 120, // Orange is the most expensive item on the menu.
    };
  }

  // This method calculates the total price of an order, taking into account any applicable discounts and member card benefits.
  calculatePrice(
    order: Record<string, number>, // The 'order' object contains the items and quantities in the user's order.
    hasMemberCard: boolean // A boolean indicating whether the user has a member card.
  ): number {
    let totalPrice = 0;

    // Iterate through each item and quantity pair in the order, checking if the item is in the menu.
    for (const [item, quantity] of Object.entries(order)) {
      if (item in this.menu) {
        let price = this.menu[item] * quantity; // Calculate the base price of the item.

        // Apply discounts for certain items with a quantity of 5 or more.
        if (item === "Orange" && quantity >= 5) {
          const discountPairs = Math.floor(quantity / 2);
          const discountAmount = discountPairs * 2 * this.menu[item] * 0.05;
          price -= discountAmount;
        }
        // Apply a general 5% discount for certain items with a quantity of 2 or more.
        else if (
          (item === "Pink" || item === "Orange" || item === "Green") &&
          quantity >= 2
        ) {
          price *= 0.95;
        }

        totalPrice += price; // Add the item's price to the total price.
      } else {
        throw new Error(`Item '${item}' not found in the menu.`);
      }
    }

    // Apply a 10% discount to the total price if the user has a member card.
    if (hasMemberCard) {
      totalPrice *= 0.9;
    }

    return totalPrice; // Return the final total price of the order.
  }
}
