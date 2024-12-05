# SelectionCard Component Documentation

## Overview

The `SelectionCard` component provides a reusable UI element for selecting options within a kiosk application. It dynamically updates its appearance and content based on the selection state and props passed.

---

## Features

1. **Dynamic Content**:
   - Displays either an image or a placeholder with a "Choose" message based on the props.

2. **Selection State**:
   - Highlights the card when selected using conditional styling.

3. **Interactivity**:
   - Invokes a callback function (`onClick`) when the card is clicked, enabling interaction and selection functionality.

---

## Props

| Prop Name   | Type       | Required | Description                                                                 |
|-------------|------------|----------|-----------------------------------------------------------------------------|
| `type`      | `string`   | Yes      | Specifies the type of item (e.g., "Entree", "Side") displayed on the card.  |
| `onClick`   | `function` | Yes      | Callback function triggered when the card is clicked.                      |
| `isSelected`| `boolean`  | No       | Determines if the card is in a selected state (default: `false`).          |
| `image`     | `string`   | No       | URL of the image to be displayed on the card. If absent, a placeholder is shown. |

---

## Dependencies

- **CSS File**: Styling is managed by an external CSS file (`kiosk.css`).

---

## Component Logic

### Selection State

- Adds the `selected` class to the card when the `isSelected` prop is `true`. This class modifies the card's styling to visually indicate its selection.

### Content Display

- If an `image` URL is provided, the card displays the image.
- If no `image` is provided, the card shows a placeholder with:
  - A "+" sign.
  - A "Choose [type]" message.

---

## Component Layout

### Structure

```jsx
<div className={`card selection-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
  {image ? (
    <img src={image} alt={`Selected ${type}`} className="selection-card-image" />
  ) : (
    <div className="selection-card-content">
      <span className="plus-sign">+</span>
      <p className="selection-text">Choose {type}</p>
    </div>
  )}
</div>
