# Documentation: SizeSelection.js

## Overview

The `SizeSelection` component is responsible for displaying a set of size options (e.g., Small, Medium, Large) for a menu item and allowing the user to select one. It is designed to be flexible and can handle different item types (like appetizers, sides, etc.), with certain sizes being disabled based on the item type.

---

## Features

1. **Size Options**
   - Displays three size options: Small, Medium, and Large.
   - The size options are displayed as buttons, and the user can select one by clicking on it.

2. **Dynamic Size Disabling**
   - Sizes are dynamically disabled based on the `itemType` prop, using the `disabledSizes` mapping.
   - For example, certain sizes can be unavailable for specific item types (e.g., "Medium" size is not available for appetizers).

3. **Size Selection**
   - When a user selects a size, an `onSizeSelect` callback is triggered, passing the selected size and item type to the parent component.

4. **Conditional Styling**
   - Disabled sizes are visually indicated using the class `invisible-btn`, making them appear hidden or disabled.
   - The `disabled` attribute is used to prevent the user from selecting a disabled size.

---

## Exported Entities

### SizeSelection
- **Type**: React Functional Component
- **Description**: A component that displays size options for a menu item and allows the user to select a size.
- **Props**:
  - `onSizeSelect`: A callback function triggered when a size is selected. It receives an object containing the `name` of the size (in lowercase) and the `type` of the item.
  - `itemType`: A string representing the type of item (e.g., `"side"`, `"appetizer"`) that influences the available size options.

---

## Component Structure

The component consists of the following parts:

1. **Size Buttons**
   - Displays three size options: Small, Medium, and Large.
   - The buttons for disabled sizes are visually altered by adding the class `invisible-btn`, making them invisible.
   - The buttons are disabled using the `disabled` attribute for the disabled sizes.
   
2. **Size Selection Handler**
   - When a size button is clicked, the `onSizeSelect` function is called with the selected size and item type.

---

## Functions

### Disabled Sizes Mapping
- **disabledSizes**: A mapping object that defines which sizes should be disabled for certain item types. It can be expanded as needed for more item types and their respective disabled sizes.
  
  ```javascript
  const disabledSizes = {
    appetizer: ["Medium"],  // Medium is disabled for appetizer items.
    side: ["Small"],        // Small is disabled for side items.
  };
