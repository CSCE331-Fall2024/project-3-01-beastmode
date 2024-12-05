# File: KioskOrderLayout.js

## Description
The `KioskOrderLayout` component acts as a layout wrapper for the kiosk order-related routes. It integrates the `CheckoutButton` and `Cart` components, allowing users to view and manage their cart while interacting with order-related pages.

---

## Key Features

### 1. **Cart Integration**
   - Displays a floating cart checkout button.
   - Allows users to toggle the cart open or closed.
   - Shows the total quantity of items in the cart.

### 2. **Layout for Nested Routes**
   - Uses React Router's `Outlet` to render child routes within the layout.

---

## Key Components

### 1. **`CheckoutButton`**
   - A floating button that shows the total number of items in the cart.
   - Toggles the visibility of the `Cart` component.

### 2. **`Cart`**
   - Displays the items in the user's cart.
   - Allows users to modify item quantities or remove items.

---

## Code Breakdown

### 1. Imports
- React and `useContext` for state management.
- `Outlet` from `react-router-dom` for rendering nested routes.
- `CheckoutButton` and `Cart` for UI functionality.
- `CartContext` for accessing cart state and methods.

### 2. Context Integration
The component uses the `CartContext` to manage the state of the cart:
- **`cartItems`**: List of items in the cart.
- **`isCartOpen`**: Boolean indicating whether the cart is visible.
- **`toggleCart`**: Function to toggle the cart's visibility.

```javascript
const { cartItems, isCartOpen, toggleCart } = useContext(CartContext);
