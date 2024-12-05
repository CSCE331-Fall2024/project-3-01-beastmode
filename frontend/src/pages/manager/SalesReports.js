import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { useState, useEffect } from 'react';
import { SidebarManager } from './components/SidebarManager';
import '../../styles/manager/salesreports.css';
import api from '../../services/api'; 

export default function SalesReports() {
  const [datesSelected, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    dateError: false
  });

  const [graphDates, setGraphDates] = useState({
    startDate: datesSelected.startDate,
    endDate: datesSelected.endDate
  })

  const [dropDown, setDropDown] = useState(true)

  const [salesReportData, setSalesReportData] = useState({
    product1: {
      name: "N/A",
      count: "null"
    },
    product2: {
      name: "N/A",
      count: "null"
    },
    product3: {
      name: "N/A",
      count: "null"
    },
    product4: {
      name: "N/A",
      count: "null"
    },
    product5: {
      name: "N/A",
      count: "null"
    },
    totalSales: "N/A",
    totalOrders: "N/A",
    histogram: [
      { range: "0-10", count: 4 },
      { range: "10-20", count: 7 },
      { range: "20-30", count: 10 },
      { range: "30-40", count: 5 },
      { range: "40-50", count: 2 },
    ]
  });

  const COLORS = ["#9A0002", "#585858", "#830213", "#B30D02", "#AAAAAA", "#FE000"];

  const refreshReports = () => {
    fetchSalesReport();
    setGraphDates({
      startDate: datesSelected.startDate,
      endDate: datesSelected.endDate
    })
  }

  const fetchSalesReport = async () => {
    try {
      const response = await api.post('/manager/salesreports', {
        startDate: datesSelected.startDate.toISOString(), 
        endDate: datesSelected.endDate.toISOString()
      });

      if (response.data) {
        setSalesReportData(response.data);
      }
    } catch {
      console.log("error!");
    }
  }

  useEffect(() => {
    fetchSalesReport();
  }, [])

  const salesDropDown = () => {
    setDropDown(!dropDown);
  }

  const checkStartDate = (date) => {
    if (date >= datesSelected.endDate) {
      setSelectedDate({
        ...datesSelected,
        dateError: true
      })
    }
    else {
      setSelectedDate({
        startDate: date,
        endDate: datesSelected.endDate,
        dateError: false
      })
    }
  }

  const checkEndDate = (date) => {
    if (date <= datesSelected.startDate) {
      setSelectedDate({
        ...datesSelected,
        dateError: true
      })
    }
    else {
      setSelectedDate({
        startDate: datesSelected.startDate,
        endDate: date,
        dateError: false
      })
    }
  }

  return (
    <>
      <div className="container-fluid page">
      <SidebarManager />
      <div className="page-background-container">
      <div className="container page-background">
          <div className="row justify-content-start">
            <h1 className="col-12 sales-title">Sales Report</h1>
            <hr class="col-12 sales-divider"></hr>
          </div>
          <div className="row sales-card justify-content-start align-items-center" style={{minWidth:"800px", marginLeft:"0px"}}>
            <div className="col-4 text-start">
              <p>
                <span style={{marginRight:"5px", fontSize: "18px"}}>Start Date: </span>
                <DatePicker
                  id="start-date"
                  selected={datesSelected.startDate}
                  onChange={checkStartDate}
                  dateFormat="MM/dd/yyyy hh:mm aa"
                  showTimeSelect
                  className="sales-datepicker"          
                />
              </p>
              {datesSelected.dateError && <span style={{display:"block", color:"red", fontSize:"18px", marginTop:"10px"}}>Please input a valid date</span>}
            </div>
            <div className="col-4 text-start">
              <p>
                <span style={{marginRight:"5px", fontSize: "18px"}}>End Date: </span>
                <DatePicker
                  id="end-date"
                  selected={datesSelected.endDate}
                  onChange={checkEndDate}
                  dateFormat="MM/dd/yyyy hh:mm aa"
                  showTimeSelect
                  className="sales-datepicker"
                />
              </p>
            </div>
            <div className="col-4 text-start">
                <button className="sales-button" onClick={refreshReports}>Refresh Report</button>
            </div>
          </div>
          <div className="row justify-content-center" style={{marginBottom:"20px"}}>
            <div className="col" style={{minWidth:"250px"}}>
              <h2 className="sales-card">
                Best Selling Item(s):
                <hr class="report-divider"></hr>
                {!dropDown && <span className="sales-top-product justify-content-center">{salesReportData.product1.name}</span>}
                {dropDown && 
                <ol style={{fontWeight:"500", fontSize:"20px"}}>
                  <li>{salesReportData.product1.name}: <span style={{fontWeight:"100"}}>{salesReportData.product1.count} serving(s)</span></li>
                  <li>{salesReportData.product2.name}: <span style={{fontWeight:"100"}}>{salesReportData.product2.count} serving(s)</span></li>
                  <li>{salesReportData.product3.name}: <span style={{fontWeight:"100"}}>{salesReportData.product3.count} serving(s)</span></li>
                  <li>{salesReportData.product4.name}: <span style={{fontWeight:"100"}}>{salesReportData.product4.count} serving(s)</span></li>
                  <li>{salesReportData.product5.name}: <span style={{fontWeight:"100"}}>{salesReportData.product5.count} serving(s)</span></li>
                </ol>} 
                <div className="text-center sales-drop" styles={{width:"100%"}} onClick={salesDropDown}>
                  {!dropDown && <i  className="bi bi-chevron-down sales-drop-icon" onClick={salesDropDown}></i>}
                  {dropDown && <i class="bi bi-chevron-up" onClick={salesDropDown}></i>}
                </div>
              </h2>
            </div>
            <div className="col" style={{minWidth:"250px"}}>
              <h2 className="sales-card">
                Total Sales:
                <hr class="report-divider"></hr>
                <span className="sales-top-product">{salesReportData.totalSales}</span> 
              </h2>
            </div>
            <div className="col" style={{minWidth:"250px"}}>
              <h2 className="sales-card">
                Total Orders
                <hr class="report-divider"></hr>
                <span className="sales-top-product">{salesReportData.totalOrders}</span> 
              </h2>
            </div>
          </div>
          <div className="row" style={{marginBottom:"20px"}}>
            <div className="col-6">
              <div className="sales-card" style={{paddingBottom:"30px"}}>
                <h2 style={{fontSize:"25px"}}>
                  Quantity of Menu Items Ordered
                </h2> 
                ({graphDates.startDate.toLocaleString()} to {graphDates.endDate.toLocaleString()})
                <ResponsiveContainer width="100%" height={600}>
                  <BarChart 
                    data={salesReportData.histogram} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category"
                      angle={-80}
                      textAnchor="end"
                      interval={0} 
                      style= {{ fontSize: "12px"}}
                    />
                    <YAxis 
                      label={{
                        value:"Amount Ordered", 
                        angle:-90,
                        position:"insideLeft",
                        dx:-14,
                        dy:95}}
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-6">
              <div className="sales-card">
                <h2 style={{fontSize:"40px"}}>
                  Percent of Menu Items Ordered
                </h2>
                ({graphDates.startDate.toLocaleString()} to {graphDates.endDate.toLocaleString()})
                <ResponsiveContainer width="100%" height={645} style={{marginTop:"-55px"}}>
                  <PieChart>
                    <Pie
                      data={salesReportData.histogram}
                      dataKey="count"
                      nameKey="category"
                      outerRadius={120}
                      fill="#8884d8"
                      style={{fontSize:"10px"}}
                    >
                      {salesReportData.histogram.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="vertical" // Change the layout to vertical or horizontal
                      align="right" // Align the legend to the right
                      verticalAlign="middle" // Vertically align the legend in the middle
                      wrapperStyle={{
                        padding: "20px", // Add padding around the legend
                        fontSize: "14px", // Change the font size of the legend text
                        fontWeight: "bold", // Make the font bold
                      }}
                      iconSize={20} // Adjust the size of the legend icon (color square)
                      iconType="circle" // Change the legend icon to a circle (default is square)
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="classname row">
            <div className="col-12">
              <div className="sales-card">
                <h2>Sales by Menu Item</h2>
                <hr class="report-divider" style={{marginBottom:"30px"}}></hr>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Menu Item</th>
                      <th>Total Sales</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesReportData.histogram.map((item, index) => (
                      <tr key={index}>
                        <td>{item.category}</td>
                        <td>{item.sales}</td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}