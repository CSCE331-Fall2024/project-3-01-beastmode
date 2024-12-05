# Documentation: MenuSection.js

## Overview

The `MenuSection` component is responsible for displaying a section of menu items in a POS system. It fetches the items from an API endpoint, formats the display of item names, and allows users to interact with the items by adding them to an order or selecting subitems. It also handles the toggling of "half-side" items based on user interactions.

---

## Features

1. **Menu Items Fetching**
   - The component fetches menu items from a provided `apiEndpoint` using an API service.
   - It handles errors gracefully by displaying an error message if the fetch fails.

2. **Item Formatting**
   - Menu item names are formatted to be more readable by removing size and category keywords, capitalizing words, and adding custom formatting for specific items like "appetizers."

3. **Dynamic Button Rendering**
   - Based on the item type (e.g., "premium", "side", "entree"), the component applies specific CSS classes to buttons, enabling distinct styles for different item categories.

4. **Half-Side Toggle**
   - When the API endpoint includes "sides", a button appears to toggle a "half-side" functionality. The button's state (active or not) is tracked, and the corresponding action is triggered when clicked.

---

## Exported Entities

### MenuSection
- **Type**: React Functional Component
- **Description**: Displays a section of menu items, fetches them from a specified API endpoint, and handles item selection, item addition, and half-side functionality.
- **Props**:
  - `currentWorkflow`: The current workflow object (used to determine certain conditions, such as hiding the "half-side" button for family meals).
  - `apiEndpoint`: The API endpoint for fetching the menu items (e.g., `/api/menu/entrees`, `/api/menu/sides`).
  - `onAddToOrder`: A callback function that handles adding an item to the order.
  - `onSubitemSelect`: A callback function for selecting subitems (e.g., when an item has variations or options).
  - `onHalfSide`: A callback function that is triggered when the "half-side" option is activated.
  - `onCancelHalfSide`: A callback function that is triggered when the "half-side" option is canceled.
  - `halfSideActivated`: A boolean that tracks whether the "half-side" option is active or not.
  - `setHalfSideActivated`: A function to update the state of the "half-side" option.

---

## Component Structure

The component consists of the following parts:

1. **Menu Fetching and Display**
   - The component fetches menu items using the `apiEndpoint` prop and stores them in the `menuItems` state.
   - It then displays the items in a grid, with each item rendered as a button.

2. **Item Buttons**
   - Each menu item is represented by a button. The item name is formatted using the `formatMenuNames` function, and different CSS classes are applied based on the item's category (e.g., "premium-item", "side-item").

3. **Half-Side Button (conditional)**
   - The button appears only if the `apiEndpoint` contains "sides" and the current workflow is not "familyMeal".
   - The button toggles between active and inactive states, and it triggers the `onHalfSide` or `onCancelHalfSide` functions accordingly.

---

## Functions

### fetchMenuItems
- **Type**: `useEffect` hook with async function
- **Description**: Fetches menu items from the given `apiEndpoint` when the component is mounted or when `apiEndpoint` changes.
- **Error Handling**: If the fetch fails, an error message is displayed to the user.

### getItemClass
- **Type**: Helper function
- **Description**: Determines the CSS class to apply to a menu item based on its type (e.g., "side", "entree", "dessert").
  
  ```javascript
  const getItemClass = (item) => {
    if (item.is_premium) return "premium-item";
    if (item.type === "side") return "side-item"; 
    if (item.type === "entree") return "entree-item"; 
    if (item.type === "dessert") return "dessert-item";
    if (item.type === "appetizer") return "appetizer-item";
    if (item.type === "drink") return "drink-item";
    return ""; 
  };
