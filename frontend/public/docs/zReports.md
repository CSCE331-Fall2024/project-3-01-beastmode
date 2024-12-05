# ZReports.js Documentation

The `ZReports.js` file defines a React component that displays a Z Report summarizing the daily sales performance. This includes total sales, orders, hourly performance, and top products sold.

---

## Overview

The `ZReports` component provides managers with a consolidated end-of-day report. It visually presents key performance indicators (KPIs) such as total sales, total orders, and detailed order data over the day.

---

## Features

1. **Summary Cards**:
   - Displays total sales and total orders for the day.

2. **Interactive Charts**:
   - **Line Chart**: Shows sales trends throughout the day.
   - **Pie Chart**: Highlights the top products sold.

3. **Collapsible Table**:
   - Detailed view of orders and sales by hour.

4. **API Integration**:
   - Fetches real-time data from an API for accurate reporting.

---

## API Integration

### Endpoints Used

- **GET `/manager/xzreports`**:
  - Fetches Z Report data.
  - **Response Example**:
    ```json
    {
      "date": "2024-12-04",
      "sales": "$2,400",
      "orderNum": 200,
      "chartArr": [
        { "hour": "9 AM", "sales": 200 },
        { "hour": "10 AM", "sales": 300 },
        { "hour": "11 AM", "sales": 400 }
      ],
      "pieArr": [
        { "name": "Burger", "value": 40 },
        { "name": "Fries", "value": 35 },
        { "name": "Soda", "value": 25 }
      ],
      "ordersByHour": [
        ["9 AM", 20, "$200"],
        ["10 AM", 30, "$300"],
        ["11 AM", 40, "$400"]
      ]
    }
    ```

- **POST `/manager/xzreports`**:
  - Marks the report as a Z Report.

---

## Component Structure

### State Variables

| **Variable**   | **Type**  | **Description**                                                             |
|-----------------|-----------|-----------------------------------------------------------------------------|
| `ZReportsData`  | `Object`  | Contains all the data needed for the Z Report.                              |
| `colors`        | `Array`   | Predefined colors for the pie chart.                                        |

---

### Layout

1. **Sidebar**:
   - Includes navigation using the `SidebarManager` component.

2. **Summary Cards**:
   - Displays:
     - Total Sales
     - Total Orders

3. **Charts**:
   - **Line Chart**: Visualizes sales trends by hour.
   - **Pie Chart**: Represents the percentage of sales by top products.

4. **Collapsible Table**:
   - Contains detailed hourly sales and order data.

---

## Functions

### `fetchZReport()`
- **Description**: Fetches Z Report data from the API and updates the `ZReportsData` state.
- **Usage**: Called during the initial load of the component.
- **Additional Behavior**: Marks the report as a Z Report using a `POST` request.

### `reportDropdownFunction()`
- **Description**: Toggles the visibility of the "Orders by Hour" table.

---

## Charts

### Line Chart: Sales Trends by Hour

| **Feature**         | **Details**                                                   |
|----------------------|---------------------------------------------------------------|
| **X-Axis**           | Displays the hour of the day.                                 |
| **Y-Axis**           | Displays the sales amount in dollars.                         |
| **Tooltip**          | Provides detailed sales information for a specific hour.      |
| **Data Source**      | `ZReportsData.chartArr`.                                      |
| **Visualization Type** | Line chart using `Recharts`.                                |

---

### Pie Chart: Top Products Today

| **Feature**         | **Details**                                                   |
|----------------------|---------------------------------------------------------------|
| **Data Source**      | `ZReportsData.pieArr`.                                       |
| **Legend**           | Displays product names and their corresponding colors.         |
| **Tooltip**          | Shows the percentage of total sales for each product.         |

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
import ZReports from './ZReports';

function App() {
  return <ZReports />;
}
