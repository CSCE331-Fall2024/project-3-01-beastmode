// AppsAndMoreSelection.js
import React, { useState, useEffect, useContext } from 'react';
import '../../styles/kiosk.css';
import MenuItemCard from './components/MenuItemCard';
import InfoCard from './components/InfoCard';
import SizeSelectionDialog from './components/SizeSelectionDialog';
import api from '../../services/api';
import { CartContext } from './components/CartContext';
import { NavBar } from "./components/NavBar";

const formatProductName = (name) => {
  return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
};

const AppsAndMoreSelection = () => {
  const [appetizers, setAppetizers] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

  // State variables for size selection
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);

  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appetizerResponse, dessertResponse] = await Promise.all([
          api.get('/kiosk/appetizers'),
          api.get('/kiosk/desserts')
        ]);
        setAppetizers(appetizerResponse.data);
        setDesserts(dessertResponse.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSizeOptions = (itemType, selectedItem) => {
    let sizeOptions = [];
    if (itemType === 'appetizer') {
      sizeOptions = [
        {
          item_name: 'appetizerSmall',
          display_name: 'Small',
          menu_item_base_price: 2.00,
          premium_multiplier: 1,
        },
        {
          item_name: 'appetizerLarge',
          display_name: 'Large',
          menu_item_base_price: 8.00,
          premium_multiplier: 1,
        },
      ];
    } else if (itemType === 'dessert') {
      sizeOptions = [
        {
          item_name: 'dessertSmall',
          display_name: 'Small',
          menu_item_base_price: 2.00,
          premium_multiplier: 1,
        },
        {
          item_name: 'dessertMedium',
          display_name: 'Medium',
          menu_item_base_price: 6.20,
          premium_multiplier: 1,
        },
        {
          item_name: 'dessertLarge',
          display_name: 'Large',
          menu_item_base_price: 8.00,
          premium_multiplier: 1,
        },
      ];
    }

    // Calculate total price for each size option
    const calculatedSizeOptions = sizeOptions.map((sizeOption) => {
      let totalPrice = sizeOption.menu_item_base_price;
      if (selectedItem.is_premium) {
        totalPrice += sizeOption.premium_multiplier * selectedItem.premium_addition;
      }
      return {
        ...sizeOption,
        total_price: totalPrice,
      };
    });

    return calculatedSizeOptions;
  };

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
      name: size.item_name, // Set the menu item name
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
      {/* Appetizers Section */}
      <div className="row pt-4 px-3 justify-content-center">
        <h2 className="text-center mb-4" style={{ color: "white", fontWeight: "bold" }}>Appetizers</h2>
        {appetizers.map((appetizer, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4" key={index}>
            <MenuItemCard
              name={formatProductName(appetizer.product_name)}
              image={appetizer.image}
              description={appetizer.calories + " Calories"}
              price={'See Options'}
              isPremium={appetizer.is_premium}
              isSeasonal={appetizer.is_seasonal}
              isAvailable={appetizer.is_available}
              onClick={() => handleItemSelect(appetizer, 'appetizer')}
              onInfoClick={() => handleInfoClick(appetizer)}
            />
          </div>
        ))}
      </div>

      {/* Desserts Section */}
      <div className="row pt-4 px-3 justify-content-center">
        <h2 className="text-center mb-4" style={{ color: "white", fontWeight: "bold" }}>Desserts</h2>
        {desserts.map((dessert, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4" key={index}>
            <MenuItemCard
              name={formatProductName(dessert.product_name)}
              image={dessert.image}
              description={dessert.calories + " Calories"}
              price={'See Options'}
              isPremium={dessert.is_premium}
              isSeasonal={dessert.is_seasonal}
              isAvailable={dessert.is_available}
              onClick={() => handleItemSelect(dessert, 'dessert')}
              onInfoClick={() => handleInfoClick(dessert)}
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

      {/* Size Selection Dialog */}
      {showSizeDialog && (
        <SizeSelectionDialog
          item={selectedItem}
          sizeOptions={getSizeOptions(selectedItemType, selectedItem)}
          onSizeSelect={handleSizeSelect}
          onClose={handleSizeDialogClose}
        />
      )}
    </div>
  );
};

export default AppsAndMoreSelection;
