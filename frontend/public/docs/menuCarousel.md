# Documentation: `MenuCarousel.js`

## Overview

The `MenuCarousel` component implements a carousel for navigating through restaurant menu pages. It uses the `react-slick` library to provide carousel functionality with autoplay support and a toggle button to control playback.

---

## Components

### `MenuCarousel`

#### Description:
Displays a full-screen carousel containing three menu pages. Users can toggle autoplay functionality using a button.

---

## Key Features

1. **Carousel Functionality**
   - Uses `react-slick` with the following settings:
     - `dots`: Shows navigation dots for the carousel.
     - `infinite`: Enables infinite scrolling through slides.
     - `autoplay`: Automatically transitions between slides.
     - `autoplaySpeed`: Set to 8000ms (8 seconds).

2. **Autoplay Toggle**
   - Allows users to enable or disable autoplay using a button.

3. **Dynamic Content**
   - Renders three menu components: `MenuMain1`, `MenuMain2`, and `MenuMain3`.

---

## State and Refs

### State

- **`play`** (boolean):  
  Tracks whether autoplay is enabled.  
  **Default Value:** `true` (autoplay enabled).

### Refs

- **`carouselRef`** (useRef):  
  A reference to the carousel instance for programmatic control of `slickPause` and `slickPlay`.

---

## Functions

### `toggleAutoplay`

#### Description:
Toggles the autoplay functionality of the carousel.

#### Implementation:
- Reverses the `play` state.
- Uses `carouselRef` to call:
  - `slickPause()` if autoplay is turned off.
  - `slickPlay()` if autoplay is turned on.

---

## Dependencies

- **`react-slick`:** For carousel functionality.  
- **`slick-carousel`:** Provides carousel styling.  
- **Custom CSS:** Includes additional styles from `menu.css`.

---

## Example Usage

```javascript
import React from 'react';
import MenuCarousel from './MenuCarousel';

function App() {
  return (
    <div>
      <MenuCarousel />
    </div>
  );
}

export default App;
