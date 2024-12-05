# Documentation: `MenuMain1.js`

## Overview

The `MenuMain1` component is a React component that displays a menu interface for a restaurant system. It fetches and displays menu items, sides, and à la carte options dynamically from an API. The component includes functionalities for data formatting, error handling, and loading state management.

---

## Component: `MenuMain1`

### Description

`MenuMain1` provides an interactive UI for selecting meals, sides, and à la carte options. It retrieves data from an API and organizes it into structured sections, using additional components like `MenuBoardHowTo` and `MenuBoardSide`.

---

## Features

1. **Dynamic Data Fetching**
   - Fetches menu data (`menuItems`, `sides`, and `aLaCarte`) from API endpoints using Axios.
   - Manages loading and error states.

2. **Interactive Sections**
   - Displays sections for:
     - Main menu items
     - Sides
     - À la carte options with pricing tables for different sizes (Small, Medium, Large).

3. **Customizable Formatting**
   - Provides utility functions to format item names for better readability.

---

## State Variables

- **`menuItems`**:  
  Stores the list of main menu items fetched from the API.  
  **Type**: `Array`

- **`sides`**:  
  Stores the list of side items fetched from the API.  
  **Type**: `Array`

- **`aLaCarte`**:  
  Stores the list of à la carte options fetched from the API.  
  **Type**: `Array`

- **`loading`**:  
  Tracks whether the data is still being fetched.  
  **Type**: `Boolean`  
  **Default**: `true`

- **`error`**:  
  Holds an error message in case of a failed API request.  
  **Type**: `String | null`  
  **Default**: `null`

---

## Utility Functions

### `formatProductName(name)`

- **Description**:  
  Formats product names by adding spaces before capital letters and capitalizing the first letter of each word.

- **Parameters**:  
  - `name` (string): The product name to format.

- **Returns**:  
  A formatted string.

---

### `formatItemName(name)`

- **Description**:  
  Formats item names by removing specific keywords (`Small`, `Medium`, `Side`) and capitalizing each word.

- **Parameters**:  
  - `name` (string): The item name to format.

- **Returns**:  
  A formatted string.

---

## API Integration

### Endpoints

1. `/menu/menu`: Fetches main menu items.
2. `/menu/sides`: Fetches side items.
3. `/menu/alacarte`: Fetches à la carte options.

### Error Handling

- Displays a user-friendly error message if API requests fail.
- Logs errors to the console for debugging purposes.

---

## Child Components

1. **`MenuBoardHowTo`**  
   - Displays individual menu items with details like name, image, description, calories, and price.

2. **`MenuBoardSide`**  
   - Displays side items with details like name, image, and calories.

---

## Rendering

### Loading State

Displays a "Loading..." message while fetching data from the API.

### Error State

Displays the error message stored in the `error` state.

### Main Sections

1. **Main Menu Items**:
   - Rendered using `MenuBoardHowTo`.
   - Displays menu item name, image, description, calories, and price.

2. **Sides**:
   - Rendered using `MenuBoardSide`.
   - Displays up to 4 side items.

3. **À la Carte**:
   - Displays an image of the first à la carte item.
   - Includes a table showing prices for different sizes and categories.

---

## Dependencies

- **React**: For component-based development.  
- **Axios (`api`)**: For making API requests.  
- **Custom Components**:  
  - `MenuBoardHowTo`  
  - `MenuBoardSide`  
- **CSS**: Styling provided by `menu.css`.

---

## Example Usage

```javascript
import React from 'react';
import MenuMain1 from './MenuMain1';

function App() {
  return (
    <div>
      <MenuMain1 />
    </div>
  );
}

export default App;
