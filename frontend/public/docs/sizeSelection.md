# SizeSelectionDialog Component Documentation

## Overview

The `SizeSelectionDialog` component is a React modal dialog that allows users to select a size option for a specific item. The component displays size options, including the name and price, in a visually engaging format and supports animations for a smooth user experience.

---

## Props

| Prop Name      | Type       | Required | Description                                                             |
|-----------------|------------|----------|-------------------------------------------------------------------------|
| `item`         | `Object`   | Yes      | The item for which the size selection is being made.                   |
| `sizeOptions`  | `Array`    | Yes      | Array of available size options for the item. Each option includes `display_name` and `total_price`. |
| `onSizeSelect` | `Function` | Yes      | Callback function triggered when a size is selected.                   |
| `onClose`      | `Function` | Yes      | Callback function triggered when the dialog is closed.                 |

---

## Component Features

### Key Features
- **Dynamic Size Options**:
  Displays all available size options for the item dynamically.
  
- **Smooth Animations**:
  Implements fade-in and slide animations when the dialog opens.

- **Cancel Button**:
  Provides a cancel button to close the dialog without making a selection.

- **Customizable Layout**:
  Easily styled using the associated `sizeSelectionDialog.css`.

---

## Functions and Logic

1. **`formatProductName(name)`**:
   - Formats the item name by adding spaces before uppercase letters and capitalizing the first letter.
   - Example: `"LargePizza"` becomes `"Large Pizza"`.

2. **`useEffect` (Dialog Animation)**:
   - Adds an `open` class to the dialog and a `fade-in` class to the overlay for smooth entry animations.
   - Removes these classes when the component is unmounted to clean up.

3. **`onClick` Handlers**:
   - The dialog prevents event propagation to avoid accidentally closing when clicking inside.
   - The overlay listens for clicks to trigger the `onClose` callback.

4. **Size Option Buttons**:
   - Renders a button for each size option, displaying the name and price.
   - Triggers the `onSizeSelect` callback when a button is clicked.

---

## Component Workflow

1. **Initialization**:
   - On component mount, animations are triggered using the `useEffect` hook.

2. **Rendering**:
   - Displays the item's name, image, and available size options in the dialog.
   - Allows the user to select a size or cancel the dialog.

3. **Cleanup**:
   - Ensures animations and event listeners are properly removed on component unmount.

---

## Styling

The component relies on CSS classes defined in `sizeSelectionDialog.css` for animations and layout:

- **`.size-selection-overlay`**:
  - Covers the entire screen with a semi-transparent background.

- **`.size-selection-dialog`**:
  - Centered modal box with smooth slide-in animation.

- **`.size-option-button`**:
  - Buttons styled for each size option, highlighting interactivity.

- **`.cancel-button`**:
  - A button to close the dialog without selecting an option.

---

## Example Usage

```javascript
import React, { useState } from 'react';
import SizeSelectionDialog from './SizeSelectionDialog';

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const item = {
    product_name: "Pizza",
    image: "/path/to/image.jpg"
  };

  const sizeOptions = [
    { display_name: "Small", total_price: 5.99 },
    { display_name: "Medium", total_price: 7.99 },
    { display_name: "Large", total_price: 9.99 },
  ];

  const handleSizeSelect = (sizeOption) => {
    console.log("Selected size:", sizeOption);
    setIsDialogOpen(false);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsDialogOpen(true)}>Select Size</button>
      {isDialogOpen && (
        <SizeSelectionDialog 
          item={item} 
          sizeOptions={sizeOptions} 
          onSizeSelect={handleSizeSelect} 
          onClose={handleClose} 
        />
      )}
    </div>
  );
};

export default App;
