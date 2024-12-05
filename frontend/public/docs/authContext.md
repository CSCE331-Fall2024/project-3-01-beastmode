# AccountContext.js Documentation

## Overview

The `AccountContext.js` file is designed to manage user authentication and session states for both customers and employees in a React application. It uses React Context to provide global access to user-related data and authentication actions, ensuring consistent and persistent session management across the app.

---

## Features

- **Customer Account Management**:
  - Store and manage customer session details (`customer_id`, `email`, etc.).
  - Provide methods for signing in and signing out customers.

- **Employee Account Management**:
  - Store and manage employee session details (`employee_id`, `email`, etc.).
  - Provide methods for signing in and signing out employees.

- **Session Persistence**:
  - Persist user session details using `sessionStorage`.
  - Automatically initialize state from `sessionStorage` upon page reloads.

- **Global State Sharing**:
  - Use React Context to share authentication state and actions with all components in the application.

---

## Key Components

### 1. **AccountContext**

```javascript
export const AccountContext = createContext();
