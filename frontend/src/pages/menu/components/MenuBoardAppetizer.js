import React from 'react';
import '../../../styles/menu.css';

const MenuBoardAppetizer = ({name, image, smPrice, mdPrice, lgPrice, isPremium, isSeasonal}) => {
    return (
        <div className='card my-2 appetizer-card'>
            <div className="row text-div">
                <div className='card-body'>
                    <h2 className='card-title card-appetizer'>
                        {name}
                        
                    </h2>
                    <div className='col'>
                    {/* premium, wok safe icons, they be int indicating which ones and i need to add them */}

                        {(isPremium || isSeasonal) && (
                        <div className="banners-container-app">
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
            <div className="row">
                <div className='col-1'></div>
                <div className='col-5'>
                    <table className="col-6 table drinks-table">
                        <thead>
                        <tr>
                            <th scope="col">  </th>
                            <th scope="col">  </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row"> Sm </th>
                            <td> {smPrice} </td>
                        </tr>
                        <tr>
                            <th scope="row"> Med </th>
                            <td> {smPrice} </td>
                        </tr>
                        <tr>
                            <th scope="row"> Lg </th>
                            <td> {smPrice} </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className='col-6 app-image'>
                    {image}
                </div>
            </div>
            
        </div>
    );
};

export default MenuBoardAppetizer;