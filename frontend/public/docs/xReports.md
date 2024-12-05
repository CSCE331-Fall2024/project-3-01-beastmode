# XReports.js Documentation

The `XReports.js` file defines a React component that displays an X Report for daily sales data. This includes a summary of sales, orders, top products, and hour-by-hour performance in a visually appealing and interactive format.

---

## Overview

The `XReports` component provides managers with a comprehensive view of daily sales performance. It leverages charts and tables to present key metrics like total sales, total orders, and sales distribution by hour.

---

## Features

1. **Summary Cards**:
   - Display key metrics like total sales, total orders, and the current hour.

2. **Interactive Charts**:
   - **Line Chart**: Displays sales trends over the hours of the day.
   - **Pie Chart**: Shows the distribution of top products sold.

3. **Collapsible Table**:
   - Detailed breakdown of orders and sales by hour.

4. **API Integration**:
   - Fetches live sales data from an API endpoint.

---

## API Integration

### Endpoints Used

- **GET `/manager/xzreports`**:
  - **Response Example**:
    ```json
    {
      "date": "2024-12-04",
      "hour": "12:00 PM",
      "sales": "$1,200",
      "orderNum": 100,
      "chartArr": [
        { "hour": "9 AM", "sales": 100 },
        { "hour": "10 AM", "sales": 150 },
        { "hour": "11 AM", "sales": 200 }
      ],
      "pieArr": [
        { "name": "Burger", "value": 30 },
        { "name": "Fries", "value": 25 },
        { "name": "Soda", "value": 20 }
      ],
      "ordersByHour": [
        ["9 AM", 10, "$100"],
        ["10 AM", 15, "$150"],
        ["11 AM", 20, "$200"]
      ]
    }
    ```

---

## Component Structure

### State Variables

| **Variable**     | **Type**  | **Description**                                                             |
|-------------------|-----------|-----------------------------------------------------------------------------|
| `XReportsData`    | `Object`  | Holds all the report data fetched from the API.                             |
| `colors`          | `Array`   | Predefined color palette for the pie chart.                                 |

---

### Layout

1. **Sidebar**:
   - Uses the `SidebarManager` component for navigation.

2. **Summary Cards**:
   - Displays key metrics:
     - Current Hour
     - Total Sales
     - Total Orders

3. **Charts**:
   - **Line Chart**: Visualizes sales trends throughout the day.
   - **Pie Chart**: Displays the proportion of top products sold.

4. **Collapsible Table**:
   - A detailed table showing orders and sales by hour.

---

## Functions

### `fetchXReport()`
- **Description**: Fetches X Report data from the API and updates the `XReportsData` state.
- **Usage**: Called during the component's initial load.

### `reportDropdownFunction()`
- **Description**: Toggles the visibility of the "Orders by Hour" table.
- **Implementation**:
  - Adjusts the visibility of the dropdown and table elements using DOM manipulation.

---

## Charts

### Line Chart: Sales Trends by Hour

| **Feature**         | **Details**                                                   |
|----------------------|---------------------------------------------------------------|
| **X-Axis**           | Displays the hour of the day.                                 |
| **Y-Axis**           | Displays the sales amount in dollars.                         |
| **Tooltip**          | Shows detailed sales for a specific hour on hover.            |
| **Data Source**      | `XReportsData.chartArr`.                                      |
| **Visualization Type** | Line chart using `Recharts`.                                |

---

### Pie Chart: Top Products Today

| **Feature**         | **Details**                                                   |
|----------------------|---------------------------------------------------------------|
| **Data Source**      | `XReportsData.pieArr`.                                       |
| **Legend**           | Displays product names and their corresponding colors.         |
| **Tooltip**          | Shows the percentage of total sales for each product on hover.|

---

## Table: Orders by Hour

| **Column**      | **Description**                                                   |
|------------------|-------------------------------------------------------------------|
| **Hour**         | The hour of the day (e.g., "9 AM").                               |
| **Orders**       | The number of orders placed during that hour.                     |
| **Sales**        | The total sales amount for that hour.                             |

---

## Styling

Relevant styles are defined in:
- `../../styles/manager.css`.

---

## Usage

```javascript
import XReports from './XReports';

function App() {
  return <XReports />;
}
