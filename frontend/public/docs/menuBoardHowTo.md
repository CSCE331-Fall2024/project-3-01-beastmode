# Documentation: `MenuBoardHowTo.js`

## Overview

The `MenuBoardHowTo` component is a React functional component that displays detailed information about a menu item, including its name, image, description, calorie count, and starting price. It is designed for use in a restaurant menu system to highlight key menu items.

---

## Component: `MenuBoardHowTo`

### Props

- **`name`**  
  - **Type**: `string`  
  - **Description**: The name of the menu item.

- **`image`**  
  - **Type**: `JSX.Element`  
  - **Description**: An image element representing the menu item.

- **`calories`**  
  - **Type**: `string`  
  - **Description**: The calorie count of the menu item.

- **`description`**  
  - **Type**: `string`  
  - **Description**: A brief description of the menu item.

- **`price`**  
  - **Type**: `string`  
  - **Description**: The starting price of the menu item.

---

## Features

1. **Menu Item Details**
   - Displays the name, description, and calorie count of the menu item prominently.

2. **Starting Price Display**
   - Highlights the starting price with a "starts at" label.

3. **Image Rendering**
   - Shows an image of the menu item alongside its details.

4. **Responsive Layout**
   - Organizes information in a structured layout with clear sections for the image, details, and price.

---

## Usage Example

```javascript
import React from 'react';
import MenuBoardHowTo from './MenuBoardHowTo';

const App = () => {
    return (
        <MenuBoardHowTo
            name="Classic Burger"
            image={<img src="classic_burger.png" alt="Classic Burger" />}
            calories="500 cal"
            description="A delicious classic burger with fresh ingredients."
            price="$8.99"
        />
    );
};

export default App;
