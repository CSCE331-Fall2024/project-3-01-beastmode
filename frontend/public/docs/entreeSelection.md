# `EntreeSelection` Component Documentation

The `EntreeSelection` component provides a user interface for selecting an entrée in a kiosk application. It retrieves a list of available entrées from the backend, displays them as cards, and allows users to view detailed information about each entrée or select an entrée.

---

## Component Overview

### File Location
`src/components/kiosk/EntreeSelection.js`

### Purpose
To display a list of entrée options and allow users to:
1. View detailed information about each entrée.
2. Select an entrée for their order.

---

## Props

### `onItemSelect`
- **Type**: `Function`
- **Required**: Yes
- **Description**: Callback function triggered when an entrée is selected. Receives two arguments:
  - `entree`: The selected entrée object.
  - `'entree'`: A string identifying the type of item selected.

---

## State Variables

### `entrees`
- **Type**: `Array`
- **Description**: Stores the list of entrée objects fetched from the backend.

### `loading`
- **Type**: `Boolean`
- **Description**: Indicates whether the data is still being fetched.

### `error`
- **Type**: `String` or `null`
- **Description**: Stores error messages if the data fetch fails.

### `selectedInfo`
- **Type**: `Object` or `null`
- **Description**: Holds the details of the entrée currently being viewed in the `InfoCard`.

---

## Behavior

### Fetching Data
- **Endpoint**: `/kiosk/entrees`
- **Purpose**: Retrieves the list of entrées from the backend.
- **Error Handling**: Displays an error message if the fetch fails.

### User Interactions
1. **View Info**:
   - Clicking the info button on an entrée card opens a detailed `InfoCard` for that entrée.
   - The `InfoCard` displays additional details such as allergens, serving size, and nutritional information.

2. **Select Entree**:
   - Clicking the card (or a specific action button) selects the entrée.
   - Triggers the `onItemSelect` callback with the entrée object and type.

3. **Close InfoCard**:
   - Clicking the close button on the `InfoCard` hides it.

---

## Dependencies

### Components Used
- **`MenuItemCard`**:
  - Displays entrée details in a card format.
  - Props include:
    - `name`
    - `image`
    - `description`
    - `isPremium`
    - `isSeasonal`
    - `isAvailable`
    - `price`
    - `onInfoClick`
    - `onClick`

- **`InfoCard`**:
  - Displays detailed information about a selected entrée.
  - Props include:
    - `title`
    - `image`
    - `description`
    - `allergens`
    - `servingSize`
    - `calories`
    - `saturatedFat`
    - `carbohydrate`
    - `protein`
    - `onClose`

### Utilities
- **`api`**:
  - Axios instance for making HTTP requests to the backend.

---

## Styling

The component relies on external CSS for styling. Customize the styles in `src/styles/kiosk`.

---

## Example Usage

### Importing the Component
```javascript
import EntreeSelection from './components/kiosk/EntreeSelection';

function App() {
  const handleItemSelect = (item, type) => {
    console.log(`Selected ${type}:`, item);
  };

  return (
    <div>
      <EntreeSelection onItemSelect={handleItemSelect} />
    </div>
  );
}

export default App;
