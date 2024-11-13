import React from 'react';
import '../../../styles/menu.css';

const MenuBoardDrinks = ({name, price}) => {
    return (
        <div className='card my-2 extra-drinks-card'>
            <div className="row text-div">
                <div className='col-9 card-body'>
                    <h4 className='card-title card-drink'>
                        {name}
                    </h4>
                </div>
                <div className='col-3 card-body'>
                    <p className='card-text card-drink'>
                        {price}
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default MenuBoardDrinks;