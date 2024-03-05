# 1) Calculator

Write a Calculator class for food store (you can use any programming languages)

```typescript
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
```

Calculate the total price for an order without a member card

```typescript
it("calculates the total price without member card", () => {
  const order = {
    Red: 1,
    Green: 1,
  };
  // The calculatePrice function should return 90 for the given order without the member card discount
  expect(calculator.calculatePrice(order, false)).toBe(90);
});
```

Calculate the total price for an order with a member card

```typescript
it("calculates the total price with member card", () => {
  const order = {
    Red: 1,
    Green: 1,
  };
  // The calculatePrice function should return 81 for the given order with the member card discount
  expect(calculator.calculatePrice(order, true)).toBe(81);
});
```

Calculate the total price for an order with specific items and no member card

```typescript
it("applies discount for ordering 2 Pink sets", () => {
  const order = {
    Pink: 2,
  };
  // The calculatePrice function should return 152 for the given order without the member card discount
  expect(calculator.calculatePrice(order, false)).toBe(152);
});
```

Calculate the total price for an order with specific items and no member card

```typescript
it("applies discount for ordering 2 Orange sets", () => {
  const order = {
    Orange: 2,
  };
  // The calculatePrice function should return 228 for the given order without the member card discount
  expect(calculator.calculatePrice(order, false)).toBe(228);
});
```

Calculate the total price for an order with specific items and no member card

```typescript
it("applies discount for ordering 5 Orange sets", () => {
  const order = {
    Orange: 5,
  };
  // The calculatePrice function should return 576 for the given order without the member card discount
  expect(calculator.calculatePrice(order, false)).toBe(576);
});
```

# 2) Create a responsive card display

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Card Display</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        padding: 20px;
      }
      .card {
        position: relative;
        width: 300px;
        background-color: #f9f9f9;
        border-radius: 8px;
        margin: 10px;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .card img {
        width: 100%;
        border-radius: 8px;
        bottom: 0;
        left: 0;
      }
      .card h3 {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: white;
        text-align: center;
        margin: 0 auto;
        background-color: #182200;
        width: 50%;
        padding: 10px 20px;
      }
      .card p {
        margin-top: 40px;
        font-size: 14px;
      }
      .tag {
        display: inline-block;
        background-color: #a6d33c;
        color: #fff;
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 20px;
        margin-right: 5px;
        margin-top: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container" id="cardContainer"></div>

    <script>
      fetch(
        "https://gist.githubusercontent.com/knot-freshket/142c21c3e8e54ef36e33f5dc6cf54077/raw/94ebab16839484f06d42eb799e30d0a945ff1a1b/freshket-places.json"
      )
        .then((response) => response.json())
        .then((placesData) => {
          fetch(
            "https://gist.githubusercontent.com/knot-freshket/fa49e0a5c6100d50db781f28486324d2/raw/55bc966f54423dc73384b860a305e1b67e0bfd7d/freshket-tags.json"
          )
            .then((response) => response.json())
            .then((tagsData) => {
              displayCards(placesData, tagsData);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));

      function displayCards(placesData, tagsData) {
        const container = document.getElementById("cardContainer");

        placesData.forEach((place) => {
          const card = document.createElement("div");
          card.classList.add("card");

          const img_url = document.createElement("img");
          img_url.src = place.img_url;
          card.appendChild(img_url);

          const name = document.createElement("h3");
          name.textContent = place.name;
          card.appendChild(name);

          const body = document.createElement("p");
          body.textContent = place.body;
          card.appendChild(body);

          const tags = document.createElement("div");
          tags.classList.add("tags");
          place.tags.forEach((tagId) => {
            const tag = document.createElement("span");
            const tagData = tagsData.find((tag) => tag.id === tagId);
            if (tagData) {
              tag.textContent = tagData.name;
              tag.classList.add("tag");
              tags.appendChild(tag);
            }
          });
          card.appendChild(tags);

          container.appendChild(card);
        });
      }
    </script>
  </body>
</html>
```

Mobile Screen
![Screenshot Mobile](https://raw.githubusercontent.com/Chakhrxx/Freshket-test/main/mobile.png)
Tablet Screen
![Screenshot Tablet](https://raw.githubusercontent.com/Chakhrxx/Freshket-test/main/tablet.png)
Desktop Screen
![Screenshot Desktop](https://raw.githubusercontent.com/Chakhrxx/Freshket-test/main/desktop.png)
