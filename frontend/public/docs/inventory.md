# Documentation: `Inventory.js`

## Overview

The `Inventory` component is a React functional component that provides an interface for managing a restaurant's inventory. It allows users to view current stock levels, search inventory items, restock items, and remove stock.

---

## Features

1. **Inventory Display**
   - Shows a list of inventory items with their names and remaining quantities.
   - Highlights low stock items in red for easy identification.

2. **Search Functionality**
   - Allows users to search inventory items by name.

3. **Restock and Remove Stock**
   - Enables restocking or removing a specified quantity of items.
   - Provides a quick option to restock all low-stock items.

4. **Dynamic Updates**
   - Automatically updates inventory levels after performing actions such as restocking or removing items.

5. **Responsive Layout**
   - Adapts the display to various screen sizes using Bootstrap classes.

---

## Component State

### `inventory`
- **Type**: `Array`
- **Description**: Stores the list of inventory items fetched from the API.

### `restockAmounts`
- **Type**: `Object`
- **Description**: Tracks the quantity to be restocked for each item.

### `loading`
- **Type**: `Boolean`
- **Description**: Indicates whether inventory data is being fetched.

### `searchTerm`
- **Type**: `String`
- **Description**: Stores the user's search query.

---

## Functions

### `fetchInventory`
- **Description**: Fetches the inventory data from the API and initializes the `restockAmounts` state.

### `handleRestock`
- **Parameters**: `itemName` (string) - The name of the item to restock.
- **Description**: Sends a POST request to restock a specific inventory item.

### `handleRemove`
- **Parameters**: `itemName` (string) - The name of the item to remove stock from.
- **Description**: Sends a POST request to remove a specific quantity of an inventory item.

### `handleSearch`
- **Parameters**: `e` (object) - Event object for the search input.
- **Description**: Filters the inventory list based on the search query.

### `handleRestockAll`
- **Description**: Sends POST requests to restock all low-stock items.

### `handleInputChange`
- **Parameters**: 
  - `e` (object) - Event object for the restock input.
  - `itemName` (string) - The name of the item to update the restock amount for.
- **Description**: Updates the `restockAmounts` state with the new restock quantity.

---

## API Endpoints

- **`GET /manager/inventory`**: Fetches the list of inventory items.
- **`POST /manager/inventory/restock`**: Restocks a specific item.
- **`POST /manager/inventory/remove`**: Removes stock from a specific item.
- **`POST /manager/inventory/restock/low`**: Restocks all low-stock items.

---

## Usage Example

```javascript
import React from 'react';
import Inventory from './Inventory';

function App() {
  return (
    <div>
      <Inventory />
    </div>
  );
}

export default App;
