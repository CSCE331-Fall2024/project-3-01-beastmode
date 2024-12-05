# SalesReports.js Documentation

The `SalesReports.js` file defines a React component that displays sales data in various formats, including charts, tables, and textual summaries. It enables managers to analyze sales performance over customizable date ranges.

---

## Overview

The `SalesReports` component provides a user-friendly interface for viewing and analyzing sales data. It fetches data from an API, processes it, and visualizes the results using charts and tables. Users can select a custom date range and refresh the report to view updated sales data.

---

## Features

1. **Customizable Date Range**:
   - Users can select start and end dates using date pickers.
   - Validates that the start date precedes the end date.

2. **Sales Summary**:
   - Displays top-selling products with counts.
   - Shows total sales and total orders.

3. **Visualizations**:
   - **Bar Chart**: Quantity of menu items ordered.
   - **Pie Chart**: Percentage of menu items ordered.

4. **Detailed Table**:
   - Displays sales data for each menu item, including total sales and order counts.

---

## API Integration

### Endpoints Used

- **POST `/manager/salesreports`**:
  - **Request Body**:
    ```json
    {
      "startDate": "2024-12-01T00:00:00.000Z",
      "endDate": "2024-12-02T00:00:00.000Z"
    }
    ```
  - **Response Example**:
    ```json
    {
      "product1": { "name": "Burger", "count": 150 },
      "product2": { "name": "Fries", "count": 120 },
      "product3": { "name": "Soda", "count": 100 },
      "product4": { "name": "Salad", "count": 80 },
      "product5": { "name": "Dessert", "count": 60 },
      "totalSales": 5000,
      "totalOrders": 300,
      "histogram": [
        { "category": "Burger", "count": 150, "sales": 1500 },
        { "category": "Fries", "count": 120, "sales": 900 },
        { "category": "Soda", "count": 100, "sales": 700 },
        { "category": "Salad", "count": 80, "sales": 500 },
        { "category": "Dessert", "count": 60, "sales": 400 }
      ]
    }
    ```

---

## Component Structure

### State Variables

| **Variable**       | **Type**  | **Description**                                                                 |
|---------------------|-----------|---------------------------------------------------------------------------------|
| `datesSelected`     | `Object`  | Stores the selected start and end dates with an error flag for invalid inputs.  |
| `graphDates`        | `Object`  | Tracks the dates currently displayed in the charts.                            |
| `dropDown`          | `Boolean` | Toggles the visibility of the detailed top products list.                       |
| `salesReportData`   | `Object`  | Stores sales data, including top products, totals, and chart data.              |

---

### Layout

1. **Sidebar**:
   - Uses the `SidebarManager` component for navigation.

2. **Date Pickers**:
   - Allows users to select start and end dates for the report.

3. **Summary Cards**:
   - **Best Selling Items**: Top 5 products with counts.
   - **Total Sales**: Total sales amount.
   - **Total Orders**: Total number of orders.

4. **Charts**:
   - **Bar Chart**: Quantity of items ordered for each product.
   - **Pie Chart**: Percentage of each product's sales.

5. **Table**:
   - Displays sales data for each product, including total sales and order counts.

---

## Functions

### `refreshReports()`
- **Description**: Refreshes the report by fetching updated sales data and resetting chart dates.
- **Usage**: Triggered when the user clicks the "Refresh Report" button.

### `fetchSalesReport()`
- **Description**: Fetches sales data from the API for the selected date range and updates `salesReportData`.
- **Error Handling**: Logs errors to the console if the API call fails.

### `checkStartDate(date)`
- **Description**: Validates the selected start date to ensure it precedes the end date.
- **Parameters**: `date` (Date object).
- **Usage**: Called when the user selects a start date.

### `checkEndDate(date)`
- **Description**: Validates the selected end date to ensure it follows the start date.
- **Parameters**: `date` (Date object).
- **Usage**: Called when the user selects an end date.

### `salesDropDown()`
- **Description**: Toggles the visibility of the detailed top products list.

---

## Charts

### Bar Chart: Quantity of Menu Items Ordered

| **Feature**          | **Details**                                              |
|-----------------------|----------------------------------------------------------|
| **X-Axis**            | Displays product categories.                             |
| **Y-Axis**            | Displays the quantity ordered.                           |
| **Tooltip**           | Shows the count for each category on hover.              |
| **Data Source**       | `salesReportData.histogram`.                             |
| **Visualization Type**| Bar chart using `Recharts`.                              |

---

### Pie Chart: Percentage of Menu Items Ordered

| **Feature**          | **Details**                                              |
|-----------------------|----------------------------------------------------------|
| **Data Source**       | `salesReportData.histogram`.                             |
| **Tooltip**           | Shows the percentage share for each product on hover.    |
| **Legend**            | Displays product names and corresponding colors.         |

---

### Table: Sales by Menu Item

| **Column**      | **Description**                                                   |
|------------------|-------------------------------------------------------------------|
| **Menu Item**    | Name of the product.                                              |
| **Total Sales**  | Total sales amount for the product.                               |
| **Count**        | Number of orders for the product.                                 |

---

## Usage

```javascript
import SalesReports from './SalesReports';

function App() {
  return <SalesReports />;
}
