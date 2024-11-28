import { React, useState, useEffect } from "react";
import api from '../../services/api' // Axios instance with base URL
import '../../styles/menu.css';

import Slider from "react-slick";

//components
import MenuBoardEntree from "./components/MenuBoardEntree";

function MenuMain2() {

  // Entrees state
  const [entrees, setEntrees] = useState([]);

  // loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Database Entree Fetch
  useEffect(() => {
    const fetchEntrees = async () => {
      try {
        const response = await api.get('/menu/entrees'); 
        setEntrees(response.data);
      } catch (err) {
        setError('Failed to fetch menu items. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrees();
  }, []);

  const formatProductName = (name) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000
  };

  // if not more than 15 entrees, one page, else, carousel for the entrees
  if (entrees.at(16)){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="row row-style-1">
            <h1>Entrees</h1>
          </div>
          <div className="row entree-row">
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(0).product_name)}
                    image={<img src ={entrees[0].image} />} 
                    calories={entrees[0].calories + " cal"} 
                    isPremium={entrees[0].is_premium} 
                    isSeasonal={entrees[0].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(1).product_name)}
                    image={<img src ={entrees[1].image} />} 
                    calories={entrees[1].calories + " cal"} 
                    isPremium={entrees[1].is_premium} 
                    isSeasonal={entrees[1].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(2).product_name)}
                    image={<img src ={entrees[2].image} />} 
                    calories={entrees[2].calories + " cal"} 
                    isPremium={entrees[2].is_premium} 
                    isSeasonal={entrees[2].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(3).product_name)}
                    image={<img src ={entrees[3].image} />} 
                    calories={entrees[3].calories + " cal"} 
                    isPremium={entrees[3].is_premium} 
                    isSeasonal={entrees[3].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(4).product_name)}
                    image={<img src ={entrees[4].image} />} 
                    calories={entrees[4].calories + " cal"} 
                    isPremium={entrees[4].is_premium} 
                    isSeasonal={entrees[4].is_seasonal}
                    />
            </div>
          </div>
          <div className="row entree-row">
          <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(5).product_name)}
                    image={<img src ={entrees[5].image} />} 
                    calories={entrees[5].calories + " cal"} 
                    isPremium={entrees[5].is_premium} 
                    isSeasonal={entrees[5].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(6).product_name)}
                    image={<img src ={entrees[6].image} />} 
                    calories={entrees[6].calories + " cal"} 
                    isPremium={entrees[6].is_premium} 
                    isSeasonal={entrees[6].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(7).product_name)}
                    image={<img src ={entrees[7].image} />} 
                    calories={entrees[7].calories + " cal"} 
                    isPremium={entrees[7].is_premium} 
                    isSeasonal={entrees[7].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(8).product_name)}
                    image={<img src ={entrees[8].image} />} 
                    calories={entrees[8].calories + " cal"} 
                    isPremium={entrees[8].is_premium} 
                    isSeasonal={entrees[8].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(9).product_name)}
                    image={<img src ={entrees[9].image} />} 
                    calories={entrees[9].calories + " cal"} 
                    isPremium={entrees[9].is_premium} 
                    isSeasonal={entrees[9].is_seasonal}
                    />
            </div>
          </div>
          <div className="row entree-row">
          <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(10).product_name)}
                    image={<img src ={entrees[10].image} />} 
                    calories={entrees[10].calories + " cal"} 
                    isPremium={entrees[10].is_premium} 
                    isSeasonal={entrees[10].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(11).product_name)}
                    image={<img src ={entrees[11].image} />} 
                    calories={entrees[11].calories + " cal"} 
                    isPremium={entrees[11].is_premium} 
                    isSeasonal={entrees[11].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(12).product_name)}
                    image={<img src ={entrees[12].image} />} 
                    calories={entrees[12].calories + " cal"} 
                    isPremium={entrees[12].is_premium} 
                    isSeasonal={entrees[12].is_seasonal}
                    />
            </div>
            <div className="col">
              {MenuBoardEntree[13] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(13).product_name)}
                    image={<img src ={entrees[13].image} />} 
                    calories={entrees[13].calories + " cal"} 
                    isPremium={entrees[13].is_premium} 
                    isSeasonal={entrees[13].is_seasonal}
                    />
              </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[14] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(14).product_name)}
                    image={<img src ={entrees[14].image} />} 
                    calories={entrees[14].calories + " cal"} 
                    isPremium={entrees[14].is_premium} 
                    isSeasonal={entrees[14].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {

    return (
      <Slider {...settings}>
      <div className="container-fluid">
        <div className="row">
          <div className="row row-style-1">
            <h1>Entrees</h1>
          </div>
          <div className="row entree-row">
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(0).product_name)}
                    image={<img src ={entrees[0].image} />} 
                    calories={entrees[0].calories + " cal"} 
                    isPremium={entrees[0].is_premium} 
                    isSeasonal={entrees[0].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(1).product_name)}
                    image={<img src ={entrees[1].image} />} 
                    calories={entrees[1].calories + " cal"} 
                    isPremium={entrees[1].is_premium} 
                    isSeasonal={entrees[1].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(2).product_name)}
                    image={<img src ={entrees[2].image} />} 
                    calories={entrees[2].calories + " cal"} 
                    isPremium={entrees[2].is_premium} 
                    isSeasonal={entrees[2].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(3).product_name)}
                    image={<img src ={entrees[3].image} />} 
                    calories={entrees[3].calories + " cal"} 
                    isPremium={entrees[3].is_premium} 
                    isSeasonal={entrees[3].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(4).product_name)}
                    image={<img src ={entrees[4].image} />} 
                    calories={entrees[4].calories + " cal"} 
                    isPremium={entrees[4].is_premium} 
                    isSeasonal={entrees[4].is_seasonal}
                    />
            </div>
          </div>
          <div className="row entree-row">
          <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(5).product_name)}
                    image={<img src ={entrees[5].image} />} 
                    calories={entrees[5].calories + " cal"} 
                    isPremium={entrees[5].is_premium} 
                    isSeasonal={entrees[5].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(6).product_name)}
                    image={<img src ={entrees[6].image} />} 
                    calories={entrees[6].calories + " cal"} 
                    isPremium={entrees[6].is_premium} 
                    isSeasonal={entrees[6].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(7).product_name)}
                    image={<img src ={entrees[7].image} />} 
                    calories={entrees[7].calories + " cal"} 
                    isPremium={entrees[7].is_premium} 
                    isSeasonal={entrees[7].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(8).product_name)}
                    image={<img src ={entrees[8].image} />} 
                    calories={entrees[8].calories + " cal"} 
                    isPremium={entrees[8].is_premium} 
                    isSeasonal={entrees[8].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(9).product_name)}
                    image={<img src ={entrees[9].image} />} 
                    calories={entrees[9].calories + " cal"} 
                    isPremium={entrees[9].is_premium} 
                    isSeasonal={entrees[9].is_seasonal}
                    />
            </div>
          </div>
          <div className="row entree-row">
          <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(10).product_name)}
                    image={<img src ={entrees[10].image} />} 
                    calories={entrees[10].calories + " cal"} 
                    isPremium={entrees[10].is_premium} 
                    isSeasonal={entrees[10].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(11).product_name)}
                    image={<img src ={entrees[11].image} />} 
                    calories={entrees[11].calories + " cal"} 
                    isPremium={entrees[11].is_premium} 
                    isSeasonal={entrees[11].is_seasonal}
                    />
            </div>
            <div className="col">
              <MenuBoardEntree
                    name={formatProductName(entrees.at(12).product_name)}
                    image={<img src ={entrees[12].image} />} 
                    calories={entrees[12].calories + " cal"} 
                    isPremium={entrees[12].is_premium} 
                    isSeasonal={entrees[12].is_seasonal}
                    />
            </div>
            <div className="col">
              {MenuBoardEntree[13] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(13).product_name)}
                    image={<img src ={entrees[13].image} />} 
                    calories={entrees[13].calories + " cal"} 
                    isPremium={entrees[13].is_premium} 
                    isSeasonal={entrees[13].is_seasonal}
                    />
              </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[14] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(14).product_name)}
                    image={<img src ={entrees[14].image} />} 
                    calories={entrees[14].calories + " cal"} 
                    isPremium={entrees[14].is_premium} 
                    isSeasonal={entrees[14].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid">
        <div className="row">
          <div className="row row-style-1">
            <h1>Entrees</h1>
          </div>
          <div className="row entree-row">
          <div className="col">
            {MenuBoardEntree[15] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(15).product_name)}
                    image={<img src ={entrees[15].image} />} 
                    calories={entrees[15].calories + " cal"} 
                    isPremium={entrees[15].is_premium} 
                    isSeasonal={entrees[15].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[16] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(16).product_name)}
                    image={<img src ={entrees[16].image} />} 
                    calories={entrees[16].calories + " cal"} 
                    isPremium={entrees[16].is_premium} 
                    isSeasonal={entrees[16].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[17] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(17).product_name)}
                    image={<img src ={entrees[17].image} />} 
                    calories={entrees[17].calories + " cal"} 
                    isPremium={entrees[17].is_premium} 
                    isSeasonal={entrees[17].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[18] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(18).product_name)}
                    image={<img src ={entrees[18].image} />} 
                    calories={entrees[18].calories + " cal"} 
                    isPremium={entrees[18].is_premium} 
                    isSeasonal={entrees[18].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[19] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(19).product_name)}
                    image={<img src ={entrees[19].image} />} 
                    calories={entrees[19].calories + " cal"} 
                    isPremium={entrees[19].is_premium} 
                    isSeasonal={entrees[19].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[20] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(20).product_name)}
                    image={<img src ={entrees[20].image} />} 
                    calories={entrees[20].calories + " cal"} 
                    isPremium={entrees[20].is_premium} 
                    isSeasonal={entrees[20].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[21] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(21).product_name)}
                    image={<img src ={entrees[21].image} />} 
                    calories={entrees[21].calories + " cal"} 
                    isPremium={entrees[21].is_premium} 
                    isSeasonal={entrees[21].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[22] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(22).product_name)}
                    image={<img src ={entrees[22].image} />} 
                    calories={entrees[22].calories + " cal"} 
                    isPremium={entrees[22].is_premium} 
                    isSeasonal={entrees[22].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[23] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(23).product_name)}
                    image={<img src ={entrees[23].image} />} 
                    calories={entrees[23].calories + " cal"} 
                    isPremium={entrees[23].is_premium} 
                    isSeasonal={entrees[23].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[24] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(24).product_name)}
                    image={<img src ={entrees[24].image} />} 
                    calories={entrees[24].calories + " cal"} 
                    isPremium={entrees[24].is_premium} 
                    isSeasonal={entrees[24].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[25] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(25).product_name)}
                    image={<img src ={entrees[25].image} />} 
                    calories={entrees[25].calories + " cal"} 
                    isPremium={entrees[25].is_premium} 
                    isSeasonal={entrees[25].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[26] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(26).product_name)}
                    image={<img src ={entrees[26].image} />} 
                    calories={entrees[26].calories + " cal"} 
                    isPremium={entrees[26].is_premium} 
                    isSeasonal={entrees[26].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[27] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(27).product_name)}
                    image={<img src ={entrees[27].image} />} 
                    calories={entrees[27].calories + " cal"} 
                    isPremium={entrees[27].is_premium} 
                    isSeasonal={entrees[27].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[28] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(28).product_name)}
                    image={<img src ={entrees[28].image} />} 
                    calories={entrees[28].calories + " cal"} 
                    isPremium={entrees[28].is_premium} 
                    isSeasonal={entrees[28].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
            <div className="col">
            {MenuBoardEntree[29] ? (
                <div>
              <MenuBoardEntree
                    name={formatProductName(entrees.at(29).product_name)}
                    image={<img src ={entrees[29].image} />} 
                    calories={entrees[29].calories + " cal"} 
                    isPremium={entrees[29].is_premium} 
                    isSeasonal={entrees[29].is_seasonal}
                    />
                </div>
                    ) :
                    (<div></div>)

                  }
            </div>
          </div>
        </div>
      </div>
      </Slider>
    );

  }
}

export default MenuMain2;
