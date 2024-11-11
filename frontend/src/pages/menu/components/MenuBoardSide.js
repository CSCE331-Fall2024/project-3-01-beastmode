import React from 'react';
import '../../../styles/menu.css';

const MenuBoardSide = ({name, image, calories, icons}) => {
    return (
        <div className='card my-2'>
            <div className="row">
                <div className="col-8">
                    <div className='card-body'>
                        <h1 className='card-title dynamic-text'>
                            {name}
                        </h1>
                    </div>
                </div>
                <div className="col">
                <div className='card-body'>
                    <p className='card-text'>
                        {calories}
                    </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {image}
                </div>
                <div className="col">
                    {icons}
                </div>
            </div>
        </div>
    );
};

export default MenuBoardSide;