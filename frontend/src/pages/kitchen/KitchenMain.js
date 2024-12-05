import React, { useState, useEffect, useRef } from "react";
import api from '../../services/api'; // Axios instance with base URL
import '../../styles/kitchen.css'; // Create and import CSS for styling

function KitchenMain() {
  const [orders, setOrders] = useState([]); // State to hold orders
  const isFetchingRef = useRef(false);

  // Fetch pending orders from /kitchen/orders
  const fetchOrders = async () => {
    if (isFetchingRef.current) return; // Prevent overlapping fetches
    isFetchingRef.current = true;
    try {
      const response = await api.get("/kitchen/orders"); 
      console.log('API Response:', response.data); // Debugging line 
      setOrders(response.data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      isFetchingRef.current = false;
    }
  };
  
  // Format the item names
  const formatName = (name) => { 
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Calculate elapsed time and set up interval
  useEffect(() => {
    fetchOrders(); // Initial fetch

    const interval = setInterval(() => {
      fetchOrders(); // Fetch orders every 5 seconds
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to calculate elapsed time in minutes
  const calculateElapsedTime = (orderTime) => {
    const now = new Date();
    const orderDate = new Date(orderTime);
    const elapsedMilliseconds = now - orderDate;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const remainingSeconds = elapsedSeconds % 60;

    return {
      elapsedMinutes,
      elapsedSeconds: remainingSeconds,
      totalElapsedSeconds: elapsedSeconds,
    };
  };

  // Function to get color based on elapsed time
  const getOrderCardColor = (totalElapsedSeconds) => {
    // Define thresholds in seconds
    const maxTime = 600; // 30 minutes
    const minTime = 0;
  
    // Clamp the elapsed time between minTime and maxTime
    const clampedTime = Math.min(Math.max(totalElapsedSeconds, minTime), maxTime);
  
    // Calculate the percentage
    const percentage = (clampedTime - minTime) / (maxTime - minTime);
  
    // Interpolate between green and red
    const red = 255; // Always bright red for the darkest color
    const green = Math.floor((1 - percentage) * 255); // Reduce green as percentage increases
    const blue = 0;
  
    return `rgb(${red}, ${green}, ${blue})`;
  };

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
          {orders.map(order => {
            const { elapsedMinutes, elapsedSeconds, totalElapsedSeconds } = calculateElapsedTime(order.order_date_time);
            const cardColor = getOrderCardColor(totalElapsedSeconds);
            return (
              <div key={order.order_id} className="order-card" style={{ borderColor: cardColor }}>
                <h3>Order #{order.order_id}</h3>
                <p>Order Time: {new Date(order.order_date_time).toLocaleTimeString()}</p>
                <p>Elapsed Time: {elapsedMinutes}m {elapsedSeconds}s</p>
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default KitchenMain;
