import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import SellerHeader from '../../seller';
import UserOperationSection from '../../login/UserOperationSection';
import { ReactComponent as ShoppingCart } from '../../../assets/img/shopping-cart.svg'
import './header.scss'

const roleRelatedHeader = (role) => {
    if (role === 'seller') {
        return <SellerHeader />
    }
}

const Header = () => {
    const isHomepage = useLocation().pathname === "/";
    const recentRole = useSelector(({ user }) => user.role)
    const history = useHistory();
    const isSeller = recentRole === 'seller'
    const productsNumber = useSelector(({ shoppingCart }) => shoppingCart.shoppingCartProducts.reduce((acc, product) => {
        acc += product.number
        return acc
    }, 0))

    useEffect(() => {
        roleRelatedHeader(recentRole)
    }, [recentRole])

    return (
        <div className={`header ${isHomepage ? 'homepageHeader' : ''}`}>
            <div className="header-content">
                <h1 className="title">
                    <Link to="/">XYZ</Link>
                </h1>
                <div className="nav-tab-wrapper">
                    <div className="links">
                        <Link to="/productList">Products List</Link>

                        {isSeller && (
                            <div className="roleRelatedHeader">
                                {roleRelatedHeader(recentRole)}
                            </div>
                        )}
                    </div>

                    <div>
                        <UserOperationSection recentRole />
                    </div>
                    <div className="shopping-cart-icon-wrapper" onClick={() => history.push('/shoppingCart')}>
                        <ShoppingCart />
                        <div className="product-number">{productsNumber}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;