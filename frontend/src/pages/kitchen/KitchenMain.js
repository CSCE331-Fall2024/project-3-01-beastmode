import React, { useState, useEffect, useRef } from "react";
import api from '../../services/api'; // Axios instance with base URL
import '../../styles/kitchen.css'; // Create and import CSS for styling

function KitchenMain() {
  const [orders, setOrders] = useState([]); // State to hold orders
  const isFetchingRef = useRef(false);

  // State variables for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
    // Fetch orders on mount
    fetchOrders();
  
    // Polling interval for fetching orders
    const fetchInterval = setInterval(() => {
      fetchOrders();
    }, 5000);
  
    // Interval for updating elapsed time every second
    const timeInterval = setInterval(() => {
      setOrders(prevOrders => [...prevOrders]); // Trigger re-render
    }, 1000);
  
    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
    };
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


  const getOrderCardColor = (totalElapsedSeconds) => {
    // Define thresholds in seconds
    const maxTime = 600; // 10 minutes
    const minTime = 0;

    // Clamp the elapsed time between minTime and maxTime
    const clampedTime = Math.min(Math.max(totalElapsedSeconds, minTime), maxTime);

    // Calculate the percentage
    const percentage = (clampedTime - minTime) / (maxTime - minTime);

    // Interpolate between green and red
    const red = Math.floor(percentage * 255); // Increases from 0 to 255
    const green = Math.floor((1 - percentage) * 255); // Decreases from 255 to 0
    const blue = 0; // Always 0 for red-green gradient

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

  // Function to handle delete button click
  const handleDeleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDeleteModal(true);
  };

  // Function to confirm deletion
  const handleConfirmDelete = async () => {
    try {
      const response = await api.delete(`/kitchen/orders/${selectedOrderId}`);
      if (response.status === 200) {
        // Remove the order from the state
        setOrders(prevOrders => prevOrders.filter(order => order.order_id !== selectedOrderId));
        setShowDeleteModal(false);
        setSelectedOrderId(null);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      // Optionally, show an error message to the user
    }
  };

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedOrderId(null);
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
                <div className="order-buttons">
                  <button className="mark-ready-button" onClick={() => markOrderReady(order.order_id)}>Mark as Ready</button>
                  <button className="delete-order-button" onClick={() => handleDeleteClick(order.order_id)}>Delete Order</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete order #{selectedOrderId}? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="confirm-delete-button" onClick={handleConfirmDelete}>Delete</button>
              <button className="cancel-delete-button" onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KitchenMain;
