import React from 'react';
import '../../../styles/menu.css';

const MenuBoardHowTo = ({name, image, calories, description, price}) => {
    return (
        <div className='card my-2'>
            <div className="row">
                <div className="col">
                    {image}
                </div>
                <div className="col-6">
                    <div className='card-body'>
                        <h1 className='card-title'>
                            {name}
                        </h1>
                        <h3 className='card-subtitle'>
                            {description}
                        </h3>
                        <p className='card-text'>
                            {calories}
                        </p>
                    </div>
                </div>
                <div className="col">
                    <p>
            
                    </p>
                    <h5>
                        starts at
                    </h5>
                    <h3>
                        {price}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default MenuBoardHowTo;