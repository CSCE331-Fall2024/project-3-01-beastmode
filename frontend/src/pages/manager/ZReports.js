import React, { useState, useEffect } from "react";
import api from '../../services/api'; 

import { SidebarManager } from './components/SidebarManager';
import '../../styles/manager.css';
import {ResponsiveContainer,LineChart,Line,XAxis,YAxis, PieChart, Pie,  Cell, Legend } from 'recharts';

function ZReports() {
  const [ZReportsData, setZReportsData] = useState(null);
  const colors=["#77070a","#a3080c","rgb(98, 98, 98)","gray","rgb(163, 163, 163)"];

  const fetchZReport = async () => {
    await api.post('/manager/xzreports', "Z", {timeout: 60000,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    const response = await api.get('/manager/xzreports',{timeout: 60000}); 
    setZReportsData(response.data);
  };

  useEffect(() => {
    const reportDropupIcon=document.getElementById("report-dropup-icon");
    reportDropupIcon.style.display="none";
    fetchZReport();
    
  }, []); 



  const reportDropdownFunction = () =>{
    const ordersTable=document.getElementById("orders-by-hour");
    const reportDropdownIcon=document.getElementById("report-dropdown-icon");
    const reportDropupIcon=document.getElementById("report-dropup-icon");
    if(reportDropupIcon.style.display==="none"){
      ordersTable.style.display="block";
      reportDropupIcon.style.display="block";
      reportDropdownIcon.style.display="none";
    }
    else{
      ordersTable.style.display="none";
      reportDropupIcon.style.display="none";
      reportDropdownIcon.style.display="block";
    }
  };

  
  return (
    
      
      <div className="container-fluid page">
      <SidebarManager />
      <div className="page-background-container">
      <div className="container page-background">
      
      <div class="title-container">
      <div class="reports-title">
        Z Report
      </div>
      
      {ZReportsData ? (
        <div class="reports-date"> {ZReportsData.date} </div>// Display the "message" from the API response
      ) : (
        <div class="reports-date"></div>
      )}
     
      </div>
      <hr class="report-divider-big"></hr>
      <div class="report-container">
        <div class="report-card">
          Total Sales
          <i class="bi bi-cash-coin report-card-icon"></i>
          <hr class="report-divider"></hr>
          {ZReportsData ? (
            <div> {ZReportsData.sales} </div>
          ) : (
            <div></div>
          )}
        </div>
        <div class="report-card">
          Total Orders
          <i class="bi bi-receipt-cutoff report-card-icon"></i>
          <hr class="report-divider"></hr>
          {ZReportsData ? (
            <div> {ZReportsData.orderNum} </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      
      <div class="report-container">
        <div class="report-card-big">
        Sales ($)
        <hr class="report-divider"></hr>
       
        <div class="barchart-container"><ResponsiveContainer width="100%">
        {ZReportsData ? (
        <LineChart width={100} height={100} data={ZReportsData.chartArr}>

          <XAxis dataKey="hour" tick={{dy:10}}/>
          <YAxis tick={{dx:-10}}></YAxis>
          <Line dataKey="sales" stroke="#a3080c" strokeWidth={2}></Line>
          
        </LineChart>
        
          ) : (
            <div></div>
          )}
        </ResponsiveContainer>
        </div>
        </div>
        
        <div class="report-card-big">
        Top Products Today
        <hr class="report-divider"></hr>
        <div class ="piechart-container">
        <ResponsiveContainer width="100%">
        {ZReportsData ? (
            
              
              <PieChart>
              <Pie
              data={ZReportsData.pieArr}
              dataKey="value"
              nameKey="name"
              outerRadius={"100vw"}
              fill="#a3080c"
              >
                {(ZReportsData.pieArr).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
             <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: '1.1vw'}}/>
            </PieChart>
            
            
          ) : (
            <div></div>
          )}
          </ResponsiveContainer>
          </div>
        </div>
       
       
        </div>
        <div class="report-container">
        <div class="report-card-drop" onClick={reportDropdownFunction}>
          Orders by Hour
        <hr class="report-divider"></hr>

       <div id="orders-by-hour">
        {ZReportsData ? (
            <div> 
            <div class="table-title-container">
                <div class="table-title">Hour </div>
                <div class="table-title">Orders </div>
                <div class="table-title">Sales </div>
            </div>
             {ZReportsData.ordersByHour.map((item, elemRow ) => (
          <div class="orders-by-hour-row"
            key={elemRow}
          >
          {item.map((elem, elemInd) => (
          <div class="orders-by-hour-elem"
            key={elemInd}
          >
          {elem}
          </div>
        ))}
          </div>
        ))}
            </div>
          ) : (
            <div></div>
          )}
       </div>

        <i id="report-dropdown-icon"  class="bi bi-chevron-down"></i>
        <i id="report-dropup-icon"  class="bi bi-chevron-up"></i>
        </div>
        </div>

      </div>
      </div>
      </div>
     
     
  );
}

export default ZReports;
