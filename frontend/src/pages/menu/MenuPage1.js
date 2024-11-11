import { React, useState, useEffect } from "react";
import api from '../../services/api' // Axios instance with base URL
import '../../styles/menu.css';

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
    <div className="container-fluid" /*style={{ width: "1400px"}}*/>
<div className="row">
  <div className="col-5">
    <div className="row row-style-1">
      <h1>Pick Your Meal</h1>
    </div>
    <div className="row">
      {/* <h1>Bowl</h1> */}
      <MenuBoardHowTo name={"Bowl"} image={<img src ={BowlImage} />} calories={"280-1130 cal"} description={"1 side & 1 entree"} price={"$8.30"}/>
    </div>
    <div className="row">
      <MenuBoardHowTo name={"Plate"} image={<img src ={BowlImage} />} calories={"430-1640 cal"} description={"1 side & 2 entrees"} price={"$9.80"}/>
    </div>
    <div className="row">
      <MenuBoardHowTo name={"Bigger Plate"} image={<img src ={BowlImage} /*style={{ width: '110%'}}*//>} calories={"580-2150 cal"} description={"1 side & 3 entrees"} price={"$11.30"}/>
    </div>
    <div className="row">
      <MenuBoardHowTo name={"A La Carte"} image={<img src ={BowlImage}/>} calories={"430-1640 cal"} description={"Individual Entrees & Sides"} price={"$4.40"}/>
    </div>
    <div className="row">
      <MenuBoardHowTo name={"Family Meal"} image={<img src ={BowlImage}/>} calories={"430-1640 cal / serving"} description={"2 large sides & 3 large entrees"} price={"$43.00"}/>
    </div>
  </div>
  <div className="col-7">
    <div className="row row-style-1">
      <h1>Sides</h1>
    </div>
    {/* <div className="row">
      <MenuBoardSide name={"Super Greens"} image={<img src ={BowlImage} style={{ width: '110%'}}/>} calories={"130 cal"}/>
    </div> */}
    <div className="row">
      <div className="col">
        <MenuBoardSide name={"Super Greens"} image={<img src ={BowlImage}/>} calories={"130 cal"}/>
      </div>
      <div className="col">
        <MenuBoardSide name={"Chow Mein"} image={<img src ={BowlImage}/>} calories={"600 cal"}/>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <MenuBoardSide name={"Fried Rice"} image={<img src ={BowlImage}/>} calories={"620 cal"}/>
      </div>
      <div className="col">
        <MenuBoardSide name={"White Steamed Rice"} image={<img src ={BowlImage}/>} calories={"520 cal"}/>
      </div>
    </div>

    <div className="row row-style-1">
      <h1>A La Carte Sizes</h1>
    </div>
    <div className="row">
      <div className="col-5">
        <img className="a-la-carte-image" src ={BowlImage}/>
      </div>
      <table className="col table a-la-carte-table">
        <thead>
          <tr>
            <th scope="col">  </th>
            <th scope="col"> Entrees </th>
            <th scope="col"> Premium </th>
            <th scope="col"> Sides </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"> Sm </th>
            <td> $5.20 </td>
            <td> $6.70 </td>
            <td> $4.40 </td>
          </tr>
          <tr>
            <th scope="row"> Med </th>
            <td> $8.50 </td>
            <td> $11.50 </td>
            <td>  </td>
          </tr>
          <tr>
            <th scope="row"> Lg </th>
            <td> $11.20 </td>
            <td> $15.70 </td>
            <td> $5.40 </td>
          </tr>
        </tbody>
      </table>
      <div className="col-3">

      </div>
    </div>

  </div>
</div>
</div>
  );
}

export default MenuMain;
