
import React, { useState, useEffect } from "react";
import api from '../../services/api'; 

import { SidebarManager } from './components/SidebarManager';
import '../../styles/manager.css';

function XReports() {
  const [XReportsData, setXReportsData] = useState();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const fetchXReport = async () => {
    const response = await api.get('/manager/xreports'); 
    setXReportsData(response.data);
  };

  useEffect(() => {
    const reportDropupIcon=document.getElementById("report-dropup-icon");
    reportDropupIcon.style.display="none";
    
    //fetchXReport();
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
    
      
      <div class="reports-background-container"> 
      <SidebarManager></SidebarManager>
      <div class="reports-background"> 
      <div class="title-container">
      <div class="reports-title">
        X Report
      </div>
      
      {XReportsData ? (
        <div class="reports-date"> {/*XReportsData.message*/} </div>// Display the "message" from the API response
      ) : (
        <div class="reports-date">  </div>
      )}
     
      </div>
      <hr class="report-divider-big"></hr>
      <div class="report-container">
      <div class="report-card">
          Hour
          <i class="bi bi-clock-history report-card-icon"></i>
          <hr class="report-divider"></hr>
          5
        </div>
        <div class="report-card">
          Total Sales
          <i class="bi bi-cash-coin report-card-icon"></i>
          <hr class="report-divider"></hr>
          $100000000
        </div>
        <div class="report-card">
          Total Orders
          <i class="bi bi-receipt-cutoff report-card-icon"></i>
          <hr class="report-divider"></hr>
          10000
        </div>
      </div>
      <div class="report-container">
        <div class="report-card-drop" onClick={reportDropdownFunction}>
          Orders by Hour
        <hr class="report-divider"></hr>
        <i id="orders-by-hour"  class="bi bi-table"></i>
        <i id="report-dropdown-icon"  class="bi bi-chevron-down"></i>
        <i id="report-dropup-icon"  class="bi bi-chevron-up"></i>
        </div>
        </div>
      <div class="report-container">
        <div class="report-card-big">
        Sales Summary
        <hr class="report-divider"></hr>
        
        </div>
        <div class="report-card-big">
          Products Sold
        <hr class="report-divider"></hr>
          
        </div>
       
        </div>
       
      </div>
      </div>
     
     
  );
}

export default XReports;
