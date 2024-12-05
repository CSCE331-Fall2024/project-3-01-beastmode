# SelectionGrid Component Documentation

## Overview

The `SelectionGrid` component dynamically renders a grid of selection cards for choosing sides and entrees. It allows interactive selection, visual feedback for selected items, and is structured with standard JavaScript and React.

---

## Features

1. **Dynamic Card Rendering**:
   - Creates a grid layout of selection cards for sides and entrees based on input counts.

2. **Interactive User Experience**:
   - Enables item selection with visual feedback (selected/unselected states).

3. **Customizable Content**:
   - Displays images for selected items and placeholders for unselected slots.

---

## Props

| Prop Name         | Type       | Required | Description                                                                 |
|--------------------|------------|----------|-----------------------------------------------------------------------------|
| `numSides`        | `number`   | Yes      | Number of side selection cards to display.                                 |
| `numEntrees`      | `number`   | Yes      | Number of entree selection cards to display.                               |
| `onSelect`        | `function` | Yes      | Callback function triggered when a card is clicked.                        |
| `selectedSides`   | `array`    | Yes      | Array of selected side items (objects with `image` properties or `null`).  |
| `selectedEntrees` | `array`    | Yes      | Array of selected entree items (objects with `image` properties or `null`).|

---

## Component Logic

### Rendering Cards

- **`renderCards(count, type)`**:
  - Iterates over the count (`numSides` or `numEntrees`).
  - Determines selection state (`isSelected`) from `selectedSides` or `selectedEntrees`.
  - Fetches the image for the selected item if available.
  - Renders a `SelectionCard` with the type (`side` or `entree`), selection state, and image.

### Handling Card Clicks

- **`handleCardClick(type, index)`**:
  - Invokes the `onSelect` callback with the type (`side` or `entree`) and index of the clicked card.

---

## Component Structure

### Layout

```javascript
function SelectionGrid({ numSides, numEntrees, onSelect, selectedSides, selectedEntrees }) {
  const handleCardClick = (type, index) => {
    onSelect(type, index);
  };

  const renderCards = (count, type) => {
    return Array.from({ length: count }, (_, index) => {
      const isSelected = type === 'side'
        ? selectedSides[index] !== null
        : selectedEntrees[index] !== null;
      const image = type === 'side'
        ? selectedSides[index]?.image
        : selectedEntrees[index]?.image;

      return (
        <SelectionCard
          key={`${type}-${index}`}
          type={type}
          isSelected={isSelected}
          onClick={() => handleCardClick(type, index)}
          image={image}
        />
      );
    });
  };

  return (
    <div className="selection-grid mt-4 d-flex flex-wrap justify-content-center">
      <div className="sides-section">{renderCards(numSides, 'side')}</div>
      <div className="entrees-section">{renderCards(numEntrees, 'entree')}</div>
    </div>
  );
}

export default SelectionGrid;
