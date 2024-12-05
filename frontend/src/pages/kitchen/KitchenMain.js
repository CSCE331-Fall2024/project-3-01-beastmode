import React, { useState, useEffect } from "react";
import api from '../../services/api'; // Axios instance with base URL
import '../../styles/kitchen.css'; // Create and import CSS for styling

function KitchenMain() {
  const [orders, setOrders] = useState([]); // State to hold orders

  // Fetch pending orders from /kitchen/orders
  const fetchOrders = async () => {
    try {
      const response = await api.get("/kitchen/orders"); 
      console.log('API Response:', response.data); // Debugging line 
      setOrders(response.data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  // Format the item names
  const formatName = (name) => { 
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Fetch orders on component mount and set up polling
  useEffect(() => {
    fetchOrders(); // Initial fetch

    const interval = setInterval(() => {
      fetchOrders(); // Fetch orders every 5 seconds
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Function to mark an order as ready
  const markOrderReady = async (orderId) => {
    try {
      const response = await api.post(`/kitchen/orders/${orderId}/ready`);
      if (response.status === 200) {
        // Remove the order from the state
        setOrders(prevOrders => prevOrders.filter(order => order.order_id !== orderId));
        // Immediately fetch the latest orders
        fetchOrders();
      }
    } catch (error) {
      console.error("Error marking order as ready:", error);
    }
  };

  return (
    <div className="kitchen-container">
      <h1>Kitchen View</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No pending orders.</p>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div key={order.order_id} className="order-card">
              <h3>Order #{order.order_id}</h3>
              <p>Order Time: {new Date(order.order_date_time).toLocaleTimeString()}</p>
              <div className="order-items">
                {order.order_menu_items.map(omi => (
                  <div key={omi.order_menu_item_id} className="order-item">
                    <h4>{formatName(omi.menu_item_name)}</h4>
                    <div className="components">
                      {omi.components.map((comp, index) => (
                        <p key={index}>
                          <strong>{formatName(comp.type)}:</strong> {formatName(comp.product_name)}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mark-ready-button" onClick={() => markOrderReady(order.order_id)}>Mark as Ready</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KitchenMain;
