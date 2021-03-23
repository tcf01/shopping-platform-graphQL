import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from '../components/common/header';
import Footer from '../components/common/footer';
import { token } from '../utils/commonFunc';
import { authenticateUserLogin } from '../redux/actions/authenticate';
import SellerProductsList from '../components/seller/productsList';
import PrivateRoute from './privateRoute';
import Unauthorized from './privateRoute/Unauthorised';
import AddProduct from './../components/product/AddProduct';
import EditProduct from './../components/product/EditProduct';
import ProductsList from './../components/product/ProductsList';
import { DesktopPages } from '../pages';
import Demo from '../pages/demo';


const AppRouter = () => {
    const dispatch = useDispatch()

    const isSeller = useSelector(({ user }) => user.role) === 'seller'

    useEffect(() => {
        token && dispatch(authenticateUserLogin(token))
    }, [dispatch])

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact component={DesktopPages.homepage} path="/" />
                <Route exact component={ProductsList} path="/productList" />
                <Route exact component={Demo} path="/demo" />
                <Route component={DesktopPages.sellerHomePage} path="/store/:userId" />
                <Route exact component={DesktopPages.shoppingCartPage} path="/shoppingCart" />
                <Route exact component={DesktopPages.paymentMessagePage} path="/paymentMessage" />

                {isSeller ?
                    <Switch>
                        <PrivateRoute component={EditProduct} path="/edit/:id" />
                        <PrivateRoute component={AddProduct} path="/add" />
                        <PrivateRoute component={SellerProductsList} path="/myProduct" />
                    </Switch>
                    : <Unauthorized />
                }
            </Switch>

            <Footer />
        </BrowserRouter>
    );
};

export default AppRouter;
