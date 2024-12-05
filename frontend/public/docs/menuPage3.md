# Documentation: `MenuMain3.js`

## Overview

`MenuMain3` is a React component that displays drinks, appetizers, and seasonal items for a restaurant menu. It dynamically fetches data from API endpoints and adapts the layout based on the number of appetizers retrieved. If the number of appetizers exceeds 6, a carousel layout is used for the appetizers section.

---

## Component: `MenuMain3`

### Description

`MenuMain3` provides a detailed menu interface for drinks, appetizers, and seasonal advertisements. It supports dynamic data fetching, flexible layout rendering, and formatted item presentation.

---

## Features

1. **Dynamic Data Fetching**
   - Retrieves data for drinks, appetizers/desserts, and all menu items from their respective API endpoints.
   - Manages loading and error states for better user experience.

2. **Dynamic Layout**
   - Uses a static layout when there are fewer than 6 appetizers.
   - Implements a carousel layout (using `react-slick`) for more than 6 appetizers.

3. **Visual Representation**
   - Displays images and descriptions for menu items and seasonal advertisements.

4. **Interactive Components**
   - Uses `MenuBoardAppetizer` and `MenuBoardDrinks` components for presenting menu items dynamically.

---

## State Variables

### `appdess`
- **Type**: `Array`
- **Description**: Stores data for appetizers and desserts fetched from the API.

### `drinks`
- **Type**: `Array`
- **Description**: Stores data for drinks fetched from the API.

### `menuItems`
- **Type**: `Array`
- **Description**: Stores general menu data for pricing and other shared attributes.

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

### Endpoints
1. **`/menu/appdessert`**: Fetches appetizers and desserts.  
2. **`/menu/drink`**: Fetches drink data.  
3. **`/menu/allitems`**: Fetches general menu item data.

### Error Handling
- Displays a user-friendly error message (`Failed to fetch menu items. Please try again later.`) when API calls fail.
- Logs errors to the console for debugging.

---

## Child Components

1. **`MenuBoardAppetizer`**
   - Displays details for appetizers, including:
     - Name
     - Small and large prices
     - Premium and seasonal tags
     - Image

2. **`MenuBoardDrinks`**
   - Displays details for drinks, including:
     - Name
     - Price

---

## Rendering

### Loading State
Displays a `Loading...` message while data is being fetched.

### Error State
Displays the error message stored in the `error` state.

### Static Layout
- **Condition**: When there are fewer than 6 appetizers.
- **Structure**:
  - Divided into columns for drinks, appetizers, and seasonal items.
  - Uses `MenuBoardAppetizer` and `MenuBoardDrinks` components for rendering items.

### Carousel Layout
- **Condition**: When there are 6 or more appetizers.
- **Structure**:
  - Implements a carousel for the appetizers section using `react-slick`.
  - Displays seasonal advertisements and drinks in static layouts.

---

## Carousel Settings

```javascript
var settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
};
