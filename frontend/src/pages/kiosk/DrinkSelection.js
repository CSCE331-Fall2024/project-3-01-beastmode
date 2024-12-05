// DrinkSelection.js
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

const DrinkSelection = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await api.get('/kiosk/drinks');
        setDrinks(response.data);
      } catch (err) {
        setError('Failed to fetch drinks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const getSizeOptions = (selectedDrink) => {
    const baseSizeOptions = [
      {
        item_name: 'drinkSmall',
        display_name: 'Small',
        menu_item_base_price: 2.10,
        premium_multiplier: 1,
      },
      {
        item_name: 'drinkMedium',
        display_name: 'Medium',
        menu_item_base_price: 2.30,
        premium_multiplier: 1,
      },
      {
        item_name: 'drinkLarge',
        display_name: 'Large',
        menu_item_base_price: 2.50,
        premium_multiplier: 1,
      },
    ];

    // Calculate total price for each size option
    const calculatedSizeOptions = baseSizeOptions.map((sizeOption) => {
      let totalPrice = sizeOption.menu_item_base_price;
      if (selectedDrink.is_premium) {
        totalPrice += sizeOption.premium_multiplier * selectedDrink.premium_addition;
      }
      return {
        ...sizeOption,
        total_price: totalPrice,
      };
    });

    return calculatedSizeOptions;
  };
  const handleDrinkSelect = (drink) => {
    console.log('Selected drink:', drink);

    if (drink.type === 'fountainDrink') {
      // Prompt size selection
      setSelectedDrink(drink);
      setShowSizeDialog(true);
    } else {
      // 'drink' type items are added directly
      const basePrice = 2.10; // Base price for 'drinks' menu_item
      const premiumMultiplier = 1;

      const cartItem = {
        ...drink,
        basePrice: basePrice,
        premiumMultiplier: premiumMultiplier,
        name: 'drink',
      };

      addToCart(cartItem);
    }
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
      ...selectedDrink,
      size: size, // Include size information
      basePrice: size.menu_item_base_price,
      premiumMultiplier: size.premium_multiplier,
      name: size.item_name,
      product_id: selectedDrink.product_id,
    };
    console.log(size.item_name)

    addToCart(cartItem);

    // Close size selection dialog
    setShowSizeDialog(false);
    setSelectedDrink(null);
  };

  const handleSizeDialogClose = () => {
    setShowSizeDialog(false);
    setSelectedDrink(null);
  };

  const handleInfoClick = (drink) => {
    setSelectedInfo(drink);
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
      <div className="row pt-4 px-3 justify-content-center">
        {drinks.map((drink, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4" key={index}>
            <MenuItemCard
              name={formatProductName(drink.product_name)}
              image={drink.image}
              price={
                drink.type === 'fountainDrink'
                  ? 'See Options'
                  : (2.10 + (drink.is_premium ? parseFloat(drink.premium_addition) || 0 : 0)).toFixed(2)
              }
              isPremium={drink.is_premium}
              isSeasonal={drink.is_seasonal}
              isAvailable={drink.is_available}
              description={drink.calories + ' Calories'}
              onClick={() => handleDrinkSelect(drink)}
              onInfoClick={() => handleInfoClick(drink)}
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
          item={selectedDrink}
          sizeOptions={getSizeOptions(selectedDrink)}
          onSizeSelect={handleSizeSelect}
          onClose={handleSizeDialogClose}
        />
      )}
    </div>
  );
};

export default DrinkSelection;
