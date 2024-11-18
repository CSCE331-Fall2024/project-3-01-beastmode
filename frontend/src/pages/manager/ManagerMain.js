import { useState, useEffect } from "react";
import api from '../../services/api'; // Axios instance with base URL
import { SidebarManager } from './components/SidebarManager';

function ManagerMain() {
  const [managerData, setManagerData] = useState(null); // State to hold data
  
  // Fetch data from /manager
  const fetchAPI = async () => {
    try {
      const response = await api.get("/manager"); 
      setManagerData(response.data); 
    } catch (error) {
      console.error("Error fetching manager data:", error);
    }
  };

  // Fetch data on component load
  useEffect(() => {
    fetchAPI();
  }, []);
  
  return (
    <div className="container-fluid">
      <SidebarManager></SidebarManager>
      {managerData ? (
        <div> {/*XReportsData.message*/} </div>// Display the "message" from the API response
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ManagerMain;
