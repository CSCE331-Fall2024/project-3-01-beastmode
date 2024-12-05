# Documentation: OrderSection.js

## Overview

The `OrderSection` component is used to display the details of a customer's current order. It provides a visual representation of the order's items, their quantities, and pricing. The component allows users to update item quantities, view the total cost including tax, and proceed with checkout or cancel the order. The component also provides buttons to modify the quantity of items and triggers actions such as checking out or canceling the order.

---

## Features

1. **Order Display**
   - Displays the order number and the list of items in the current order, including their names, quantities, and prices.
   - Displays subitems (if any) for each item in the order.

2. **Quantity Controls**
   - Users can increase or decrease the quantity of items in the order via buttons and a number input.
   - Quantity changes are reflected in real-time.

3. **Price Calculation**
   - The component calculates and displays the subtotal, tax, and total (including tax) for the current order.
   - Tax is calculated as 6.25% of the subtotal.

4. **Checkout and Cancel Buttons**
   - Displays buttons for proceeding to checkout or canceling the order.
   - The checkout button is disabled when certain actions are not allowed, such as when the order is incomplete.
   - The cancel button is disabled when no items are present in the order.

5. **Conditional Styling**
   - Button styles change based on whether certain actions (like checkout or cancel) are enabled or disabled.

---

## Exported Entities

### OrderSection
- **Type**: React Functional Component
- **Description**: A component that displays the current order details, including item names, quantities, pricing, and actions such as checkout and cancel.
- **Props**:
  - `orderNumber`: The order number (e.g., "Order #1").
  - `currentOrder`: An array of objects representing the items in the order.
  - `total`: The total price (subtotal) of the items before tax.
  - `onCheckout`: A callback function triggered when the "Checkout" button is clicked.
  - `onCancel`: A callback function triggered when the "Cancel" button is clicked.
  - `onIncreaseQuantity`: A callback function triggered when the quantity of an item is increased.
  - `onDecreaseQuantity`: A callback function triggered when the quantity of an item is decreased.
  - `onChangeQuantity`: A callback function triggered when the quantity input is changed manually.
  - `disableActions`: A boolean that disables the checkout and cancel buttons if set to true.

---

## Component Structure

The component consists of the following parts:

1. **Order Header**
   - Displays the order number at the top, with custom styling for visual clarity.

2. **Order Items List**
   - Renders the items in the `currentOrder` array.
   - For each item, it displays the formatted item name, total price for the item (quantity * price), and any subitems (with their own names and quantities).
   - For each item, a set of quantity controls (decrease, increase, and input field) is displayed, allowing users to modify the quantity.

3. **Pricing Summary**
   - Shows the subtotal, tax, and total amount, formatted with two decimal places.

4. **Action Buttons**
   - Displays "Checkout" and "Cancel" buttons at the bottom.
   - These buttons have conditional styles and are disabled based on the state of the order (e.g., if no items are present or if actions are disabled).

---

## Functions

### formatOrderNames
- **Type**: Helper function
- **Description**: Formats the names of items in the order, removing certain keywords (e.g., "Side", "Entree") and formatting size information (e.g., "Small", "Medium", "Large") in parentheses.

  ```javascript
  const formatOrderNames = (item) => {
    const name = item.item_name || item.product_name || item.name || "Unknown Item";
    let formattedName = name.replace(/Side|Entree/g, "");
    formattedName = formattedName.replace(/([A-Z])/g, " $1").trim();
    formattedName = formattedName.replace(/\b(Small|Medium|Large)\b/gi, "($1)");
    return formattedName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
