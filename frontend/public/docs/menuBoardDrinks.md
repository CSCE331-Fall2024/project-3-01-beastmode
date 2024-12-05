# Documentation: `MenuBoardDrinks.js`

## Overview

The `MenuBoardDrinks` component is a React functional component designed to display individual drink items in a restaurant menu system. Each drink item includes its name and price.

---

## Component: `MenuBoardDrinks`

### Props

- **`name`**  
  - **Type**: `string`  
  - **Description**: The name of the drink item.

- **`price`**  
  - **Type**: `string`  
  - **Description**: The price of the drink item.

---

## Features

1. **Drink Name Display**
   - Renders the name of the drink as the card title.

2. **Price Display**
   - Displays the price of the drink prominently beside the name.

3. **Responsive Layout**
   - Uses a row layout to organize the name and price into separate columns for better readability.

---

## Usage Example

```javascript
import React from 'react';
import MenuBoardDrinks from './MenuBoardDrinks';

const App = () => {
    return (
        <MenuBoardDrinks
            name="Pepsi"
            price="$1.99"
        />
    );
};

export default App;
