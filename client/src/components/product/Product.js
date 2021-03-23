import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import ProductModal from './ProductModal'
import ProductCounter from './ProductCounter';
import { addProductToShoppingCart } from './../../redux/actions/shoppingCart';

import './product.scss'


const Product = (props) => {
    const dispatch = useDispatch();
    const [productCount, setProductCount] = useState(0);
    const isSeller = useSelector(({ user }) => user.role)?.indexOf('seller') > -1;
    const { images, reviews, name, skuId, description, price, handleActionBtnClick, handleProductModalClose, isOpen, selectedProduct, user } = props
    const history = useHistory()
    const isShowSellerName = user?.username !== undefined;

    const handleAddToCartOnClick = () => {
        if (productCount === 0) return;

        const cartProductInfo = {
            name,
            skuId,
            description,
            price,
            number: productCount
        }

        dispatch(addProductToShoppingCart(cartProductInfo));
        setProductCount(0);
    }

    return (
        <React.Fragment>
            <div className="product-item">
                <div className='product-inner-wrapper' data-skuid={skuId}>
                    <div className="image">
                        <img src={images[0].path} alt="" />
                    </div>
                    <div className="info-section">
                        <div className="text">
                            <div className='name'>{name}</div>
                            <div className='price'>${price.toFixed(2)}</div>
                        </div>
                        <div className='description'>{description}</div>
                    </div>

                    <div className="buttons-group">
                        <ProductCounter productCount={productCount} changeProductNumber={setProductCount} /* handleCounterOnClick={handleCounterOnClick} */ />
                        <div className='buttons'>
                            <Button variant='info' type='submit' size='sm' onClick={() => handleActionBtnClick('view', skuId)}>
                                View
                            </Button>
                            {
                                isSeller &&
                                <Button variant='secondary' type='submit' size='sm' onClick={() => handleActionBtnClick('edit', skuId)}>
                                    Edit
                                </Button>
                                /*
                             <Button variant='danger' type='submit' size='sm' onClick={() => handleActionBtnClick('delete', skuId, name)}>
                            Delete
                            </Button> */
                            }
                            <Button variant='danger' type='submit' size='sm' onClick={handleAddToCartOnClick}>
                                Add To Cart
                            </Button>

                        </div>

                        {isShowSellerName &&
                            (
                                <div className="seller-info-wrapper">
                                    <div className="store-icon" />
                                    <div className="seller-name"><span onClick={() => history.push(`/store/${user?._id}`)
                                    }>{user?.username}</span></div>
                                </div>
                            )
                        }
                    </div>
                    <ProductModal isOpen={isOpen} handleProductModalClose={handleProductModalClose} {...selectedProduct} reviews={reviews} />
                </div>
            </div>
        </React.Fragment >
    )
}
export default Product
