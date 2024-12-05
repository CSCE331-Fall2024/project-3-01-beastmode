# SideSelection Component Documentation

## Overview

The `SideSelection` component is a React component designed to display and allow selection of sides from a menu. It fetches data dynamically from a backend API and displays an interactive list of menu items with detailed information pop-ups.

---

## Key Features

- **Dynamic Data Fetching**:
  Fetches side menu items from a backend API endpoint (`/kiosk/sides`) on component mount.

- **Interactive UI**:
  Users can select sides, view additional information about each item, and interact with a clean, responsive layout.

- **Info Pop-Up**:
  Displays a detailed information card for each side, including nutritional facts and allergens.

---

## Props

| Prop Name       | Type       | Required | Description                                  |
|------------------|------------|----------|----------------------------------------------|
| `onItemSelect`   | `function` | Yes      | Callback function triggered on item selection. |

---

## States

1. **`sides`**:
   - Type: `Array`
   - Description: Holds the list of sides fetched from the API.

2. **`loading`**:
   - Type: `Boolean`
   - Description: Indicates if the data is still being fetched.

3. **`error`**:
   - Type: `String` or `null`
   - Description: Holds any error messages encountered during the fetch.

4. **`selectedInfo`**:
   - Type: `Object` or `null`
   - Description: Stores the selected side item for displaying additional information.

---

## Core Functions

1. **`fetchSides`**:
   - Fetches the list of sides from the API.
   - Handles loading and error states.

2. **`handleSideSelect(side)`**:
   - Triggers the `onItemSelect` prop callback when a side is selected.

3. **`handleInfoClick(side)`**:
   - Sets the `selectedInfo` state to display detailed information about the clicked side.

4. **`handleCloseInfo()`**:
   - Clears the `selectedInfo` state to close the info pop-up.

---

## Component Workflow

1. **Initialization**:
   - The `useEffect` hook fetches sides from the API on component mount.

2. **Rendering**:
   - Displays side items in a grid format using the `MenuItemCard` component.
   - If a side is clicked, it triggers the `handleSideSelect` function.
   - If the info button is clicked, it opens an `InfoCard` with detailed information.

3. **Error Handling**:
   - If the API fetch fails, displays an error message.

4. **Loading State**:
   - Displays a loading message until the data is successfully fetched.

---

## Example Usage

```javascript
import React, { useState } from 'react';
import SideSelection from './SideSelection';

const App = () => {
  const [selectedSide, setSelectedSide] = useState(null);

  const handleSideSelection = (side) => {
    console.log('Selected Side:', side);
    setSelectedSide(side);
  };

  return (
    <div>
      <h1>Menu</h1>
      <SideSelection onItemSelect={handleSideSelection} />
      {selectedSide && (
        <div>
          <h2>Selected Side:</h2>
          <p>{selectedSide.product_name}</p>
        </div>
      )}
    </div>
  );
};

export default App;
