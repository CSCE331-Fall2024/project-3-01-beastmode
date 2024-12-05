import React, { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../../styles/menu.css';

import MenuMain1 from "./MenuPage1";
import MenuMain2 from "./MenuPage2";
import MenuMain3 from "./MenuPage3";


const MenuCarousel = () => {

  // Play/Pause State
  const [play, setPlay] = useState(true);
  // Ref to access slick fcns
  const carouselRef = useRef(null);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  const toggleAutoplay = () => {
    // console.log(play)
    setPlay(!play);
    if (carouselRef.current) {
      play ? carouselRef.current.slickPause() : carouselRef.current.slickPlay();
    }
  };

  return (
    <div className="fullscreen-menu">
      {
        <Slider ref={carouselRef} {...settings}>
          <div>
            <MenuMain1 />
          </div>
          <div>
            <MenuMain2 />
          </div>
          <div>
            <MenuMain3 />
          </div>
        </Slider>
      }

      <button className="carousel-button" onClick={() => toggleAutoplay()}>
        {play ? "Turn Off Autoplay" : "Turn On Autoplay"}
      </button>

    </div>

  );
};

export default MenuCarousel;
