import React from 'react';
import { useHistory } from 'react-router';
import { useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from 'react-redux';

import './index.scss'
import Checkout from './checkout'
import ShoppingCartProduct from './ShoppingCartProduct';
// import { useCheckLoginStatus } from '../../utils/commonFunc';
import { clearShoppingCart } from '../../redux/actions/shoppingCart';
import { CREDIT_CARD_PAYMENT_STRIPE } from '../../utils/graphqlSchema/payment/mutation';


/* const useCheckLogin = () => {
    const isLogin = useCheckLoginStatus()

    if (!isLogin) {
        document.querySelector('.login-button-wrapper').click();
        return false;
    } else {
        return true;
    }
} */


const useShoppingCartInfo = () => {
    const shoppingCartStoreObj = useSelector(({ shoppingCart }) => shoppingCart);
    const totalProductPrices = shoppingCartStoreObj.shoppingCartProducts.reduce((acc, product) => {
        acc += (product.number) * (product.price);
        return acc
    }, 0)

    return {
        shoppingCartProducts: shoppingCartStoreObj.shoppingCartProducts,
        totalProductPrices
    }
}

const renderChosenProducts = (chosenProducts) => {
    return chosenProducts.map((chosenProduct, i) => (
        <ShoppingCartProduct key={i} {...chosenProduct} />)
    )
}


const ShoppingCart = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [handlePayment] = useMutation(CREDIT_CARD_PAYMENT_STRIPE);

    const { shoppingCartProducts, totalProductPrices } = useShoppingCartInfo();
    const isProductsChosen = shoppingCartProducts.length > 0;
    const userId = useSelector(({ user }) => user._id)

    const handleNoProductSelected = (e) => {
        if (!isProductsChosen) {
            e.stopPropagation()
        };
    }

    const getTheStripeToken = async (stripeResObj) => {
        const { data: { payWithCreditCardStripe: { stripeId } } } = await handlePayment({
            variables: {
                userId,
                stripeToken: stripeResObj.id,
                checkoutProduct: shoppingCartProducts
            }
        })

        if (stripeId) {
            dispatch(clearShoppingCart());
            history.push('/paymentStatus?status=success');
        } else {
            history.push('/paymentStatus?status=fail');
        }
    };


    return (
        <div className="shopping-cart-wrapper">
            <div className="inner-content-wrapper">
                {isProductsChosen
                    ?
                    renderChosenProducts(shoppingCartProducts)
                    :
                    <div style={{ textAlign: 'center' }}>There is no chosen products</div>
                }
                <br />
                <br />
                <hr />
                <br />
                <div className="checkout-section">
                    <div className="price-section">
                        <div className="sub-header">Overall Price:</div>
                        <div className="all-products-price">${totalProductPrices}</div>
                    </div>
                    <Checkout isProductsChosen={isProductsChosen} handleNoProductSelected={handleNoProductSelected} label='Checkout Now' handleStripeToken={getTheStripeToken} />
                </div>
            </div>
        </div>

    )
}

export default ShoppingCart