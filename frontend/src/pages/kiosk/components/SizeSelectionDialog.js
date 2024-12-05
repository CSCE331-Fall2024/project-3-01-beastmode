// SizeSelectionDialog.js
import React, { useEffect } from 'react';
import '../../../styles/kiosk/sizeSelectionDialog.css';

const SizeSelectionDialog = ({ item, sizeOptions, onSizeSelect, onClose }) => {
  const formatProductName = (name) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  };

  useEffect(() => {
    // Add 'open' class to trigger animation
    const timer = setTimeout(() => {
      const dialog = document.querySelector('.size-selection-dialog');
      const overlay = document.querySelector('.size-selection-overlay');
      if (dialog) dialog.classList.add('open');
      if (overlay) overlay.classList.add('fade-in');
    }, 10);

    return () => {
      // Clean up
      const dialog = document.querySelector('.size-selection-dialog');
      const overlay = document.querySelector('.size-selection-overlay');
      if (dialog) dialog.classList.remove('open');
      if (overlay) overlay.classList.remove('fade-in');
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="size-selection-overlay" onClick={onClose}>
      <div className="size-selection-dialog" onClick={e => e.stopPropagation()}>
        <h2>Select Size for {formatProductName(item.product_name)}</h2>
        <img src={item.image} alt={item.product_name} className="item-image" />
        <div className="size-options">
          {sizeOptions.map((sizeOption, index) => (
            <button
              key={index}
              className="size-option-button"
              onClick={() => onSizeSelect(sizeOption)}
            >
              {sizeOption.display_name} (${sizeOption.menu_item_base_price.toFixed(2)})
            </button>
          ))}
        </div>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SizeSelectionDialog;
