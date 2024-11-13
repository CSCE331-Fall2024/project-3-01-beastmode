import React from 'react';
import '../../../styles/menu.css';

const MenuBoardEntree = ({name, image, calories, icons, isPremium, isSeasonal}) => {
    return (
        <div className='card my-2 entree-card'>
            <div className="row text-div">
                <div className='card-body'>
                    <h2 className='card-title card-entree'>
                        {name}
                        
                    </h2>
                    <p className='card-text card-entree'>
                        {calories}
                    </p>

                    
                    
                </div>
                
            </div>
            <div className="row photo-div">
                <div className='col-10 entree-image'>
                    {image}
                </div>
                <div className='col'>
                    {/* premium, wok safe icons, they be int indicating which ones and i need to add them */}

                    {(isPremium || isSeasonal) && (
                    <div className="banners-container">
                    {isPremium && (
                        <div className="banner premium-banner">P</div>
                    )}
                    {isSeasonal && (
                        <div className="banner seasonal-banner">S</div>
                    )}
                    </div>
                )}
                </div>
                
            </div>
        </div>
    );
};

export default MenuBoardEntree;