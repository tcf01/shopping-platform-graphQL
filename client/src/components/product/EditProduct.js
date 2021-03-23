import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';


import Layout from '../common/Layout';
import ProductForm from './ProductForm';
// import { getOneProduct } from '../../redux/actions/products';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from 'react-apollo';
import { EDIT_PRODUCT_MUTATION } from '../../utils/graphqlSchema/product/mutations';
import { GET_ONE_PRODUCT_QUERY } from '../../utils/graphqlSchema/product/queries';



const EditProduct = () => {
  const [errorMsg] = useState('')
  const [product, setProduct] = useState({})

  const skuId = useParams().id
  const history = useHistory()

  const targetProduct = useQuery(GET_ONE_PRODUCT_QUERY, { variables: { skuId } })
  const [editProduct] = useMutation(EDIT_PRODUCT_MUTATION)


  /* const checkErrorMsg = () => {
    if (props.error === errorMsg) {
      setErrorMsg(props.error);
    }
  } */

  const handlePriceChange = (name, value) => {
    if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setProduct({
        ...product,
        [name]: value
      })
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'price') {
      handlePriceChange(name, value)
    } else if (name === 'category') {
      let newCategory = [];
      newCategory.push(`${value}`)

      setProduct({
        ...product, [name]: newCategory
      })
    } else {
      setProduct({
        ...product, [name]: value
      })
    }
  };


  useEffect(() => {
    if (targetProduct.data) {
      setProduct(targetProduct?.data?.specificProduct)
    }

    // checkErrorMsg()
  }, [targetProduct])


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await editProduct({
      variables: {
        ...product, userId: product.user._id, files: product.images || [], price: parseFloat(product.price)
      }
    })

    if (res.data.editProduct.skuId) {
      history.push('/productList');
    }
  };

  const handleImageUpload = (e) => {
    //change FileList to Array;
    const files = Array.from(e.target.files)

    setProduct({
      ...product,
      files
    })
  }

  return (
    <Layout>
      {product ?
        <ProductForm
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleImageUpload={handleImageUpload}
          {...product}
          page="edit"
          errorMsg={errorMsg}
        />
        :
        <Redirect to="/" />
      }
    </Layout>
  );
}


/* const mapStateToProps = (state, props) => {
  return {
    product: state.products.find(
      (product) => product.skuId === props.location.state.skuId
    ),
    error: state.error
  };
}; */

export default /* connect(mapStateToProps) */(EditProduct);
