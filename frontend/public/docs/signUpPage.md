# SignUpPage Component Documentation

The `SignUpPage` component provides a user interface for creating new user accounts. It validates user inputs, ensures secure password handling, and interacts with backend APIs for account creation.

---

## Component Overview

### Location
`src/components/auth/SignUpPage.js`

### Purpose
To allow users to register a new account securely, with robust validation and feedback.

---

## Key Features

1. **User Input Validation**:
   - Validates email, first name, last name, and passwords.
   - Provides specific error messages for invalid inputs.

2. **Password Validation**:
   - Ensures password meets security criteria (length, special characters, uppercase letters).
   - Confirms passwords match.

3. **Backend Integration**:
   - Checks if the email already exists in the database.
   - Hashes the password before sending it to the server for secure storage.

4. **Dynamic Feedback**:
   - Real-time updates to input fields to highlight errors.
   - Displays loading animation during form submission.

5. **Navigation**:
   - Directs users to the success page upon successful registration.
   - Redirects to an error page in case of a failure.

---

## Component Workflow

1. **Input Handling**:
   - Updates state values for user inputs on each change.

2. **Validation**:
   - Ensures all fields are filled.
   - Verifies email format and checks for duplicate accounts.
   - Validates password strength and matching passwords.

3. **Submission**:
   - Hashes the password and sends the data to the backend API.
   - Provides feedback based on the API response.

4. **Error Handling**:
   - Highlights fields with invalid inputs.
   - Shows error messages to guide users.

5. **Success Handling**:
   - Clears input fields.
   - Redirects users to a success page.

---

## Key Functions

### `handleSignUpInput`
Handles user input and updates the `signupInput` state.

### `clear`
Resets the input fields to their initial state.

### `createAccount`
Interacts with the backend to:
- Check if the email exists.
- Hash the password and submit data for account creation.
Redirects users based on the API response.

### `validateSignUpInput`
Validates all user inputs and triggers the `createAccount` function if inputs are valid.

---

## Key Props and State Variables

### State Variables

1. **`signupInput`**:
   Holds the current values of the input fields:
   ```javascript
   {
     email: "",
     first_name: "",
     last_name: "",
     password: "",
     confirm_password: ""
   }
