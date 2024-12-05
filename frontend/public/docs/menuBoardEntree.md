# Documentation: `MenuBoardEntree.js`

## Overview

The `MenuBoardEntree` component is a React functional component that displays information about an entree item, including its name, image, calorie count, and tags for premium or seasonal items. It is designed for use in a restaurant menu system.

---

## Component: `MenuBoardEntree`

### Props

- **`name`**  
  - **Type**: `string`  
  - **Description**: The name of the entree item.

- **`image`**  
  - **Type**: `JSX.Element`  
  - **Description**: An image element representing the entree item.

- **`calories`**  
  - **Type**: `string`  
  - **Description**: The calorie count of the entree.

- **`isPremium`**  
  - **Type**: `boolean`  
  - **Description**: Indicates whether the entree is premium.

- **`isSeasonal`**  
  - **Type**: `boolean`  
  - **Description**: Indicates whether the entree is seasonal.

---

## Features

1. **Entree Name and Calories**
   - Displays the name and calorie count of the entree prominently.

2. **Premium and Seasonal Tags**
   - Shows a "P" banner for premium items.
   - Shows an "S" banner for seasonal items.
   - Banners are conditionally displayed based on the `isPremium` and `isSeasonal` props.

3. **Image Rendering**
   - Displays the image of the entree in the layout.

4. **Responsive Design**
   - Organizes the entree details and image in a structured, visually appealing layout.

---

## Usage Example

```javascript
import React from 'react';
import MenuBoardEntree from './MenuBoardEntree';

const App = () => {
    return (
        <MenuBoardEntree
            name="Grilled Chicken"
            image={<img src="grilled_chicken.png" alt="Grilled Chicken" />}
            calories="250 cal"
            isPremium={true}
            isSeasonal={false}
        />
    );
};

export default App;
