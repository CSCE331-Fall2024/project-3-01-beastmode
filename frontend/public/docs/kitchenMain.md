# Documentation: `KitchenMain.js`

## Overview

The `KitchenMain` component is a React functional component designed to manage and display kitchen orders in a restaurant. It allows the kitchen staff to view pending orders, track their elapsed time, mark orders as ready, and delete orders.

---

## Features

1. **Order Display**
   - Displays a list of pending orders with their respective order ID, order time, and elapsed time.
   - Highlights orders based on the time elapsed since the order was placed, with colors transitioning from green (fresh) to red (delayed).

2. **Mark Orders as Ready**
   - Provides a button to mark an order as ready for completion.
   - Upon marking an order as ready, it is removed from the list of pending orders.

3. **Delete Orders**
   - Allows users to delete an order from the system via a delete confirmation modal.
   - Orders are immediately removed after confirmation.

4. **Automatic Data Fetching**
   - Fetches the latest orders from the server at regular intervals (every 5 seconds).
   - Automatically updates the UI to reflect the latest data.

5. **Time Tracking**
   - Displays the elapsed time for each order, showing minutes and seconds.
   - Orders are updated in real-time every second to reflect the correct elapsed time.

---

## Component State

### `orders`
- **Type**: `Array`
- **Description**: Stores the list of orders fetched from the API, each containing order details such as order ID, order date/time, and menu items.

### `showDeleteModal`
- **Type**: `Boolean`
- **Description**: Controls whether the delete confirmation modal is displayed.

### `selectedOrderId`
- **Type**: `String` or `null`
- **Description**: Stores the ID of the order that is selected for deletion.

---

## Functions

### `fetchOrders`
- **Description**: Fetches the list of pending orders from the `/kitchen/orders` API endpoint and updates the `orders` state.

### `formatName`
- **Parameters**: `name` (string) - The name of a menu item.
- **Description**: Formats the item name by adding spaces between camel-case words and capitalizing the first letter.

### `calculateElapsedTime`
- **Parameters**: `orderTime` (string) - The timestamp when the order was created.
- **Description**: Calculates and returns the elapsed time since the order was placed, in minutes and seconds.

### `getOrderCardColor`
- **Parameters**: `totalElapsedSeconds` (number) - The total number of seconds elapsed since the order was placed.
- **Description**: Returns a dynamic color (from green to red) based on the order's elapsed time, helping staff easily identify delayed orders.

### `markOrderReady`
- **Parameters**: `orderId` (string) - The ID of the order to be marked as ready.
- **Description**: Sends a POST request to mark the order as ready. The order is removed from the list and the latest orders are fetched.

### `handleDeleteClick`
- **Parameters**: `orderId` (string) - The ID of the order to delete.
- **Description**: Sets the `selectedOrderId` and displays the delete confirmation modal.

### `handleConfirmDelete`
- **Description**: Sends a DELETE request to remove the order from the system. The order is removed from the state upon successful deletion.

### `handleCancelDelete`
- **Description**: Closes the delete confirmation modal without making any changes.

---

## API Endpoints

- **`GET /kitchen/orders`**: Fetches the list of pending orders.
- **`POST /kitchen/orders/{orderId}/ready`**: Marks an order as ready.
- **`DELETE /kitchen/orders/{orderId}`**: Deletes an order.

---

## Usage Example

```javascript
import React from 'react';
import KitchenMain from './KitchenMain';

function App() {
  return (
    <div>
      <KitchenMain />
    </div>
  );
}

export default App;
