# ConfirmDialog Component Documentation

The `ConfirmDialog` component provides a modal dialog for user confirmation when performing an action, such as removing an item from the cart. It displays a customizable message and offers "Confirm" and "Cancel" options.

---

## Component Overview

### Location
`src/components/kiosk/ConfirmDialog.js`

### Purpose
To prompt the user for confirmation before executing a potentially irreversible action, such as removing an item.

---

## Props

### `message`
- **Type**: `String`
- **Required**: Yes
- **Description**: The message displayed in the dialog. Typically used to explain the action the user is confirming.

### `onConfirm`
- **Type**: `Function`
- **Required**: Yes
- **Description**: Callback function triggered when the user clicks the "Yes, remove item" button. Used to handle the confirmed action.

### `onCancel`
- **Type**: `Function`
- **Required**: Yes
- **Description**: Callback function triggered when the user clicks the "No, go back" button. Used to cancel the action and close the dialog.

---

## Styling

### CSS Classes
- **`confirm-dialog-overlay`**: Styles the semi-transparent overlay that appears behind the dialog.
- **`confirm-dialog`**: Styles the main dialog box.
- **`confirm-dialog-message`**: Styles the message text displayed in the dialog.
- **`confirm-dialog-buttons`**: Styles the container for the dialog buttons.
- **`confirm-button`**: Styles the "Confirm" button.
- **`cancel-button`**: Styles the "Cancel" button.

### CSS File
`src/styles/kiosk/confirmDialog.css`

---

## Features

1. **Modal Dialog**:
   - Displays a modal overlay with a message and two action buttons.

2. **Customizable Behavior**:
   - Supports user-defined behavior for confirmation and cancellation through `onConfirm` and `onCancel` props.

3. **Clean Design**:
   - Simple and intuitive design ensures a user-friendly experience.

---

## Usage

### Importing

```javascript
import ConfirmDialog from './components/kiosk/ConfirmDialog';
