# Documentation: `MenuMain2.js`

## Overview

The `MenuMain2` component renders a detailed list or carousel of entree items from a restaurant menu. The component dynamically fetches entree data from an API and displays it with support for up to 30 entrees. If the entree list exceeds 15 items, it displays the items in a carousel; otherwise, it presents them in a static layout.

---

## Component: `MenuMain2`

### Description

`MenuMain2` is responsible for displaying entree items with relevant details, such as the product name, image, calories, and tags for premium or seasonal items. The presentation dynamically adapts based on the number of entrees fetched.

---

## Features

1. **Dynamic Data Fetching**
   - Fetches entree data from the `/menu/entrees` API endpoint.
   - Displays loading and error states for a better user experience.

2. **Dynamic Layout**
   - Displays a static grid layout for 15 or fewer entrees.
   - Uses a carousel (via `react-slick`) to display more than 15 entrees.

3. **Flexible Data Formatting**
   - Formats product names for better readability using a utility function.

4. **Interactive Design**
   - Renders detailed information about each entree using the `MenuBoardEntree` component.

---

## State Variables

### `entrees`
- **Type**: `Array`
- **Description**: Stores the list of entree items fetched from the API.

### `loading`
- **Type**: `Boolean`
- **Default**: `true`
- **Description**: Tracks whether the data is still being fetched.

### `error`
- **Type**: `String | null`
- **Default**: `null`
- **Description**: Stores an error message if the API call fails.

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

## API Integration

### Endpoint
- **`/menu/entrees`**
  - Fetches a list of entree items.

### Error Handling
- Displays a user-friendly error message (`Failed to fetch menu items. Please try again later.`) when API calls fail.
- Logs errors to the console for debugging.

---

## Child Components

### `MenuBoardEntree`
- **Description**: Displays details of a single entree, including:
  - Name
  - Image
  - Calories
  - Premium and seasonal tags

---

## Rendering

### Loading State
Displays a `Loading...` message while data is being fetched.

### Error State
Displays the error message stored in the `error` state.

### Static Layout
- **Condition**: When there are 15 or fewer entrees.
- **Structure**:
  - Divided into rows and columns.
  - Uses the `MenuBoardEntree` component for each entree.

### Carousel Layout
- **Condition**: When there are more than 15 entrees.
- **Structure**:
  - Divided into slides using `react-slick`.
  - Displays 5 entrees per slide.

---

## Carousel Settings

```javascript
var settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
};
