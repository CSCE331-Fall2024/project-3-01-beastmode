# Documentation: Footer.js

## Overview

The `Footer` component serves as the footer section for the POS (Point of Sale) system. It displays basic information such as a label (e.g., "Ethan (temp)") and a back button that appears when the user is not on the main menu. The footer is styled to be positioned at the bottom of the screen with a flexible layout.

---

## Features

1. **Back Button**
   - The back button appears if the `menuEndpoint` is not set to `/pos/menu`. This allows the user to navigate to the previous screen.
   - The button triggers the `onBack` function passed as a prop, which handles the back navigation behavior.

2. **Footer Styling**
   - The footer uses a flexbox layout to align the content (label and button) properly.
   - The "back" button is positioned at the top-right of the footer, with custom styles for position, size, and color.

---

## Exported Entities

### Footer
- **Type**: React Functional Component
- **Description**: This component renders the footer of the POS system interface, displaying a label and optionally a back button for navigation. 
- **Usage**:
  
  ```javascript
  import Footer from './Footer';
  
  // Usage within another component
  <Footer 
    navigate={navigate} 
    onBack={handleBack} 
    menuEndpoint={currentMenuEndpoint}
  />
