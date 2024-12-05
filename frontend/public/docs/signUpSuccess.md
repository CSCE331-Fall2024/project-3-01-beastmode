# SignUpSuccess Component Documentation

The `SignUpSuccess` component serves as a confirmation page, informing users that their sign-up process was successful. It provides options for navigating to the login page or returning to the kiosk.

---

## Component Overview

### Location
`src/components/auth/SignUpSuccess.js`

### Purpose
To display a success message after a user successfully creates a new account and to provide navigation options for further actions.

---

## Key Features

1. **Confirmation Message**:
   - Displays a success message to confirm the account creation.

2. **Navigation Options**:
   - Provides links to the login page and the kiosk page.

3. **Responsive Design**:
   - The layout is optimized for various screen sizes.

---

## Component Workflow

1. **Static Content**:
   - Displays a "Sign Up Success!" message with visual elements (e.g., checkmark).

2. **Navigation Links**:
   - Directs users to:
     - The sign-in page for logging in with the newly created account.
     - The kiosk page as an alternative option.

---

## Key Props and State Variables

### Props
This component does not take any props.

### State Variables
This component does not manage any state.

---

## Dependencies

1. **React Router**:
   - `Routes`, `Route`, and `Link` for navigation between pages.

2. **CSS Styling**:
   - Custom styles in `SignUpSuccess.css` for visual design.

3. **NavBar Component**:
   - Reuses the `NavBar` component from the `kiosk` module for consistent navigation.

---

## Integration

To use the `SignUpSuccess` component, add a route in your application:

```javascript
import SignUpSuccess from './components/auth/SignUpSuccess';

<Route path="/auth/signup/success" element={<SignUpSuccess />} />
