# Documentation: `PairReports.js`

## Overview

The `PairReports` component displays data about product pairings, including their frequency of occurrence in customer orders and the total order count for each pairing. The interface includes a heatmap-style chart for visualizing product pairs and a table summarizing popular product combinations. Users can adjust the date range to filter the data.

---

## Features

1. **Date Range Selection**
   - Users can select start and end dates using date pickers.
   - Updates the report data dynamically based on the selected range.

2. **Product Pair Heatmap**
   - Visual representation of product pair frequency using a color-coded grid.
   - Displays specific product pairs and their order counts when a grid cell is clicked.

3. **Popular Product Pairs Table**
   - Tabular representation of the most common product pairs with the order count and percentage of total orders.

4. **Dynamic Data Fetching**
   - Fetches data from the backend API based on the selected date range.

---

## Component State

### `PairReportsData`
- **Type**: `Object` or `null`
- **Description**: Stores data for the heatmap and table, including axis labels, frequency data, and order statistics.

### `startDate` and `endDate`
- **Type**: `Date`
- **Description**: Represents the selected start and end dates for the report.

### `axisArr`
- **Type**: `Array` or `null`
- **Description**: Stores the axis labels for the heatmap.

### `displayPair`
- **Type**: `String`
- **Description**: Stores the name of the selected product pair for display.

### `displayPairTotal`
- **Type**: `String`
- **Description**: Stores the total orders for the selected product pair.

---

## Functions

### `clickSquare`
- **Parameters**: `row`, `col`, `value`
- **Description**: Updates `displayPair` and `displayPairTotal` with information about the selected heatmap cell.

### `fetchPairReport`
- **Description**: Fetches product pairing data from the backend API and updates `PairReportsData`.

### `calcColor`
- **Parameters**: `value`, `max`
- **Description**: Calculates the background color for a heatmap cell based on its value relative to the maximum value.

### `calcDate`
- **Parameters**: `date`
- **Description**: Converts a `Date` object into a string formatted for the server, accounting for the user's time zone.

### `changeStart` and `changeEnd`
- **Parameters**: `date`
- **Description**: Updates the start or end date, sends the updated date to the backend, and refreshes the report data.

---

## Hooks

### `useEffect`
- **Dependencies**: `[startDate, endDate]`
- **Description**: Initializes the report by fetching data for the selected date range when the component mounts or the dates change.

---

## API Endpoints

- **`GET /manager/pairreports`**: Retrieves paired product data.
- **`POST /manager/pairreports`**: Updates the date range for the report.

---

## Styling

### CSS Classes

- **`page`**: Styles the main container for the page.
- **`report-container`**: Styles the container for date pickers and reports.
- **`pair-chart-container`**: Styles the heatmap grid.
- **`pair-table-row`**: Styles rows in the popular product pairs table.
- **`pair-elem`**: Styles individual heatmap cells with dynamic background colors.

### Dependencies

- **CSS**: `../../styles/manager.css`
- **Date Picker**: `"react-datepicker/dist/react-datepicker.css"`

---

## Usage Example

```javascript
import React from 'react';
import PairReports from './PairReports';

function App() {
  return (
    <div>
      <PairReports />
    </div>
  );
}

export default App;
