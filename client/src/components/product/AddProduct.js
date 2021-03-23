import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';

import Layout from '../common/Layout';
import ProductForm from './ProductForm';
// import { initiateAddProduct } from '../../redux/actions/products';
import { ADD_PRODUCT_MUTATION } from '../../utils/graphqlSchema/product/mutations';


const AddProduct = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [product, setProduct] = useState({})

  const history = useHistory()
  const errorFromStore = useSelector(({ error }) => error)
  const user = useSelector(({ user }) => user)

  const [addProduct] = useMutation(ADD_PRODUCT_MUTATION);


  useEffect(() => {
    const recentError = errorMsg

    if (recentError !== errorFromStore) {
      setErrorMsg(errorFromStore)
    }
  }, [errorFromStore, errorMsg])

  const updateOnDropImage = (filesPathArray) => {
    const isArray = Array.isArray(filesPathArray);

    if (isArray) {
      setProduct({
        ...product,
        files: filesPathArray
      })
    }
  }

  const updatePrice = (name, value) => {
    if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setProduct({
        ...product,
        [name]: value
      })
    }
  }

  const updateTextInput = (event) => {
    const { name, value } = event.target;

    if (name === 'price') {
      updatePrice(name, value)
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

  const uploadFilesToServer = async () => {
    const formData = new FormData();
    formData.append('file', product.files[0])
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/auto/upload`, formData)

    return [{
      assetId: res.data.asset_id,
      path: res.data.secure_url
    }]
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const filePaths = await uploadFilesToServer();


    debugger
    const variables = {
      ...product,
      userId: user._id,
      files: filePaths || [],
      price: parseFloat(product.price)
    };

    const res = await addProduct({
      variables
    })


    if (res.data.addProduct) {
      history.push('/productList');
    }

    // dispatch(initiateAddProduct())
    //   .then(() => {
    //     if (errorMsg === '') {
    //       const { history } = this.props;

    //     }
    //   });
  };

  return (
    <Layout>
      <ProductForm
        handleImageOnDrop={updateOnDropImage}
        handleInputChange={updateTextInput}
        handleFormSubmit={handleFormSubmit}
        {...product}
        page="add"
        errorMsg={errorMsg}
      />
    </Layout>
  );
}

export default AddProduct;
