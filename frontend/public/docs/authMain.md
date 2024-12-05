# AuthMain.js Documentation

## Overview

The `AuthMain.js` file is a React component designed to manage user authentication. It offers two authentication methods:
1. **Username and Password Authentication**
2. **Google OAuth**

The component validates credentials, provides error handling, and navigates users upon successful authentication.

---

## Features

### 1. Username and Password Login
- Accepts user credentials via input fields.
- Validates the password against a hashed value provided by the backend.

### 2. Google OAuth Login
- Redirects users to Google's authentication service.

### 3. Error Handling
- Displays error messages when login fails or user input is invalid.

### 4. Responsive Design
- Uses Bootstrap classes for mobile-friendly styling.

---

## Component Logic

### State Variables

The component manages the following state variables:
- **`username`**: Stores the input for the username field.
- **`password`**: Stores the input for the password field.
- **`errorMessage`**: Stores error messages to display when login fails.

```javascript
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState(null);
