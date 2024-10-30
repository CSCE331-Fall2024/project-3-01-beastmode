import React from 'react';
import '../../../styles/kiosk.css';

const SelectionCard = ({ type, onClick, isSelected }) => {
  return (
    <div 
      className={`card selection-card ${isSelected ? 'selected' : ''}`} 
      onClick={onClick} 
      style={{
        backgroundColor: isSelected ? '#a3080c' : 'white',
        color: isSelected ? 'white' : 'black',
        border: isSelected ? 'none' : '1px solid #ddd'
      }}
    >
      <div className="selection-card-content">
        <span className="plus-sign">+</span>
        <p className="selection-text">Choose {type}</p>
      </div>
    </div>
  );
};

export default SelectionCard;
