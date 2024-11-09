import axios from "axios";
import beastLogo from "./beastLogo.png";
import "../../../styles/kiosk.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function NavBar(){
  document.cookie="googtrans=/en/en;"
  const navigate = useNavigate();
  const [temp, setTemp] = useState();
  const [iconSrc, setIconSrc] = useState();

  //Fetch weather from OpenWeather API
  const getWeather = async () =>{
    try {
      const resp = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=College%20Station&units=imperial&appid=388a91292a2c36e2dc2582a04576599a"
      );
      setTemp(Math.round(resp.data.main.temp));
      setIconSrc(`https://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`);
      console.log(resp.data);
    }
    catch(error){
      console.error("no return");
    }
  };

  useEffect(() => {
    getWeather();
    
  }, [] );

  //Handle button clicks and navigate to the correct page, reload if needed
  const navHome = () => {
     navigate(`/kiosk`);
    window.location.reload();
    document.cookie="googtrans=/en/en;"
  }
  const navAuth = () => {
    navigate(`/auth`);
 }

    return (
      <div class="row">
        <nav className="navbar fixed-top">

          {/*home button*/}
          <div class="col">
            <button className="home-button" id="home-button" onClick={navHome}>
              <img className="logo" src={beastLogo} alt="Beastmode logo"></img>
            </button>
          </div>

           {/*display weather*/}
          <div class="col-auto">
            <button className="weather-button">
              <div class="notranslate" id="weather-text">
                {temp} °F
                <img className="weather-icon" src={iconSrc}></img>
              </div>
            </button>
          </div>

           {/*login button*/}
          <div class="col-auto">
            <button className="login-button" onClick={navAuth}>
              <i class="bi bi-person-circle login-icon"></i>
            </button>
          </div>

        </nav>
      </div>
    
    );
}

export default NavBar;