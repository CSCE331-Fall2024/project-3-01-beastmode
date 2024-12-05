# Documentation: `Employees.js`

## Overview

The `Employees` component is a React functional component designed to manage employee information in a restaurant system. It allows managers to view, add, edit, and delete employees. It includes search functionality and dynamic updates to the displayed data.

---

## Features

1. **Employee Management**
   - View a list of employees with details such as ID, name, email, and role.
   - Add new employees.
   - Edit existing employee details.
   - Remove (fire) employees.

2. **Search Functionality**
   - Search employees by name, dynamically updating the displayed list.

3. **Dynamic Validation**
   - Validates input fields when adding or editing employees.
   - Highlights invalid inputs and provides user-friendly error messages.

4. **Popup Modals**
   - Displays modals for adding and editing employees, improving user experience.

5. **API Integration**
   - Fetches employee data from the backend.
   - Updates the database for add, edit, and delete operations.

6. **Styling**
   - Fully styled with CSS to match the application theme.

---

## Component State

### `employeeData`
- **Type**: `Ref`
- **Description**: Stores the full list of employee data fetched from the API.

### `employeeDisplay`
- **Type**: `Array`
- **Description**: Stores the list of employees currently displayed (filtered by search).

### `search`
- **Type**: `String`
- **Description**: Stores the current search input value.

### `popup`
- **Type**: `Object`
- **Description**: Tracks the visibility of add/edit employee modals.
  - **`editEmployee`**: `boolean`
  - **`addEmployee`**: `boolean`

### `newEmployee`
- **Type**: `Object`
- **Description**: Stores data for the new or edited employee.
  - **Properties**: `email`, `first_name`, `last_name`, `password`, `role`

### `newEmployeeError`
- **Type**: `Object`
- **Description**: Tracks validation errors for employee input fields.

### `submitClass`
- **Type**: `Object`
- **Description**: Stores CSS classes for submit button and loader.

---

## Functions

### `fetchEmployees`
- **Description**: Fetches the list of employees from the API and updates the state.

### `fireEmployee`
- **Parameters**: `id` (string) - Employee ID to be removed.
- **Description**: Sends a POST request to remove an employee and updates the displayed list.

### `searchEmployee`
- **Parameters**: `event` (object) - Form submission event.
- **Description**: Filters the displayed list of employees based on the search query.

### `handleAddEmployeeInput`
- **Parameters**: `name` (string), `value` (string) - Input field name and value.
- **Description**: Updates the `newEmployee` state with the input values.

### `addEmployee`
- **Description**: Validates and submits a new employee to the database.

### `validateEmployeeInput`
- **Parameters**: `event` (object) - Form submission event.
- **Description**: Validates the input fields before adding a new employee.

### `editEmployee`
- **Description**: Updates an existing employee in the database.

### `validateEmployeeChanges`
- **Parameters**: `event` (object) - Form submission event.
- **Description**: Validates input fields before editing an employee.

### `closePopUp`
- **Description**: Closes the add/edit employee modal and resets the form.

### `openAddEmployee`
- **Description**: Opens the modal for adding a new employee.

### `openEditEmployee`
- **Parameters**: `id` (string) - Employee ID to be edited.
- **Description**: Opens the modal for editing an existing employee and pre-fills the form with current values.

---

## Props

This component does not accept props. It relies on internal state and API calls for data.

---

## Usage Example

```javascript
import React from 'react';
import Employees from './Employees';

function App() {
  return (
    <div>
      <Employees />
    </div>
  );
}

export default App;
