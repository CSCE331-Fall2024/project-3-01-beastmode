# File: OrderSelection.js

## Description
The `OrderSelection` component manages the selection of sides and entrees for a menu item. Users can customize their order by choosing the required number of sides and entrees, with the option to add their selection to the cart.

---

## Key Features

### 1. **Dynamic Grid for Selection**
- Displays a grid for selecting sides and entrees based on the numbers (`numSides`, `numEntrees`) passed via React Router's `location.state`.

### 2. **Customizable Selection**
- Allows users to dynamically select sides or entrees.
- Highlights the currently active selection for better user experience.

### 3. **Add to Cart Functionality**
- Checks if all required selections are completed before enabling the "Add to Cart" button.
- Integrates with the `CartContext` to add selected items to the cart.

### 4. **Side and Entree Selection Components**
- Uses separate components (`SideSelection` and `EntreeSelection`) to allow detailed selection of items.

### 5. **Responsive Navigation**
- After adding items to the cart, users are redirected back to the main order page.

---

## Key Components

### 1. **`SelectionGrid`**
- A reusable grid layout to manage and display selected items for sides and entrees.
- Handles user input to select specific slots for customization.

### 2. **`SideSelection` and `EntreeSelection`**
- Modular components for browsing and selecting side and entree options.

### 3. **"Add to Cart" Button**
- Displays only when the user has made all required selections.
- Adds the selected item, including components, to the cart with quantities tracked.

---

## Code Breakdown

### 1. Imports
- React, `useContext`, `useEffect` for state management.
- Components for navigation (`NavBar`), grid display (`SelectionGrid`), and selection panels (`SideSelection`, `EntreeSelection`).
- `CartContext` for managing cart-related state.

### 2. State Management
The component uses state hooks to manage:
- Selected section (`selectedSection`): Tracks whether the user is selecting a side or entree.
- Selected sides and entrees (`selectedSides`, `selectedEntrees`): Tracks the user's choices.
- Context for the cart (`cartItems`, `setCartItems`).

```javascript
const [selectedSection, setSelectedSection] = useState(null);
const [selectedSides, setSelectedSides] = useState([]);
const [selectedEntrees, setSelectedEntrees] = useState([]);
const { cartItems, setCartItems } = useContext(CartContext);
