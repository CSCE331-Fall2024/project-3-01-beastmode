import { React, useState, useEffect } from "react";
import api from '../../services/api' // Axios instance with base URL
import '../../styles/menu.css';

//components
import MenuBoardHowTo from "./components/MenuBoardHowTo";
import MenuBoardSide from "./components/MenuBoardSide";
import MenuBoardEntree from "./components/MenuBoardEntree";
import MenuBoardAppetizer from "./components/MenuBoardAppetizer";
import MenuBoardDrinks from "./components/MenuBoardDrinks";

// images
import Pepsi from '../../assets/pepsi_logo.png';
import Brisk from '../../assets/brisk.png';
import MtnDew from '../../assets/mtn_dew.png';
import Tropicana from '../../assets/tropicana.png';

import BCkn from '../../assets/burboun_ckn.png';
import ApplePie from '../../assets/apple_pie.png';

import BowlImage from '../../assets/bowl.png';
// import PlateImage from '../../assets/plate.png';
// import BiggerPlateImage from '../../assets/bigger-plate.png';
// import ALaCarteImage from '../../assets/a-la-carte.png';
// import AppetizerImage from '../../assets/appetizer.png';
// import DrinksImage from '../../assets/drinks.png';
// import FamilyMealImage from '../../assets/family-meal.png';

function MenuMain() {
  const [menuData, setMenuData] = useState(null); // Step 1: State to hold data

  // how to fetch api
  const fetchAPI = async () => {
    // Step 2: Fetch data when component loads
    const response = await api.get("/menu"); 
    setMenuData(response.data); 
  };

  // fetch data on component load
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="container-fluid" /*style={{ width: "1400px"}}*/>
<div className="row">
  <div className="col-3">
    <div className="row row-style-1">
      <h1>Drinks</h1>
    </div>
    <div className="card my-2 drinks-card">
      <h1>Fountain Drinks</h1>

      <table className="col table drinks-table">
        <thead>
          <tr>
            <th scope="col">  </th>
            <th scope="col">  </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"> Sm </th>
            <td> $5.20 </td>
          </tr>
          <tr>
            <th scope="row"> Med </th>
            <td> $8.50 </td>
          </tr>
          <tr>
            <th scope="row"> Lg </th>
            <td> $11.20 </td>
          </tr>
        </tbody>
      </table>

      <div className="row">
        <div className="col">
          <img className="drink-image" src ={Pepsi}/>
        </div>
        <div className="col">
          <img className="drink-image" src ={MtnDew}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img className="drink-image" src ={Brisk}/>
        </div>
        <div className="col">
          <img className="drink-image" src ={Tropicana}/>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <MenuBoardDrinks name={"chicken egg roll"} price={"130 cal"}/>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <MenuBoardDrinks name={"Beastmode Energy Drink"} price={"130 cal"}/>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <MenuBoardDrinks name={"chicken egg roll"} price={"130 cal"}/>
      </div>
    </div>
    
    
  </div>
  <div className="col-6">
    <div className="row row-style-1">
      <h1>Appetizers</h1>
    </div>
    <div className="row">
      <div className="col">
        <MenuBoardAppetizer name={"chicken egg roll"} calories={"130 cal"} isPremium = {true} isSeasonal = {true} image={<img src ={BowlImage}/>}/>
      </div>
      <div className="col">
        <MenuBoardAppetizer name={"chicken egg roll"} calories={"130 cal"} isPremium = {true} isSeasonal = {true}/>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <MenuBoardAppetizer name={"chicken egg roll"} calories={"130 cal"} smPrice={"$2.30"} mdPrice={"$2.30"} lgPrice={"$2.30"} isPremium = {true} isSeasonal = {true} image={<img src ={BowlImage}/>}/>
      </div>
      <div className="col">
        <MenuBoardAppetizer name={"chicken egg roll"} calories={"130 cal"} isPremium = {true} isSeasonal = {true}/>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <MenuBoardAppetizer name={"chicken egg roll"} calories={"130 cal"} isPremium = {true} isSeasonal = {true}/>
      </div>
      <div className="col">
        <MenuBoardAppetizer name={"chicken egg roll"} calories={"130 cal"} isPremium = {true} isSeasonal = {true}/>
      </div>
    </div>
    

    <div className="row">
      <div className='col card my-2 icon-card'>
        <div className="row">
        <div className="col-1">
          <div className="banner premium-banner banners-container-display">P</div>
        </div>
        <div className="col-7 text-desc">
          
          <h3> Premium </h3>
          <h6> $1.50 upcharge on Entree  |  $4.50 upcharge on Family Meal Entree </h6>
        </div>
        <div className="col-1">
        <div className="banner seasonal-banner banners-container-display">S</div>
        </div>
        <div className="col-3 text-desc">
          
          <h3> Seasonal </h3>
        </div>
        </div>
        
      </div>
    </div>
    
    


  </div>
  <div className="col-3">
    <div className="row row-style-1">
      <h1>Seasonal</h1>
    </div>
    
    <div className="row">
      <div className='card my-2 ad-card'>
        <img className="card-img-top" src ={BCkn}/>
      </div>
      <div className='card my-2 ad-card'>
        <img className="card-img-top" src ={ApplePie}/>
      </div>
    </div>
    
  </div>
</div>
</div>
  );
}

export default MenuMain;
