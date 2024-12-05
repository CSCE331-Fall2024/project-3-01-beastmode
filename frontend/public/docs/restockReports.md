# Documentation: `RestockReports.js`

## Overview

The `RestockReports` component provides a detailed interface for managing low inventory items. It fetches and displays items with low stock levels, allowing users to restock individual items or all low-stock items simultaneously.

---

## Features

1. **Display Low Inventory**
   - Fetch and display items that have a low inventory level from the API.

2. **Restock Individual Items**
   - Users can restock individual items by specifying an amount.

3. **Restock All Low Stock Items**
   - A single button allows users to restock all low-stock items.

4. **Dynamic Input Handling**
   - Users can adjust the restock amount for individual items dynamically.

5. **Loading Indicator**
   - Displays a loading message while inventory data is being fetched.

---

## Component State

### `inventory`
- **Type**: `Array`
- **Description**: Stores the list of low-inventory items fetched from the API.

### `restockAmounts`
- **Type**: `Object`
- **Description**: Maps item names to their respective restock amounts.

### `loading`
- **Type**: `Boolean`
- **Description**: Indicates whether data is currently being loaded.

---

## Functions

### `fetchLowInventory`
- **Type**: `useEffect`
- **Description**: Fetches low inventory items from the API on component mount.

### `handleRestock`
- **Parameters**: `itemName` (String)
- **Description**: 
  - Sends a POST request to restock the specified item with the defined quantity.
  - Refreshes the page upon success.

### `handleRestockAll`
- **Description**: 
  - Sends a POST request to restock all low-stock items.
  - Refreshes the page upon success.

### `handleInputChange`
- **Parameters**: `e` (Event), `itemName` (String)
- **Description**: 
  - Dynamically updates the restock amount for a specific item based on user input.

---

## API Endpoints

### `GET /manager/inventory/low`
- **Response**: An array of low-inventory items.

### `POST /manager/inventory/restock`
- **Payload**: `{ itemName, amount }`
- **Response**: Confirmation of the restock action.

### `POST /manager/inventory/restock/low`
- **Response**: Confirmation of restocking all low-inventory items.

---

## User Interface

### Components

1. **Sidebar**
   - `SidebarManager` is used to navigate between different sections of the application.

2. **Low Inventory Cards**
   - Each card represents a low-stock item, showing:
     - Item name.
     - Remaining quantity.
     - Input for restock amount.
     - Restock button.

3. **Restock All Button**
   - Allows users to restock all low-stock items at once.

---

## CSS Classes

- **`page`**: Styles the main container for the page.
- **`page-background-container`**: Adds a background container.
- **`page-background`**: Styles the page content.
- **`page-title`**: Formats the title text.
- **`inventory-card`**: Styles the individual item cards.
- **`restock-input`**: Styles the restock input fields.
- **`btn`**: Standard button class.
- **`btn-danger`**: Styles the "Restock All" button.
- **`btn-success`**: Styles the individual restock buttons.

---

## Usage Example

```javascript
import React from 'react';
import RestockReports from './RestockReports';

function App() {
  return (
    <div>
      <RestockReports />
    </div>
  );
}

export default App;
