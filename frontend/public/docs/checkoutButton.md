# CheckoutButton Component Documentation

The `CheckoutButton` component is a dynamic button used to access the cart in a kiosk application. It displays the number of items in the cart and toggles the cart view when clicked.

---

## Component Overview

### Location
`src/components/kiosk/CheckoutButton.js`

### Purpose
To provide an interactive button that allows users to open and close the cart. It visually indicates the number of items currently in the cart.

---

## Props

### `orderCount`
- **Type**: `Number`
- **Required**: Yes
- **Description**: Represents the total number of items in the cart.
- **Usage**: Displays the count as a badge on the button.

### `toggleCart`
- **Type**: `Function`
- **Required**: Yes
- **Description**: A callback function to toggle the cart's open/close state.

### `isCartOpen`
- **Type**: `Boolean`
- **Required**: Yes
- **Description**: Indicates whether the cart is currently open.
- **Usage**: Adds a "rolling" animation class when the cart is open.

---

## Styling

### CSS Classes
- **`checkout-button`**: Base class for the button.
- **`rolling`**: Applied to the button when the cart is open for animation effects.
- **`cart-icon`**: Styles the shopping cart icon inside the button.
- **`order-count-badge`**: Styles the badge that displays the order count.

### CSS File
`src/styles/kiosk/checkoutButton.css`

---

## Features

1. **Cart Toggle**:
   - Clicking the button triggers the `toggleCart` function, opening or closing the cart.

2. **Order Count Badge**:
   - Displays a badge showing the number of items in the cart when `orderCount > 0`.

3. **Dynamic Animation**:
   - Adds a "rolling" animation class to the button when `isCartOpen` is `true`.

---

## Usage

### Importing

```javascript
import CheckoutButton from './components/kiosk/CheckoutButton';
