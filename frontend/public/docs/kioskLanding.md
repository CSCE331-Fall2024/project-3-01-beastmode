# File: KioskLanding.js

## Description
The `KioskLanding` component serves as the entry point for the kiosk application. It provides users with options to start ordering or translate the kiosk content. The component utilizes routing to navigate users to the ordering section and integrates Google Translate for multilingual support.

---

## Key Features

1. **Start Ordering Button**:
   - **Action**: Navigates the user to the `/kiosk/order` route to begin placing orders.
   - **Styling**: Styled using the `.start-order-button` class for a visually distinct and user-friendly appearance.

2. **Translation Support**:
   - **Google Translate Integration**: Displays a Google Translate widget for on-the-fly language translation.
   - **Reload Mechanism**: Includes an icon button to reinitialize the translation process by refreshing the page.

3. **Navigation**:
   - Uses `useNavigate` from `react-router-dom` for seamless routing within the application.

4. **Responsive Design**:
   - Utilizes Bootstrap classes for a responsive and vertically/horizontally centered layout (`d-flex`, `align-items-center`, `justify-content-center`, `vh-100`).

---

## Code Breakdown

### 1. **Imports**
   - React and `useNavigate` for component functionality and navigation.
   - Custom styles from `kiosk.css` and `translate.css` for layout and translation features.
   - `NavBar` component for consistent top navigation.

### 2. **Component Structure**
```javascript
function KioskLanding() {
  const navigate = useNavigate();

  const handleStartOrdering = () => {
    navigate("/kiosk/order");
  };

  const initTranslate = () => {
    window.location.reload();
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 cover">
      <NavBar />
      <div className="button-landing-container">
        <button 
          onClick={handleStartOrdering} 
          className="start-order-button p-4">
          Start Ordering
        </button>

        <button className="translate-button">
          <div id="google_translate_element"></div>
          <i className="bi bi-translate translate-icon" onClick={initTranslate}></i>
        </button>
      </div>
    </div>
  );
}
