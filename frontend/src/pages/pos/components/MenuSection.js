import React, { useState, useEffect } from "react";
import api from "../../../services/api";

function MenuSection({ currentWorkflow, apiEndpoint, onAddToOrder, onSubitemSelect, onHalfSide, onCancelHalfSide, halfSideActivated, setHalfSideActivated }) {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  console.log("Current Workflow", currentWorkflow);
  console.log("Api endpoint", apiEndpoint);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get(apiEndpoint);
        setMenuItems(response.data || []);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
        setError("Failed to load menu items. Please try again later.");
      }
    };

    fetchMenuItems();
  }, [apiEndpoint]);

  if (error) {
    return <div className="menu-error">{error}</div>;
  }

  const getItemClass = (item) => {
    if (item.is_premium) return "premium-item";
    if (item.type === "side") return "side-item"; 
    if (item.type === "entree") return "entree-item"; 
    if (item.type === "dessert") return "dessert-item";
    if (item.type === "appetizer") return "appetizer-item";
    if (item.type === "drink") return "drink-item";
    return ""; 
  };

  const formatMenuNames = (item) => {
    const name = item.item_name || item.product_name || item.name || "Unknown Item";

    let formattedName = name.replace(/Small|Medium|Side|Entree/g, "");
    if (formattedName.toLowerCase() === "appetizer") return "Apps & More";

    formattedName = formattedName.replace(/([A-Z])/g, " $1").trim(); 
    return formattedName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(" ");
  };

  const handleHalfSideButtonClick = () => {
    if (halfSideActivated) {
      setHalfSideActivated(false);
      onCancelHalfSide();
    } 
    else {
      setHalfSideActivated(true);
      onHalfSide();
    }
  };

  return (
    <div className="menu-section">
      {apiEndpoint.includes("sides") && currentWorkflow?.name !== "familyMeal" && (
        <div className="half-side-row">
          <button
            className={`half-side-btn ${halfSideActivated ? "active" : ""}`}
            onClick={handleHalfSideButtonClick}
            style={{
              textDecoration: halfSideActivated ? "none" : "line-through",
              color: halfSideActivated ? "inherit" : "black",
              cursor: "pointer",
              width: "100%", 
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {halfSideActivated ? "Half & Half" : "Half & Half"}
          </button>
        </div>
      )}
      <div className="menu-grid">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <button
              key={index}
              className={`menu-item-btn ${getItemClass(item)}`}
              onClick={() => (item.type ? onSubitemSelect(item) : onAddToOrder(item))}
            >
              {formatMenuNames(item)}
            </button>
          ))
        ) : (
          <div className="menu-loading">Loading menu items...</div>
        )}
      </div>
    </div>
  );
}

export default MenuSection;