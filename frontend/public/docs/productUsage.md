# Documentation: `ProductUsage.js`

## Overview

The `ProductUsage` component provides a report on the product usage within a specified date range. Users can select a start and end date, submit the form, and view the usage report in the form of a bar chart.

---

## Features

1. **Date Range Selection**
   - Users can input start and end dates and times to define the reporting period.

2. **Generate Usage Report**
   - A form submission triggers an API call to fetch product usage data for the selected date range.

3. **Dynamic Chart**
   - Displays a bar chart of product usage with the number of servings used for each product.

4. **Loading Indicator**
   - A "Loading..." message is displayed while data is being fetched.

---

## Component State

### `startDate`
- **Type**: `String`
- **Description**: Holds the start date and time entered by the user.

### `endDate`
- **Type**: `String`
- **Description**: Holds the end date and time entered by the user.

### `chartData`
- **Type**: `Object` or `null`
- **Description**: Holds the data and configuration for the bar chart.

### `loading`
- **Type**: `Boolean`
- **Description**: Indicates whether the data fetching process is ongoing.

---

## Functions

### `handleSubmit`
- **Parameters**: `e` (Event)
- **Description**: 
  - Prevents the default form submission.
  - Sends a POST request to fetch product usage data for the specified date range.
  - Updates `chartData` with the fetched data and sets `loading` state to `false`.

### `setChartData`
- **Parameters**: Data object with product names and servings used.
- **Description**: Formats and updates the chart data for rendering.

---

## API Endpoint

- **`POST /manager/productUsage`**:
  - **Payload**: `{ startDate, endDate }`
  - **Response**: An array of objects with `productName` and `servingsUsed` fields.

---

## Bar Chart Configuration

### `data`
- **Labels**: Product names.
- **Datasets**:
  - Label: "Servings Used"
  - Background color: `rgba(75, 192, 192, 0.6)`
  - Border color: `rgba(75, 192, 192, 1)`
  - Border width: `1`

### `options`
- **Responsive**: `true`
- **Plugins**:
  - `legend`: Displayed at the top.
  - `tooltip`: Customized tooltips showing servings used.
- **Scales**:
  - `x`: Title: "Products"
  - `y`: Title: "Servings Used", begins at zero.

---

## CSS Classes

- **`page`**: Styles the main container for the page.
- **`page-background-container`**: Adds a background container around the content.
- **`page-background`**: Styles the main page content area.
- **`page-title`**: Styles the page title text.
- **`chart-container`**: Styles the container for the chart.
- **`btn`**: Bootstrap button class.
- **`btn-danger`**: Styles the "Generate Report" button.

---

## Usage Example

```javascript
import React from 'react';
import ProductUsage from './ProductUsage';

function App() {
  return (
    <div>
      <ProductUsage />
    </div>
  );
}

export default App;
