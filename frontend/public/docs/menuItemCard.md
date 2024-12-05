# MenuItemCard Documentation

## Overview

The `MenuItemCard` component is a reusable React component that represents a menu item in a kiosk-style application. It supports features such as premium and seasonal indicators, availability status, and additional information access. The component is interactive and can trigger actions like displaying detailed information or selecting an item.

---

## Component Structure

The `MenuItemCard` is built using React functional components. It leverages props to handle dynamic content such as item names, images, and states like availability or premium status.

---

## Props

### Required Props

| Prop         | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| `name`       | `string` | The name of the menu item to display.            |
| `image`      | `string` | URL of the image for the menu item.              |

### Optional Props

| Prop           | Type      | Default Value       | Description                                                                                 |
|----------------|-----------|---------------------|---------------------------------------------------------------------------------------------|
| `description`  | `string`  | `undefined`         | A brief description of the menu item.                                                      |
| `isPremium`    | `boolean` | `false`             | Indicates if the item is a premium item. Displays a "P" banner when `true`.                 |
| `isSeasonal`   | `boolean` | `false`             | Indicates if the item is seasonal. Displays an "S" banner when `true`.                     |
| `onInfoClick`  | `function`| `undefined`         | Callback function triggered when the info button is clicked.                               |
| `onClick`      | `function`| `undefined`         | Callback function triggered when the card is clicked, provided the item is available.       |
| `showInfoButton`| `boolean`| `true`              | Determines whether the info button is displayed on the card.                                |
| `isAvailable`  | `boolean` | `true`              | Indicates if the item is available. If `false`, disables interactivity and shows an overlay.|
| `price`        | `number`  | `undefined`         | The price of the item, used for display on the card.                                        |
| `priceType`    | `string`  | `'Premium Addition'`| Determines how the price is displayed (`'Base Price'` or `'Premium Addition'`).             |

---

## Styling

The component uses the following classes for styling:

| Class Name          | Description                                      |
|---------------------|--------------------------------------------------|
| `card`              | Main container for the menu item.                |
| `unavailable-overlay`| Overlay displayed when the item is unavailable. |
| `unavailable-text`  | Text displayed in the overlay.                   |
| `banners-container` | Container for premium and seasonal banners.      |
| `premium-banner`    | Banner indicating the item is premium.           |
| `seasonal-banner`   | Banner indicating the item is seasonal.          |
| `info-button`       | Button for accessing additional information.     |
| `card-img-top`      | Styles the item's image.                         |
| `card-body`         | Container for the item's details.                |
| `card-text`         | Styles the item's name text.                     |
| `card-description`  | Styles the item's description text.              |
| `price-container`   | Container for displaying the item's price.       |

---

## Example Usage

```javascript
import MenuItemCard from './MenuItemCard';

function Menu() {
  const handleItemClick = () => {
    console.log('Item clicked!');
  };

  const handleInfoClick = () => {
    console.log('Info clicked!');
  };

  return (
    <MenuItemCard
      name="Deluxe Burger"
      image="/images/deluxe-burger.jpg"
      description="A premium burger with all the fixings"
      isPremium={true}
      isSeasonal={false}
      onInfoClick={handleInfoClick}
      onClick={handleItemClick}
      isAvailable={true}
      price={5.99}
      priceType="Base Price"
    />
  );
}
