import React from "react";
import Food from '../../assets/img/homepage-feature-food.jpg'
import Clothes from '../../assets/img/homepage-feature-fashion.jpg'
import { Link } from "react-router-dom";


import './styles.scss'


const Homepage = () => {

    return (
        <div className="homepage-wrapper">
            <div className="homepage-inner-content">
                <div className="banner-section">
                    <div className="large-banner">
                        {/* <img src={BannerImage} alt="" /> */}
                        <div className="overlay"></div>
                    </div>
                    <div className="message-section">
                        <h1 className="message">
                           Come and choosing the things you like
                        </h1>
                        <div className="button-group">
                            <div className="start-button">
                                start the journey
                            </div>
                        </div>
                    </div>
                </div>
                <div className="features">
                    <h2 className={'category-header'}>Features</h2>
                    <div className="detail">
                        <div  className="food-section">
                            <Link to={'/productList'} className="image-wrapper">
                                <img src={Food} alt=""/>
                            </Link>
                            <div className="sub-header">Delicious Food</div>
                            <div className="description">Freshly made product from England farms</div>
                        </div>
                        <div className="clothing-section">
                            <Link to={'/productList'} className="image-wrapper">
                                <img src={Clothes} alt="" />
                            </Link>
                            <div className="sub-header">Festive Glamour</div>
                            <div className="description">Celebrate the holiday season in impeccable style</div>
                        </div>
                    </div>
                </div>
                {/* <div className="new-this-week">
                    <div className="category-header">
                        Five items links to product page
                    </div>

                    <div className="detail">

                    </div>
                </div> */}
            </div>
        </div>
    );
};
export default Homepage;