# Documentation: `MenuBoardSide.js`

## Overview

The `MenuBoardSide` component is a React functional component designed to display details about a side menu item. It shows the item's name, image, calorie count, and any applicable icons.

---

## Component: `MenuBoardSide`

### Props

- **`name`**  
  - **Type**: `string`  
  - **Description**: The name of the side menu item.

- **`image`**  
  - **Type**: `JSX.Element`  
  - **Description**: An image element representing the side item.

- **`calories`**  
  - **Type**: `string`  
  - **Description**: The calorie count of the side menu item.

- **`icons`**  
  - **Type**: `JSX.Element`  
  - **Description**: Optional icons or badges associated with the side item (e.g., allergens, dietary preferences).

---

## Features

1. **Side Item Details**
   - Displays the name and calorie count prominently.

2. **Image and Icon Display**
   - Includes space for the side item image and associated icons, such as badges for dietary or allergen information.

3. **Responsive Layout**
   - Organizes details and visuals into a clean, responsive layout.

---

## Usage Example

```javascript
import React from 'react';
import MenuBoardSide from './MenuBoardSide';

const App = () => {
    return (
        <MenuBoardSide
            name="French Fries"
            image={<img src="fries.png" alt="French Fries" />}
            calories="300 cal"
            icons={<span>🌱</span>}
        />
    );
};

export default App;
