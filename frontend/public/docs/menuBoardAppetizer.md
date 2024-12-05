# Documentation: `MenuBoardAppetizer.js`

## Overview

The `MenuBoardAppetizer` component is a React functional component that renders information about an appetizer item, including its name, prices, image, and applicable tags (premium or seasonal). It is designed for use in a restaurant menu system.

---

## Component: `MenuBoardAppetizer`

### Props

- **`name`**  
  - **Type**: `string`  
  - **Description**: The name of the appetizer item.

- **`image`**  
  - **Type**: `JSX.Element`  
  - **Description**: An image element representing the appetizer item.

- **`smPrice`**  
  - **Type**: `string`  
  - **Description**: The price of the small size of the appetizer.

- **`lgPrice`**  
  - **Type**: `string`  
  - **Description**: The price of the large size of the appetizer.

- **`isPremium`**  
  - **Type**: `boolean`  
  - **Description**: Indicates whether the appetizer is premium.

- **`isSeasonal`**  
  - **Type**: `boolean`  
  - **Description**: Indicates whether the appetizer is seasonal.

---

## Features

1. **Appetizer Name Display**
   - Renders the name of the appetizer as the card title.

2. **Premium and Seasonal Tags**
   - Displays a "P" banner for premium items.
   - Displays an "S" banner for seasonal items.
   - Banners are shown only if the respective flags (`isPremium` or `isSeasonal`) are `true`.

3. **Price Table**
   - Displays prices for small and large sizes of the appetizer in a tabular format.

4. **Image Rendering**
   - Displays the image of the appetizer in the card layout.

---

## Usage Example

```javascript
import React from 'react';
import MenuBoardAppetizer from './MenuBoardAppetizer';

const App = () => {
    return (
        <MenuBoardAppetizer
            name="Spring Rolls"
            image={<img src="spring_rolls.png" alt="Spring Rolls" />}
            smPrice="$5.99"
            lgPrice="$9.99"
            isPremium={true}
            isSeasonal={false}
        />
    );
};

export default App;
