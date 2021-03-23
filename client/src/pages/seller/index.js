import React, { useState } from 'react';
import { useParams } from 'react-router';
import { GET_PRODUCTS_BY_USER_QUERY } from '../../utils/graphqlSchema/product/queries';
import { useQuery } from "@apollo/react-hooks";
import { useCallback } from 'react';
import Category from '../../components/seller/category';
import Product from '../../components/product/Product';

import './styles.scss'
import Filter from './../../components/seller/filter/index';


const filterButtons = [
    {
        name: 'sales Desc',
        key: 'sales',
        isDesc: false
    },
    {
        name: 'publish date desc',
        key: 'createdAt',
        isDesc: false
    },
    {
        name: 'price Desc',
        key: 'price',
        isDesc: false
    },
]


const SellerHomepage = () => {
    const { userId } = useParams();
    const [category, setCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState(filterButtons)

    const filter = filterButtons.reduce((acc, button) => {
        acc[button.key] = button.isDesc ? 1 : -1
        return acc
    }, {})

    const { data } = useQuery(GET_PRODUCTS_BY_USER_QUERY, {
        variables: {
            userId,
            category,
            filter
        }
    });

    const handleOnChangeCategory = useCallback((category) => {
        setCategory(category);
    }, [setCategory])

    const filterStatusOnClick = useCallback(
        (index) => {
            const targetElem = filterStatus[index]
            targetElem.isDesc = !(targetElem.isDesc)

            setFilterStatus([...filterStatus])
        }, [filterStatus])

    return (
        <div className='seller-homepage-wrapper'>
            <div className="criteria-wrapper">
                <div className="criteria-content">
                    <div className='header-block'>Category</div>
                    <Category totalCategory={data?.getProductsByUser?.extraInfo?.category} onClickCategory={handleOnChangeCategory} />
                </div>
            </div>
            <div className="product-result-wrapper">
                <Filter buttons={filterButtons} handleFilterOnClick={filterStatusOnClick} />
                <div className="products-wrapper">
                    {data?.getProductsByUser?.products.map((product, i) => <Product key={`${product.name}-${i}`} {...product} />)}
                </div>
            </div>

        </div>
    )
}

export default SellerHomepage;