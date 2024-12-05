# AppsAndMoreSelection Component Documentation

## Overview

The `AppsAndMoreSelection` component allows users to browse and select appetizers and desserts from the menu. It supports size selection, detailed item information, and integration with the cart system.

---

## Features

1. **Menu Display**:
   - Lists appetizers and desserts with details such as name, image, calories, and premium indicators.

2. **Item Interaction**:
   - Enables item selection, size customization, and viewing detailed nutritional information.

3. **Cart Integration**:
   - Adds selected items to the cart with size and quantity management.

4. **User Feedback**:
   - Displays loading and error states.

---

## State Variables

| State Variable       | Type       | Description                                               |
|----------------------|------------|-----------------------------------------------------------|
| `appetizers`         | `Array`    | Stores the list of appetizers fetched from the backend.   |
| `desserts`           | `Array`    | Stores the list of desserts fetched from the backend.     |
| `loading`            | `Boolean`  | Tracks the loading state of the component.               |
| `error`              | `String`   | Stores error messages during data fetching.              |
| `selectedInfo`       | `Object`   | Stores detailed information for the currently selected item. |
| `showSizeDialog`     | `Boolean`  | Toggles the size selection dialog.                       |
| `selectedItem`       | `Object`   | Stores the currently selected item for size customization. |
| `selectedItemType`   | `String`   | Stores the type of the selected item (`appetizer` or `dessert`). |

---

## Functions

### **Data Fetching**
- **`fetchData()`**:
  - Fetches appetizers and desserts from the backend API.
  - Handles errors and sets loading states.

### **Size Options**
- **`getSizeOptions(itemType, selectedItem)`**:
  - Generates size options for the selected item based on its type (`appetizer` or `dessert`).
  - Calculates the total price, including premiums for premium items.

### **Item Selection**
- **`handleItemSelect(item, type)`**:
  - Stores the selected item and its type.
  - Opens the size selection dialog.

- **`handleSizeSelect(size)`**:
  - Adds the selected item with its size to the cart.

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
- Shows detailed nutritional information for the selected item.

### **SizeSelectionDialog**
- Allows users to select a size for the selected item and displays corresponding prices.

### **NavBar**
- Provides navigation functionality and a consistent header.

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
   - Fetches appetizers and desserts from the backend and manages loading and error states.

2. **Item Selection**:
   - Users can view and select items, customize sizes, and add items to the cart.

3. **Size Selection**:
   - Displays available sizes and calculates prices for the selected item.

4. **Information Display**:
   - Shows detailed descriptions, allergens, and nutritional information.

---

## Example Usage

```javascript
import React from 'react';
import { CartProvider } from './components/CartContext';
import AppsAndMoreSelection from './AppsAndMoreSelection';

const App = () => {
  return (
    <CartProvider>
      <AppsAndMoreSelection />
    </CartProvider>
  );
};

export default App;
