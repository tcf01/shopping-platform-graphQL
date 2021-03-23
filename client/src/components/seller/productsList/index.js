import React, { useCallback } from 'react';
import { useSelector } from 'react-redux'
import useInitApi from '../../../hook/useInitApi';
import { initiateGetProducts } from '../../../redux/actions/products';

const SellerProductsList = () => {
    const userId = useSelector(({ user }) => user._id)
    const initGetProductsForSeller = useCallback(() => initiateGetProducts(userId), [userId])
    const { data } = useInitApi(initGetProductsForSeller)

    return (
        <div>
            <div className="seller-products-list-wrapper">
                {data?.length > 0 && data.map(product => {
                    const { name, id } = product;
                    return (
                        <div key={`${name}-${id}`} className='product-item'>{name}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default SellerProductsList;