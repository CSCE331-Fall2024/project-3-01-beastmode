# Cart Component Documentation

## Overview

The `Cart` component serves as an off-canvas shopping cart for the kiosk application. It allows users to view their selected items, modify quantities, apply deals, and proceed to checkout. The component integrates deal selection, order confirmation, and error handling for a seamless user experience.

---

## Features

1. **Interactive Cart Management**:
   - Add, remove, or update item quantities.
   - Displays item details, including sides, entrees, and premium options.

2. **Checkout System**:
   - Calculates subtotal, tax, discounts, and total price.
   - Integrates with the backend to process orders.

3. **Deal System**:
   - Allows customers to apply discounts using "Beast Points."
   - Supports 20% and 50% discounts based on available points.

4. **Responsive UI**:
   - Displays overlays for order confirmation, error messages, and deal selection.
   - Adapts visually based on cart state and interactions.

---

## Props

| Prop Name    | Type      | Description                        |
|--------------|-----------|------------------------------------|
| `isOpen`     | `Boolean` | Indicates whether the cart is open. |
| `toggleCart` | `Function`| Function to toggle the cart view.   |
| `cartItems`  | `Array`   | Array of items currently in the cart. |

---

## Subcomponents

### **ConfirmDialog**
- Displays a confirmation dialog for removing items.
- Props:
  - `message`, `onConfirm`, `onCancel`.

---

## State Management

| State Variable        | Type      | Description                                           |
|-----------------------|-----------|-------------------------------------------------------|
| `showOverlay`         | `Boolean` | Controls the cart's overlay visibility.              |
| `overlayClass`        | `String`  | Manages fade-in/out animation for the overlay.        |
| `showConfirmDialog`   | `Boolean` | Toggles the confirmation dialog for item removal.    |
| `itemToRemove`        | `Object`  | Stores the item selected for removal.                |
| `showOrderConfirmation` | `Boolean` | Indicates whether the order confirmation is displayed. |
| `errorMessage`        | `String`  | Stores error messages for failed operations.         |
| `selectedDeal`        | `Object`  | Stores the applied deal details.                     |
| `showDealModal`       | `Boolean` | Controls the deal selection modal visibility.        |

---

## Functions

### **Item Management**
- `handleIncrement(index)`: Increases the quantity of a cart item.
- `handleDecrement(index)`: Decreases the quantity or prompts for removal if the quantity is 1.
- `handleRemove(index)`: Prompts the confirmation dialog for item removal.

### **Deal Application**
- `applyDeal(deal)`: Applies a selected deal and updates the `selectedDeal` state.

### **Checkout**
- `handleCheckout()`: Processes the cart and sends the order to the backend.
  - Includes customer and deal information if applicable.

### **Price Calculations**
- `calculateSubtotal(cartItems)`: Computes the subtotal of the cart.
- `calculateDiscountAmount(cartItems)`: Calculates the discount amount based on the applied deal.
- `calculateDiscountedSubtotal(cartItems)`: Calculates the subtotal after applying discounts.
- `calculateTax(cartItems)`: Computes the tax for the cart items.
- `calculateTotal(cartItems)`: Calculates the final total, including discounts and tax.

### **Utility Functions**
- `getItemImage(item)`: Retrieves the item's image or a placeholder.
- `formatProductName(name)`: Formats product names for display.
- `getItemPrice(item)`: Calculates the price of an item, including premiums.

---

## Component Workflow

1. **Initialization**:
   - Updates the overlay and cart view based on `isOpen`.

2. **Cart Interaction**:
   - Handles adding, removing, and updating quantities of items.

3. **Deals**:
   - Displays a modal for selecting and applying deals.
   - Updates customer "Beast Points" after applying a deal.

4. **Checkout**:
   - Validates cart details, processes the order, and fetches updated customer data if applicable.

5. **Error Handling**:
   - Displays error messages for checkout issues.

---

## Example Usage

```javascript
import React from 'react';
import { CartProvider } from './CartContext';
import Cart from './Cart';

const App = () => {
  return (
    <CartProvider>
      <Cart isOpen={true} toggleCart={() => {}} cartItems={[]} />
    </CartProvider>
  );
};

export default App;
