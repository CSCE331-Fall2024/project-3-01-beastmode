# File: KioskMain.js

## Description
The `KioskMain` component serves as the central menu page for the kiosk application. It dynamically displays menu items retrieved from an API and allows users to navigate to specific ordering routes for each item.

---

## Key Features

### 1. **Dynamic Menu Fetching**
   - **API Integration**: Fetches menu items from `/kiosk/menu` endpoint.
   - **Error Handling**: Displays an error message if fetching fails.
   - **Loading State**: Shows a loading indicator while data is being retrieved.

### 2. **Menu Item Display**
   - **Grid Layout**: Displays items in a responsive grid using Bootstrap classes.
   - **Item Cards**: Each menu item is represented by a `MenuItemCard` component with:
     - Name
     - Image
     - Description
     - Base Price

### 3. **Navigation**
   - **Dynamic Routing**: Routes to appropriate ordering pages based on the selected item type.
   - **Route Mapping**:
     - Drinks → `/kiosk/order/drink`
     - Appetizers & More → `/kiosk/order/appetizers-&-more`
     - A La Carte → `/kiosk/order/a-la-carte`
     - Custom Items → Passes item-specific data via `state`.

---

## Code Overview

### Imports
- React and hooks (`useState`, `useEffect`) for state management and side effects.
- `useNavigate` from `react-router-dom` for navigation.
- `NavBar` and `MenuItemCard` for reusable UI components.
- API service for fetching menu items.

### State Variables
- **`menuItems`**: Stores the list of fetched menu items.
- **`loading`**: Boolean indicating if data is still being fetched.
- **`error`**: Stores error messages if fetching fails.

### Formatting Functions
- **`formatItemName`**: Converts raw item names into a user-friendly, formatted string.

### Event Handlers
- **`handleItemClick`**: Determines the navigation path and state data based on the selected item.

---

## Key Functions

### 1. `useEffect` for Data Fetching
```javascript
useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/kiosk/menu'); 
      setMenuItems(response.data);
    } catch (err) {
      setError('Failed to fetch menu items. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchMenuItems();
}, []);
