import React, { useState, useEffect } from 'react'
import ProductCounter from '../product/ProductCounter';
import { useDispatch } from 'react-redux';
import { removeShoppingCartProducts } from '../../redux/actions/shoppingCart';

import DefaultProductImage from '../../assets/img/default.jpg'

const ShoppingCartProduct = (productInfo) => {
    const { name, description, price, number, skuId } = productInfo
    const [productCount, setProductCount] = useState(0);
    const dispatch = useDispatch()


    useEffect(() => {
        setProductCount(number)
    }, [number])

    return (
        <div className='temporary-products'>
            <div className='item'>
                <div className="image">
                    <img alt="" src={DefaultProductImage} style={{ width: '100px', height: '50px' }} />
                </div>
                <div className="text-intro">
                    <div className="name">{name}</div>
                    <div className="description">{description}</div>
                </div>
                <div className='product-counter'>
                    <ProductCounter productCount={productCount} changeProductNumber={setProductCount} skuId={skuId} />
                </div>
                <div className="price">${price}</div>
                <div className="total-price">${price * productCount}</div>
            </div>
            <div className="cross" onClick={() => dispatch(removeShoppingCartProducts(skuId))}>X</div>
        </div>
    )
}

export default ShoppingCartProduct;