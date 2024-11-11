import React from 'react';
import '../../../styles/menu.css';

const MenuBoardEntree = ({name, image, calories, icons}) => {
    return (
        <div className='card my-2'>
            <div className="row">
                <div className='card-body'>
                    <h2 className='card-title card-entree'>
                        {name}
                    </h2>
                    <p className='card-text card-entree'>
                        {calories}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className='col-10 entree-image'>
                    {image}
                </div>
                <div className='col'>
                    {/* premium, wok safe icons, they be int indicating which ones and i need to add them */}
                </div>
            </div>
        </div>
    );
};

export default MenuBoardEntree;