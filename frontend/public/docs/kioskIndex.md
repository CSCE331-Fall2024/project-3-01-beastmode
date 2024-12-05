# File Overview: Exports for Kiosk Components

This file consolidates and organizes exports for all main components in the Kiosk system. These components can be imported elsewhere in the application using this file as a single source of truth.

---

## Exports

### 1. **KioskMain**
   - **Path**: `./KioskMain`
   - **Description**: The main entry point for the kiosk module. Handles the overall layout and navigation between submodules.

### 2. **KioskLanding**
   - **Path**: `./KioskLanding`
   - **Description**: The landing page for the kiosk, providing an overview and entry point for ordering and browsing.

### 3. **OrderSelection**
   - **Path**: `./OrderSelection`
   - **Description**: Manages the selection process for orders, offering categorized menus for the user to explore.

### 4. **DrinkSelection**
   - **Path**: `./DrinkSelection`
   - **Description**: Dedicated to browsing and selecting drinks. Includes functionality for size selection and nutritional information display.

### 5. **AppsAndMoreSelection**
   - **Path**: `./Apps&MoreSelection`
   - **Description**: Displays appetizers and desserts. Includes functionality for adding items to the cart and managing sizes.

### 6. **AlaCarteSelection**
   - **Path**: `./AlaCarteSelection`
   - **Description**: Handles selection of standalone items such as sides and entrees, with options for customizing sizes.

---

## Usage

Import multiple components in a single statement using this consolidated export file:

```javascript
import {
  KioskMain,
  KioskLanding,
  OrderSelection,
  DrinkSelection,
  AppsAndMoreSelection,
  AlaCarteSelection,
} from './components';
