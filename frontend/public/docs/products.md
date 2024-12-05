# Documentation: `Products.js`

## Overview

The `Products` component allows users to manage products in the system, including viewing, searching, editing, activating, and deleting product records. It also includes functionality for adding new products via a modal form.

---

## Features

1. **Product List**
   - Displays a list of all products.
   - Allows users to click a product card to view and edit product details.

2. **Search Functionality**
   - Users can search for products by name using a search bar.

3. **Add/Edit Modal**
   - A modal form lets users add new products or edit existing products.
   - Fields include product attributes such as name, type, calories, and availability.

4. **Product Activation and Deletion**
   - Products can be activated if they are marked as not in season.
   - Products can also be deleted from the system.

---

## Component State

### `products`
- **Type**: `Array`
- **Description**: Stores the list of products fetched from the backend.

### `loading`
- **Type**: `Boolean`
- **Description**: Indicates whether data is currently being fetched.

### `searchTerm`
- **Type**: `String`
- **Description**: Stores the user input for the search bar.

### `newProduct`
- **Type**: `Object` or `null`
- **Description**: Stores the data for the product being edited or added.

---

## Functions

### `fetchProducts`
- **Description**: Fetches the list of products from the backend API and sets the `products` state.

### `handleSearch`
- **Parameters**: `e` (Event)
- **Description**: Filters the displayed products based on the search term. Resets to the full list when the search term is cleared.

### `deleteProduct`
- **Parameters**: `id` (Product ID)
- **Description**: Sends a request to delete a product and reloads the page on success.

### `activateProduct`
- **Parameters**: `id` (Product ID)
- **Description**: Sends a request to activate a product and reloads the page on success.

### `handleInputChange`
- **Parameters**: `e` (Event), `field` (String)
- **Description**: Updates the `newProduct` state as the user types into the form fields.

### `handleCardClick`
- **Parameters**: `product` (Object)
- **Description**: Opens the modal form with the product data pre-filled or blank for a new product.

### `saveModal`
- **Parameters**: `e` (Event)
- **Description**: Saves the product data to the backend and reloads the page on success.

### `closeModal`
- **Description**: Closes the modal form and resets `newProduct`.

---

## API Endpoints

- **`GET /manager/products`**: Retrieves the list of products.
- **`POST /manager/products/update`**: Updates or adds a product.
- **`POST /manager/products/delete`**: Deletes a product.
- **`POST /manager/products/activate`**: Activates a product.

---

## Styling

### CSS Classes

- **`page`**: Styles the main container for the page.
- **`page-background`**: Styles the background for the page content.
- **`inventory-card`**: Styles individual product cards.
- **`hover-view`**: Adds hover text to the product cards.
- **`modal-overlay`**: Styles the modal background.
- **`modal-content`**: Styles the modal form container.
- **`form-product`**: Styles the product form inside the modal.

---

## Usage Example

```javascript
import React from 'react';
import Products from './Products';

function App() {
  return (
    <div>
      <Products />
    </div>
  );
}

export default App;
