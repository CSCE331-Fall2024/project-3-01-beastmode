import React from 'react';
import '../../../styles/kiosk.css';

const MenuBoardSide = ({name, image, calories, icons}) => {
    return (
        <div className='card g-3'>
            <div className="row">
                <div className="col-9">
                    <div className='card-body'>
                        <h1 className='card-title'>
                            {name}
                        </h1>
                    </div>
                </div>
                <div className="col-3">
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