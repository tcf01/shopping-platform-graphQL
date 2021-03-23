import { CLEAR_SHOPPING_CART, ADD_PRODUCT_TO_SHOPPING_CART, REMOVE_PRODUCT_FROM_SHOPPING_CART, UPDATE_SHOPPING_CART_PRODUCT } from './../../utils/constants';


export const addProductToShoppingCart = product => {
    return {
        type: ADD_PRODUCT_TO_SHOPPING_CART,
        product
    }
}

export const removeShoppingCartProducts = skuId => {
    return {
        type: REMOVE_PRODUCT_FROM_SHOPPING_CART,
        skuId
    }
}

export const updateShoppingCartProducts = (skuId, productCount) => {
    return {
        type: UPDATE_SHOPPING_CART_PRODUCT,
        skuId,
        productCount
    }
}

export const clearShoppingCart = () => {
    return {
        type: CLEAR_SHOPPING_CART
    }
}
