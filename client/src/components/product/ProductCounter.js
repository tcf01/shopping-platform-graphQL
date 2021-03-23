import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { updateShoppingCartProducts } from '../../redux/actions/shoppingCart';
import './productCounter.scss';


const ProductCounter = ({ skuId, productCount, changeProductNumber }) => {
    const dispatch = useDispatch()

    const handleCounterOnClick = useCallback((e) => {
        const isAdd = e.currentTarget.classList.contains('add')
        let updateProductCount = -999;


        if (isAdd) {
            updateProductCount = productCount + 1
        } else {
            updateProductCount = ((productCount - 1) > 0) ? productCount - 1 : 0
        }


        changeProductNumber(updateProductCount);
        dispatch(updateShoppingCartProducts(skuId, updateProductCount))
    }, [skuId, changeProductNumber, dispatch, productCount])

    return (
        <div className="product-counter-wrapper">
            <div className="inner-content-wrapper">
                <div className="button minus" onClick={handleCounterOnClick}> - </div>
                <div className="product-amount">{productCount}</div>
                <div className="button add" onClick={handleCounterOnClick}> + </div>
            </div>
        </div>
    )
}

export default ProductCounter;