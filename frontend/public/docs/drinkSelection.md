# DrinkSelection Component Documentation

## Overview

The `DrinkSelection` component allows users to browse and select drinks, including both fountain drinks and prepackaged drinks, from the menu. Fountain drinks allow for size selection before being added to the cart, while other drinks can be added directly.

---

## Features

1. **Menu Display**:
   - Displays a list of drinks with details such as name, image, calories, and pricing options.

2. **Item Interaction**:
   - Users can select drinks, view detailed nutritional information, and choose sizes for fountain drinks.

3. **Cart Integration**:
   - Adds selected drinks to the cart, with size and quantity management.

4. **User Feedback**:
   - Displays loading and error states during data fetching.

---

## State Variables

| State Variable       | Type       | Description                                                |
|----------------------|------------|------------------------------------------------------------|
| `drinks`             | `Array`    | Stores the list of drinks fetched from the backend.        |
| `loading`            | `Boolean`  | Tracks the loading state of the component.                |
| `error`              | `String`   | Stores error messages during data fetching.               |
| `selectedInfo`       | `Object`   | Stores detailed information for the currently selected drink. |
| `showSizeDialog`     | `Boolean`  | Toggles the size selection dialog.                        |
| `selectedDrink`      | `Object`   | Stores the currently selected drink for size customization. |

---

## Functions

### **Data Fetching**
- **`fetchDrinks()`**:
  - Fetches the list of drinks from the backend API.
  - Handles loading and error states.

### **Size Options**
- **`getSizeOptions(selectedDrink)`**:
  - Generates size options for the selected drink (fountain drinks).
  - Calculates the total price, including premiums for premium drinks.

### **Drink Selection**
- **`handleDrinkSelect(drink)`**:
  - Differentiates between fountain drinks and other drinks.
  - Prompts size selection for fountain drinks or directly adds other drinks to the cart.

- **`handleSizeSelect(size)`**:
  - Adds a fountain drink with the selected size to the cart.

- **`handleSizeDialogClose()`**:
  - Closes the size selection dialog and clears the selected drink.

### **Info Display**
- **`handleInfoClick(drink)`**:
  - Displays detailed nutritional information for the selected drink.

- **`handleCloseInfo()`**:
  - Closes the detailed information card.

### **Cart Management**
- **`addToCart(item)`**:
  - Adds the selected drink to the cart.
  - Updates the quantity if the drink already exists in the cart.

---

## Subcomponents

### **MenuItemCard**
- Displays individual drinks with details and interaction options.

### **InfoCard**
- Shows detailed nutritional information for the selected drink.

### **SizeSelectionDialog**
- Allows users to select a size for fountain drinks and displays corresponding prices.

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
   - Fetches drinks from the backend API and manages loading and error states.

2. **Drink Selection**:
   - Users can select drinks, customize sizes for fountain drinks, and add them to the cart.

3. **Size Selection**:
   - Displays available sizes and calculates prices for fountain drinks.

4. **Information Display**:
   - Shows detailed descriptions, allergens, and nutritional information.

---

## Example Usage

```javascript
import React from 'react';
import { CartProvider } from './components/CartContext';
import DrinkSelection from './DrinkSelection';

const App = () => {
  return (
    <CartProvider>
      <DrinkSelection />
    </CartProvider>
  );
};

export default App;
