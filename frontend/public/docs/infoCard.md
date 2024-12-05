# `InfoCard` Component Documentation

The `InfoCard` component is a reusable modal that displays detailed information about a selected item, such as an entrée or menu item, in a kiosk application.

---

## Component Overview

### File Location
`src/components/kiosk/InfoCard.js`

### Purpose
To provide a detailed view of a selected item, including its description, nutritional information, allergens, and more.

---

## Props

### `title`
- **Type**: `String`
- **Required**: Yes
- **Description**: The title or name of the item being displayed.

### `image`
- **Type**: `String` (URL)
- **Required**: Yes
- **Description**: The URL of the image representing the item.

### `description`
- **Type**: `String`
- **Required**: Yes
- **Description**: A brief description of the item.

### `allergens`
- **Type**: `String`
- **Required**: Yes
- **Description**: A list of allergens associated with the item. Defaults to "None."

### `servingSize`
- **Type**: `String` or `Number`
- **Required**: Yes
- **Description**: The serving size of the item.

### `calories`
- **Type**: `String` or `Number`
- **Required**: Yes
- **Description**: The calorie count of the item.

### `saturatedFat`
- **Type**: `String` or `Number`
- **Required**: Yes
- **Description**: The saturated fat content (in grams).

### `carbohydrate`
- **Type**: `String` or `Number`
- **Required**: Yes
- **Description**: The carbohydrate content (in grams).

### `protein`
- **Type**: `String` or `Number`
- **Required**: Yes
- **Description**: The protein content (in grams).

### `onClose`
- **Type**: `Function`
- **Required**: Yes
- **Description**: A callback function triggered when the close button is clicked.

---

## Styling

### Inline Styles
- **`popupStyles`**:
  - Sets the backdrop of the modal, including positioning, size, and semi-transparent background.

- **`popupContentStyles`**:
  - Styles the modal content container with a white background, rounded corners, and centralized alignment.

- **`closeButtonStyles`**:
  - Styles the close button with padding, color, and cursor styling for user interaction.

- **`imageStyles`**:
  - Ensures the image is responsive, fitting within the modal's width constraints.

---

## Example Usage

### Basic Usage
```javascript
import React, { useState } from 'react';
import InfoCard from './InfoCard';

const App = () => {
  const [showInfoCard, setShowInfoCard] = useState(false);

  const itemDetails = {
    title: "Grilled Chicken Bowl",
    image: "https://example.com/chicken-bowl.jpg",
    description: "A delicious grilled chicken bowl with fresh vegetables.",
    allergens: "None",
    servingSize: "1 Bowl",
    calories: 450,
    saturatedFat: 4,
    carbohydrate: 50,
    protein: 30,
  };

  return (
    <div>
      <button onClick={() => setShowInfoCard(true)}>Show Info</button>
      {showInfoCard && (
        <InfoCard
          title={itemDetails.title}
          image={itemDetails.image}
          description={itemDetails.description}
          allergens={itemDetails.allergens}
          servingSize={itemDetails.servingSize}
          calories={itemDetails.calories}
          saturatedFat={itemDetails.saturatedFat}
          carbohydrate={itemDetails.carbohydrate}
          protein={itemDetails.protein}
          onClose={() => setShowInfoCard(false)}
        />
      )}
    </div>
  );
};

export default App;
