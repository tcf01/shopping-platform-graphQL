import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import Product from './Product';
import Pagination from './Pagination';
import { clearError } from '../../redux/actions/error';
import { initiateGetProducts, initiateDeleteProduct } from '../../redux/actions/products';
import { initiateGetReviews } from '../../redux/actions/reviews';
import { GET_ALL_PRODUCTS_QUERY } from './../../utils/graphqlSchema/product/queries';

import NoProduct from '../../assets/img/no-product.png'
import Layout from '../common/Layout';
import './productList.scss'

const getSelectedProduct = (products, skuId) => {
    return products.find((product) => product.skuId === skuId)
}

const PRODUCT_EACH_ROW = 3;
const PAGE_LIMIT = 3;
const PAGE_NEIGHBOURS = 1;

const ProductsList = () => {
    const { data } = useQuery(GET_ALL_PRODUCTS_QUERY, {
        fetchPolicy: 'no-cache'
    });
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [isLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);

    const history = useHistory()
    const dispatch = useDispatch()
    const reviews = useSelector(({ reviews }) => reviews)
    const errorMsg = useSelector(({ error }) => error)

    const handleProductModalClose = () => {
        dispatch(clearError());
        setIsOpen(false);
    };

    useEffect(() => {
        setProducts(data?.getAllProducts)
    }, [data])


    console.log(currentPage)

    const onPageChanged = data => {
        const { currentPage, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentProducts = products.slice(offset, offset + pageLimit);

        setCurrentPage(currentPage)
        setCurrentProducts(currentProducts)
    }


    const handleActionBtnClick = (type, skuId, name) => {
        if (type === 'edit') {
            history.push(
                `/edit/${skuId}`,
                {
                    state: { type, skuId }
                })
        } else if (type === 'view') {
            const selectedProduct = getSelectedProduct(products, skuId)

            setSelectedProduct(selectedProduct)
            setIsOpen(!isOpen)
            dispatch(initiateGetReviews(selectedProduct.skuId))
        } else if (type === 'delete') {
            const shouldDelete = window.confirm(
                `Are you sure you want to delete product with name ${name}?`
            );
            if (shouldDelete) {
                dispatch(initiateDeleteProduct(skuId)).then(async () => {

                    //寫法1, 用.then promise chain
                    /* const data = */
                    initiateGetProducts()
                        .then(res => setProducts(res))
                        .catch(err => console.log('### it is problematic'))

                    //寫法2, 用async await
                    // const data = await initiateGetProducts()
                    // Array.isArray(data) && setProducts(data)

                    if (errorMsg === '') {
                        history.push('/');
                    }
                });
            }
        }
    };


    const propsToPass = {
        selectedProduct,
        isOpen,
        reviews,
        handleActionBtnClick,
        handleProductModalClose
    };


    //NOTE: This should write simpler
    const renderProductWithPlacement = (products) => {
        const numberOfProduct = products.length;
        const shouldRemainUnchanged = numberOfProduct > 0 && (numberOfProduct % PRODUCT_EACH_ROW) === 0
        const productsToBeRender = [...products];

        if (shouldRemainUnchanged) {
            const normalProduct = productsToBeRender.map((product, i) => {
                return <Product key={`${product.name}-${i}`} {...product} {...propsToPass} />
            })

            return normalProduct;

        } else {
            const rowNeeded = Math.floor(products.length / PRODUCT_EACH_ROW) + 1;
            const numberOfPlacement = (rowNeeded * PRODUCT_EACH_ROW) % products.length;

            const isPlacementNeeded = window.innerWidth > 991;

            if (isPlacementNeeded) {
                for (let i = 0; i < numberOfPlacement; i++) {
                    productsToBeRender.push('');
                }
            }


            const finalProductItems = productsToBeRender.map((product, i) => {
                if (product === '') {
                    return <div key={`${product.name}-${i}`} className='product-item replacement' />
                } else {
                    return <Product key={`${product.name}-${i}`} {...product} {...propsToPass} />
                }
            })

            return finalProductItems
        }
    }




    return (
        <Layout>
            {errorMsg !== '' && <p className="errorMsg">{errorMsg}</p>}
            {isLoading
                ?
                (
                    <p className="loading">Loading...</p>
                )
                : (
                    <div className='products-wrapper'>
                        {!_.isEmpty(products)
                            ?
                            <>
                                <div className='products'>
                                    {renderProductWithPlacement(currentProducts)}
                                </div>
                                <div className="page-pagination-wrapper">
                                    <Pagination totalRecords={products?.length}
                                        PAGE_LIMIT={PAGE_LIMIT}
                                        pageNeighbours={PAGE_NEIGHBOURS}
                                        onPageChanged={onPageChanged}
                                    />
                                </div>
                            </>
                            : (
                                <p className="no-result">
                                    <img src={NoProduct} alt="" />
                                </p>
                            )
                        }

                    </div>
                )}
        </Layout>
    );
}

export default ProductsList;
