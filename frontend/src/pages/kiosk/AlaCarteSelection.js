// AlaCarteSelection.js
import React, { useState, useEffect, useContext } from 'react';
import '../../styles/kiosk.css';
import MenuItemCard from './components/MenuItemCard';
import InfoCard from './components/InfoCard';
import SizeSelectionDialog from './components/SizeSelectionDialog'; // Import the SizeSelectionDialog component
import api from '../../services/api';
import { CartContext } from './components/CartContext';
import { NavBar } from "./components/NavBar";

const formatProductName = (name) => {
  return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
};

const AlaCarteSelection = () => {
  const [sides, setSides] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);

  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const sidesResponse = await api.get('/kiosk/sides');
        const entreesResponse = await api.get('/kiosk/entrees');
        setSides(sidesResponse.data);
        setEntrees(entreesResponse.data);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const sizeOptionsSides = [
    {
      item_name: 'aLaCarteSideMedium',
      display_name: 'Medium',
      menu_item_base_price: 4.40,
      premium_multiplier: 1,
    },
    {
      item_name: 'aLaCarteSideLarge',
      display_name: 'Large',
      menu_item_base_price: 5.40,
      premium_multiplier: 1,
    },
  ];

  const sizeOptionsEntrees = [
    {
      item_name: 'aLaCarteEntreeSmall',
      display_name: 'Small',
      menu_item_base_price: 5.20,
      premium_multiplier: 1,
    },
    {
      item_name: 'aLaCarteEntreeMedium',
      display_name: 'Medium',
      menu_item_base_price: 8.50,
      premium_multiplier: 2,
    },
    {
      item_name: 'aLaCarteEntreeLarge',
      display_name: 'Large',
      menu_item_base_price: 11.20,
      premium_multiplier: 3,
    },
  ];

  const handleItemSelect = (item, type) => {
    console.log('Selected item:', item);
    setSelectedItem(item);
    setSelectedItemType(type);
    setShowSizeDialog(true);
  };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.product_name === item.product_name &&
        (cartItem.size ? cartItem.size.item_name === item.size?.item_name : true)
    );

    if (existingItemIndex !== -1) {
      // If item exists, update quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Add to cart with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleSizeSelect = (size) => {
    // Create a cart item with the selected size
    const cartItem = {
      ...selectedItem,
      size: size, // Include size information
      basePrice: size.menu_item_base_price,
      premiumMultiplier: size.premium_multiplier,
      menuItemName: size.item_name,
      name: 'aLaCarte', // Set the menu item name
      is_premium: selectedItem.is_premium,
      premium_addition: selectedItem.premium_addition,
    };

    addToCart(cartItem);

    // Close size selection dialog
    setShowSizeDialog(false);
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  const handleSizeDialogClose = () => {
    setShowSizeDialog(false);
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  const handleInfoClick = (item) => {
    setSelectedInfo(item);
  };

  const handleCloseInfo = () => {
    setSelectedInfo(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="kiosk-landing-order container-fluid">
      <NavBar />
      <h2 className="mt-4">Sides</h2>
      <div className="row pt-4 px-3 justify-content-center">
        {sides.map((side, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4" key={`side-${index}`}>
            <MenuItemCard
              name={formatProductName(side.product_name)}
              image={side.image}
              price={'See Options'}
              isPremium={side.is_premium}
              isSeasonal={side.is_seasonal}
              isAvailable={side.is_available}
              description={side.calories + ' Calories'}
              onClick={() => handleItemSelect(side, 'side')}
              onInfoClick={() => handleInfoClick(side)}
            />
          </div>
        ))}
      </div>
      <h2 className="mt-4">Entrees</h2>
      <div className="row pt-4 px-3 justify-content-center">
        {entrees.map((entree, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4" key={`entree-${index}`}>
            <MenuItemCard
              name={formatProductName(entree.product_name)}
              image={entree.image}
              price={'See Options'}
              isPremium={entree.is_premium}
              isSeasonal={entree.is_seasonal}
              isAvailable={entree.is_available}
              description={entree.calories + ' Calories'}
              onClick={() => handleItemSelect(entree, 'entree')}
              onInfoClick={() => handleInfoClick(entree)}
            />
          </div>
        ))}
      </div>

      {selectedInfo && (
        <InfoCard
          title={formatProductName(selectedInfo.product_name)}
          image={selectedInfo.image}
          description={selectedInfo.product_description}
          allergens={selectedInfo.allergens || 'None'}
          servingSize={selectedInfo.serving_size}
          calories={selectedInfo.calories}
          saturatedFat={selectedInfo.saturated_fat}
          carbohydrate={selectedInfo.carbohydrate}
          protein={selectedInfo.protein}
          onClose={handleCloseInfo}
        />
      )}

      {showSizeDialog && (
        <SizeSelectionDialog
          item={selectedItem}
          sizeOptions={selectedItemType === 'side' ? sizeOptionsSides : sizeOptionsEntrees}
          onSizeSelect={handleSizeSelect}
          onClose={handleSizeDialogClose}
        />
      )}
    </div>
  );
};

export default AlaCarteSelection;
