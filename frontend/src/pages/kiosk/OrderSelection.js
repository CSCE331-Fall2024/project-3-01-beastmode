import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/kiosk.css';
import '../../styles/kiosk/addToCartButton.css';
import SelectionGrid from './components/SelectionGrid';
import SideSelection from './components/SideSelection';
import EntreeSelection from './components/EntreeSelection';
import { CartContext } from './components/CartContext';
import { NavBar } from "./components/NavBar";
import { useNavigate } from 'react-router-dom';


const OrderSelection = () => {
  const location = useLocation();
  const { numSides, numEntrees, realItemName, itemImage, basePrice, premiumMultiplier } = location.state;

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSideIndex, setSelectedSideIndex] = useState(null);
  const [selectedEntreeIndex, setSelectedEntreeIndex] = useState(null);

  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedEntrees, setSelectedEntrees] = useState([]);

  const { cartItems, setCartItems } = useContext(CartContext);

  const navigate = useNavigate();


  useEffect(() => {
    setSelectedSides(Array(numSides).fill(null));
    setSelectedEntrees(Array(numEntrees).fill(null));
  }, [numSides, numEntrees]);

  const handleSelection = (type, index) => {
    setSelectedSection(type);
    if (type === 'side') {
      setSelectedSideIndex(index);
      setSelectedEntreeIndex(null);
    } else if (type === 'entree') {
      setSelectedEntreeIndex(index);
      setSelectedSideIndex(null);
    }
  };

  const handleItemSelect = (item, type) => {
    if (type === 'side' && selectedSideIndex !== null) {
      const updatedSides = [...selectedSides];
      updatedSides[selectedSideIndex] = item;
      setSelectedSides(updatedSides);
    } else if (type === 'entree' && selectedEntreeIndex !== null) {
      const updatedEntrees = [...selectedEntrees];
      updatedEntrees[selectedEntreeIndex] = item;
      setSelectedEntrees(updatedEntrees);
    }
  };

  const isSelectionComplete = selectedSides.every(side => side !== null) && selectedEntrees.every(entree => entree !== null);

  const handleAddToCart = () => {
    if (isSelectionComplete) {
      const mainItem = {
        name: realItemName, 
        image: itemImage,
        components: {
          sides: selectedSides,
          entrees: selectedEntrees
        },
        quantity: 1,
        basePrice: basePrice,
        premiumMultiplier: premiumMultiplier
      };

      const existingItemIndex = cartItems.findIndex(cartItem => 
        cartItem.name === mainItem.name &&
        JSON.stringify(cartItem.components) === JSON.stringify(mainItem.components)
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, mainItem]);
      }

      setSelectedSides(Array(numSides).fill(null));
      setSelectedEntrees(Array(numEntrees).fill(null));

      navigate('/kiosk/order');
    }
  };

  return (
    <div className="kiosk-landing-order container-fluid">
      <NavBar></NavBar>
      <div className="container-fluid align-items-center">
        <SelectionGrid 
          numSides={numSides} 
          numEntrees={numEntrees} 
          onSelect={handleSelection} 
          selectedSides={selectedSides}
          selectedEntrees={selectedEntrees}
        />
      </div>

      {/* Add "Add to Cart" button near the selection grid */}
      {isSelectionComplete && (
        <div className="add-to-cart-container-top">
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
      
      <div className="container-fluid mt-4">
        {selectedSection === "side" && (
          <SideSelection onItemSelect={(item) => handleItemSelect(item, 'side')} />
        )}
        {selectedSection === "entree" && (
          <EntreeSelection onItemSelect={(item) => handleItemSelect(item, 'entree')} />
        )}
      </div>
    </div>
  );
};

export default OrderSelection;
