# NavBar Component Documentation

## Overview

The `NavBar` component is a versatile navigation bar designed for a kiosk application. It includes dynamic weather information, navigation buttons, login/logout functionality, and user-specific data (e.g., points). The component adapts its layout based on the user's authentication state and current route.

---

## Features

1. **Navigation Buttons**:
   - **Home Button**: Redirects users to the kiosk home page.
   - **Back Button**: Appears on specific routes and allows navigation back to the ordering section.

2. **Weather Display**:
   - Fetches and displays the current temperature and weather icon for College Station using the OpenWeather API.

3. **Login and User Info**:
   - Shows login and signup options for unauthenticated users.
   - Displays user-specific details (e.g., name and points) for authenticated users.
   - Includes a dropdown for logout functionality.

---

## Props

This component does not take any direct props.

---

## Dependencies

- **React**: For state management and rendering.
- **React Router (`useNavigate`, `useLocation`)**: For navigation and route-based state.
- **Axios**: For API calls to fetch weather data.
- **Bootstrap Icons**: Used for various icons like the back arrow, login, and logout.
- **CSS File**: Styling is managed by an external CSS file (`navbar.css`).

---

## Component Logic

### 1. Weather Fetching

The `getWeather` function fetches weather data for College Station from the OpenWeather API and updates the temperature and icon.

- **API Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Response Handling**:
  - Temperature is displayed in Fahrenheit.
  - Weather icon is dynamically fetched and displayed.

### 2. Navigation

- **`navHome`**: Redirects to the home page (`/kiosk`) and reloads the page.
- **`navSignIn`**: Redirects to the sign-in page (`/auth/signin`) and reloads the page.
- **`navSignUp`**: Redirects to the sign-up page (`/auth/signup`) and reloads the page.
- **`navBack`**: Redirects to the `/kiosk/order` route when the back button is visible.

### 3. Login Dropdown Management

- Dynamically toggles a login dropdown when the login button is clicked.
- Closes the dropdown if clicked outside its area.

### 4. Authentication State

- Uses the `AccountContext` to manage user authentication state and provide user-specific data like points and name.
- Displays login/signup options for unauthenticated users.
- Shows points, name, and a logout dropdown for authenticated users.

---

## Component Layout

### Structure

```jsx
<nav className="navbar fixed-top">
  {/* Left-Side Button */}
  <button>Home or Back Button</button>

  {/* Weather Display */}
  <button>Weather Information</button>

  {/* Login/Signup or User Info */}
  {customer.isSignedIn ? (
    <div>Authenticated User Info & Logout</div>
  ) : (
    <div>Login/Signup Options</div>
  )}
</nav>
