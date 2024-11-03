import { React, useState, useEffect } from "react";
import api from '../../services/api' // Axios instance with base URL

//components
import MenuBoardHowTo from "./components/MenuBoardHowTo";
import MenuBoardSide from "./components/MenuBoardSide";

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
          <div className="col-5">
            <div className="row">
              <h1>Pick Your Meal</h1>
            </div>
            <div className="row">
              {/* <h1>Bowl</h1> */}
              <MenuBoardHowTo name={"Bowl"} image={<img src ={BowlImage} style={{ width: '110%'}}/>} calories={"280-1130 cal"} description={"1 side & 1 entree"} price={"$8.30"}/>
            </div>
            <div className="row">
              <MenuBoardHowTo name={"Plate"} image={<img src ={BowlImage} style={{ width: '110%'}}/>} calories={"430-1640 cal"} description={"1 side & 2 entrees"} price={"$9.80"}/>
            </div>
            <div className="row">
              <MenuBoardHowTo name={"Bigger Plate"} image={<img src ={BowlImage} style={{ width: '110%'}}/>} calories={"580-2150 cal"} description={"1 side & 3 entrees"} price={"$11.30"}/>
            </div>
            <div className="row">
              <MenuBoardHowTo name={"A La Carte"} image={<img src ={BowlImage} style={{ width: '110%'}}/>} calories={"430-1640 cal"} description={"Individual Entrees & Sides"} price={"$4.40"}/>
            </div>
            <div className="row">
              <MenuBoardHowTo name={"Family Meal"} image={<img src ={BowlImage} style={{ width: '110%'}}/>} calories={"430-1640 cal / serving"} description={"2 large sides & 3 large entrees"} price={"$43.00"}/>
            </div>
          </div>
          <div className="col-7">
            <div className="row">
              <MenuBoardSide name={"Super Greens"} image={<img src ={BowlImage} style={{ width: '110%'}}/>} calories={"130 cal"}/>
            </div>
            <div className="row">
              <div className="col">
                <h1>Super Greens</h1>
              </div>
              <div className="col">
                <h1>Chow Mein</h1>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <h1>Fried Rice</h1>
              </div>
              <div className="col">
                <h1>White Steamed Rice</h1>
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}

export default MenuMain;
