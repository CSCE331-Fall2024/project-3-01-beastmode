import React from 'react';
import '../../../styles/kiosk.css';

const MenuItemCard = ({ name, image, description, isPremium, isSeasonal, onInfoClick, onClick }) => {
  return (
    <div className="card pt-3" style={{ width: "18rem", cursor: "pointer" }} onClick={onClick}>
      {(isPremium || isSeasonal) && (
        <div className="banners-container">
          {isPremium && (
            <div className="banner premium-banner">P</div>
          )}
          {isSeasonal && (
            <div className="banner seasonal-banner">S</div>
          )}
        </div>
      )}
      <button
        className="info-button"
        onClick={(e) => {
          e.stopPropagation(); 
          if (typeof onInfoClick === 'function') {
            onInfoClick(); 
          } else {
            console.error('onInfoClick is not a function'); 
          }
        }}
      >
        i
      </button>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <p className="card-text text-center">{name}</p>
        <p className="card-description text-center">{description}</p>
      </div>  
    </div>
  );
};


export default MenuItemCard;
