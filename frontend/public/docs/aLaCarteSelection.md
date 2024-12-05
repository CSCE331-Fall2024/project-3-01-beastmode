# AlaCarteSelection Component Documentation

## Overview

The `AlaCarteSelection` component enables users to browse and select "a la carte" menu items (sides and entrees). It integrates with a cart system and supports size selection, detailed item information, and navigation to the order summary.

---

## Features

1. **Menu Display**:
   - Lists sides and entrees with details such as name, image, calories, and premium indicators.

2. **Item Interaction**:
   - Allows users to select items, choose sizes, and view detailed information.

3. **Cart Integration**:
   - Adds selected items to the cart with size and quantity management.

4. **User Feedback**:
   - Displays loading and error states.
   - Navigates users to the order summary page upon adding items to the cart.

---

## State Variables

| State Variable      | Type       | Description                                               |
|---------------------|------------|-----------------------------------------------------------|
| `sides`             | `Array`    | Stores the list of sides fetched from the backend.        |
| `entrees`           | `Array`    | Stores the list of entrees fetched from the backend.      |
| `loading`           | `Boolean`  | Tracks the loading state of the component.               |
| `error`             | `String`   | Stores error messages during data fetching.              |
| `selectedInfo`      | `Object`   | Stores the currently selected item's detailed information.|
| `showSizeDialog`    | `Boolean`  | Toggles the size selection dialog.                       |
| `selectedItem`      | `Object`   | Stores the currently selected item.                      |
| `selectedItemType`  | `String`   | Stores the type of the selected item (`side` or `entree`).|

---

## Functions

### **Data Fetching**
- **`fetchItems`**:
  - Fetches sides and entrees from the backend API.
  - Handles errors and sets loading states.

### **Size Options**
- **`getSizeOptions(itemType, selectedItem)`**:
  - Generates size options for the selected item based on its type (`side` or `entree`).
  - Calculates the total price, including premiums for premium items.

### **Item Selection**
- **`handleItemSelect(item, type)`**:
  - Stores the selected item and opens the size selection dialog.

- **`handleSizeSelect(size)`**:
  - Adds the selected item with its size to the cart.
  - Navigates the user to the order summary page.

- **`handleSizeDialogClose()`**:
  - Closes the size selection dialog and clears the selected item.

### **Info Display**
- **`handleInfoClick(item)`**:
  - Displays detailed information about the selected item.

- **`handleCloseInfo()`**:
  - Closes the detailed information card.

### **Cart Management**
- **`addToCart(item)`**:
  - Adds the selected item to the cart.
  - Updates the quantity if the item already exists in the cart.

---

## Subcomponents

### **MenuItemCard**
- Displays individual menu items with details and interaction options.

### **InfoCard**
- Shows detailed information about a selected item.

### **SizeSelectionDialog**
- Allows users to select a size for the selected item and displays corresponding prices.

---

## Props and Context

### Props
None.

### Context
| Context Name  | Description                           |
|---------------|---------------------------------------|
| `CartContext` | Manages cart items and operations.    |

---

## Component Workflow

1. **Initialization**:
   - Fetches menu items (sides and entrees) from the backend and handles loading and error states.

2. **Item Selection**:
   - Users can view items, open size selection dialogs, and add items to the cart.

3. **Size Selection**:
   - Displays available sizes with calculated prices for the selected item.
   - Adds the item with its size to the cart.

4. **Navigation**:
   - Redirects users to the order summary page after adding items to the cart.

5. **Information Display**:
   - Shows detailed item descriptions, including allergens and nutritional information.

---

## Example Usage

```javascript
import React from 'react';
import { CartProvider } from './components/CartContext';
import AlaCarteSelection from './AlaCarteSelection';

const App = () => {
  return (
    <CartProvider>
      <AlaCarteSelection />
    </CartProvider>
  );
};

export default App;
