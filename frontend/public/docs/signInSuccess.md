# SignInSuccess Component Documentation

The `SignInSuccess` component provides users with a confirmation screen upon successfully signing in. It displays a success message and a countdown timer before redirecting the user back to the kiosk.

---

## Component Overview

### Location
`src/components/auth/SignInSuccess.js`

### Purpose
To inform users of a successful sign-in and automatically redirect them to the kiosk page after a short delay.

---

## Key Features

1. **Success Confirmation**:
   - Displays a visual confirmation of successful login.
   - Shows a personalized welcome message with the user's name.

2. **Automatic Redirect**:
   - Includes a countdown timer that redirects the user to the kiosk after a few seconds.

3. **Navigation**:
   - Provides a fallback link to the kiosk in case the redirect fails.

---

## Component Usage

### Dependencies
- **React Hooks**:
  - `useContext` for accessing global user data from `AccountContext`.
  - `useState` and `useEffect` for managing the countdown timer.
  - `useNavigate` for handling navigation.
- **CSS**:
  - Custom styles located in `../../styles/signin/SignInSuccess.css`.
- **Routing**:
  - Managed by `react-router-dom`.

### Example Integration
```javascript
import SignInSuccess from './components/auth/SignInSuccess';

<Route path="/auth/signin/success" element={<SignInSuccess />} />
