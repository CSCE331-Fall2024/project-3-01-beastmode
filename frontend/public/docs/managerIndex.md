# Documentation: `index.js`

## Overview

This file acts as an entry point for exporting various components related to the manager's functionality in the application. By consolidating exports into a single file, it simplifies imports in other parts of the application.

---

## Exported Components

### 1. **`ManagerMain`**
- **Description**: The main dashboard for the manager's view.

### 2. **`XReports`**
- **Description**: Component responsible for displaying X Reports.

### 3. **`ZReports`**
- **Description**: Component responsible for displaying Z Reports.

### 4. **`PairReports`**
- **Description**: Component for viewing paired product reports.

### 5. **`RestockReports`**
- **Description**: Component for viewing restock reports.

### 6. **`SalesReports`**
- **Description**: Component for viewing sales reports.

### 7. **`Employees`**
- **Description**: Component for managing employee data, including adding, editing, and deleting employees.

### 8. **`Products`**
- **Description**: Component for managing product data.

### 9. **`Inventory`**
- **Description**: Component for viewing and managing inventory data.

### 10. **`ProductUsage`**
- **Description**: Component for analyzing product usage reports.

---

## Usage Example

This file allows for simplified imports in other parts of the application:

```javascript
import { ManagerMain, Employees, Products } from './components/manager';
