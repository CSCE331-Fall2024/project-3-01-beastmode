import React from 'react';
import '../../../styles/menu.css';

const MenuBoardEntree = ({name, image, calories, icons}) => {
    return (
        <div className='card my-2'>
            <div className="row">
                {name}
            </div>
            <div className="row">
                {calories}
            </div>
            <div className="row">
                <div className='col-10'>
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