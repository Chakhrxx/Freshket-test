import { Calculator } from "./calculator";

describe("Calculator", () => {
  // Create a new instance of the Calculator class before each test
  let calculator: Calculator;
  beforeEach(() => {
    calculator = new Calculator();
  });

  // Calculate the total price for an order without a member card
  it("calculates the total price without member card", () => {
    const order = {
      Red: 1,
      Green: 1,
    };
    // The calculatePrice function should return 90 for the given order without the member card discount
    expect(calculator.calculatePrice(order, false)).toBe(90);
  });

  // Calculate the total price for an order with a member card
  it("calculates the total price with member card", () => {
    const order = {
      Red: 1,
      Green: 1,
    };
    // The calculatePrice function should return 81 for the given order with the member card discount
    expect(calculator.calculatePrice(order, true)).toBe(81);
  });

  // Calculate the total price for an order with specific items and no member card
  it("applies discount for ordering 2 Pink sets", () => {
    const order = {
      Pink: 2,
    };
    // The calculatePrice function should return 152 for the given order without the member card discount
    expect(calculator.calculatePrice(order, false)).toBe(152);
  });

  // Calculate the total price for an order with specific items and no member card
  it("applies discount for ordering 2 Orange sets", () => {
    const order = {
      Orange: 2,
    };
    // The calculatePrice function should return 228 for the given order without the member card discount
    expect(calculator.calculatePrice(order, false)).toBe(228);
  });

  // Calculate the total price for an order with specific items and no member card
  it("applies discount for ordering 5 Orange sets", () => {
    const order = {
      Orange: 5,
    };
    // The calculatePrice function should return 576 for the given order without the member card discount
    expect(calculator.calculatePrice(order, false)).toBe(576);
  });
});
