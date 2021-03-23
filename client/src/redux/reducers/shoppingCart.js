import { ADD_PRODUCT_TO_SHOPPING_CART, CLEAR_SHOPPING_CART, REMOVE_PRODUCT_FROM_SHOPPING_CART, UPDATE_SHOPPING_CART_PRODUCT } from './../../utils/constants';

const initialState = {
    shoppingCartProducts: []
}

const shoppingCartReducer = (state = initialState, action) => {
    const newProduct = [...state.shoppingCartProducts]

    switch (action.type) {
        case ADD_PRODUCT_TO_SHOPPING_CART:
            const productIndex = state.shoppingCartProducts.findIndex(elem => elem.skuId === action.product.skuId);

            if (productIndex !== -1) {
                newProduct[productIndex].number += action.product.number
            } else {
                newProduct.push(action.product);
            }

            return {
                ...state,
                shoppingCartProducts: newProduct
            }
        case REMOVE_PRODUCT_FROM_SHOPPING_CART:
            return {
                ...state,
                shoppingCartProducts: state.shoppingCartProducts.filter(product => product.skuId !== action.skuId)
            }

        case UPDATE_SHOPPING_CART_PRODUCT:
            const targetUpdateProduct = state.shoppingCartProducts.findIndex(elem => elem.skuId === action.skuId);

            if (targetUpdateProduct !== -1) {
                newProduct[targetUpdateProduct].number = action.productCount
            }

            return {
                ...state,
                shoppingCartProducts: newProduct
            }
        case CLEAR_SHOPPING_CART:
            return {
                ...state,
                shoppingCartProducts: []
            };
        default:
            return state
    }
}

export default shoppingCartReducer