import React from 'react';
import { Form, Button } from 'react-bootstrap';

import FileUpload from './fileUpload/FileUpload';
import './productForm.scss';


const ProductForm = ({ handleInputChange, handleFormSubmit, page, skuId = '', name = '', description = '', price = '', errorMsg = '', category = [], ...otherProps }) => {
  const { handleImageOnDrop } = otherProps

  return (
    <form className={'productForm'} onSubmit={handleFormSubmit} encType={'multipart/form-data'}>
      {errorMsg !== '' && <p className="errorMsg">{errorMsg}</p>}
      <Form.Group controlId="product_name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          placeholder="Enter product name"
          onChange={handleInputChange}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          placeholder="Enter product description"
          onChange={handleInputChange}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group controlId="product_price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={price}
          placeholder="Enter product price"
          onChange={handleInputChange}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={category ? category[0] : ''}
          placeholder="Enter product category"
          onChange={handleInputChange}
          autoComplete="off"
        />
      </Form.Group>

      <FileUpload maximumUpload={1} handleImageOnChange={handleImageOnDrop} />
      <Button variant="primary" type="submit">
        {page === 'add' ? 'Add Product' : 'Update Product'}
      </Button>
    </form>
  );
}


export default ProductForm
