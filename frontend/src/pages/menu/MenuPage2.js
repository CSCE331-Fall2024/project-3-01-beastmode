import { React, useState, useEffect } from "react";
import api from '../../services/api' // Axios instance with base URL
import '../../styles/menu.css';

//components
import MenuBoardHowTo from "./components/MenuBoardHowTo";
import MenuBoardSide from "./components/MenuBoardSide";
import MenuBoardEntree from "./components/MenuBoardEntree";

// images
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
    <div className="container-fluid">
      <div className="row">
        <div className="row row-style-1">
          <h1>Entrees</h1>
        </div>
        <div className="row entree-row">
          <div className="col">
            <MenuBoardEntree name={"Orange Chicken"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"} isPremium = {true} isSeasonal = {true}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Black Pepper Sirloin Steak"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Honey Walnut Shrimp"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Grilled Teriyaki Chicken"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Kung Pao Chicken"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
        </div>
        <div className="row entree-row">
          <div className="col">
            <MenuBoardEntree name={"Honey Sesame Chicken Breast"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Beijing Beef"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Mushroom Chicken"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"SweetFire Chicken Breast"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"String Bean Chicken Breast"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
        </div>
        <div className="row entree-row">
          <div className="col">
            <MenuBoardEntree name={"Broccoli Beef"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Super Greens"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Hot Ones Blazing Bourbon Chicken"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Super Greens"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
          <div className="col">
            <MenuBoardEntree name={"Super Greens"} image={<img className="entree-image" src ={BowlImage}/>} calories={"130 cal"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuMain;
