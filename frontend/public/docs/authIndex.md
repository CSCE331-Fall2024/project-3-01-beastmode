# Authentication Exports Documentation

This file serves as the entry point for all authentication-related components, consolidating their exports for easy integration into the application. Below is a breakdown of the components, their purposes, and how to use them.

---

## Overview of Exports

| **Export Name**      | **File**         | **Purpose**                                                                 |
|-----------------------|------------------|-----------------------------------------------------------------------------|
| `AuthMain`           | `./AuthMain`     | The main authentication page, handling login via username/password or Google. |
| `SignUpError`        | `./SignUpError`  | Component to display errors during the sign-up process.                     |
| `SignUpPage`         | `./SignUpPage`   | The primary sign-up page for new users.                                     |
| `SignUpSuccess`      | `./SignUpSuccess`| Displays a success message after a successful sign-up.                     |
| `AuthError`          | `./AuthError`    | A fallback error page for authentication issues.                           |
| `SignInPage`         | `./SignInPage`   | The primary sign-in page for returning users.                              |
| `SignInQR`           | `./SignInQR`     | Sign-in page utilizing QR code authentication.                             |
| `SignInSuccess`      | `./SignInSuccess`| Displays a success message after successful sign-in.                       |
| `SignInError`        | `./SignInError`  | Component to display errors during the sign-in process.                    |

---

## Individual Component Documentation

### `AuthMain`
**File:** `./AuthMain`

- Handles the primary login functionality using:
  - Username/password authentication.
  - Google OAuth login.
- Displays error messages on failed attempts.

**Usage:**
```javascript
import { AuthMain } from './path-to-components';

<AuthMain />;
