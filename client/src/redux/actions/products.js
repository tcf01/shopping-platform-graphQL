import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT
} from '../../utils/constants';
import {
    GET_ALL_PRODUCTS_QUERY,
    GET_ONE_PRODUCT_QUERY
} from '../../utils/graphqlSchema/product/queries';
import {
    ADD_PRODUCT_MUTATION,
    EDIT_PRODUCT_MUTATION,
    DELETE_PRODUCT_MUTATION,
} from '../../utils/graphqlSchema/product//mutations';
import { getClient } from '../../utils/client';

import { getError, clearError } from './error';

export const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    };
};

export const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    };
};

export const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    };
};

export const deleteProduct = (product) => {
    return {
        type: DELETE_PRODUCT,
        product
    };
};


export const getOneProduct = (skuId) => {
    const client = getClient()
    const graphQLOption = {
        query: GET_ONE_PRODUCT_QUERY,
        variables: {
            skuId
        }
    }

    const data = client.query(graphQLOption).then(res => res.data.specificProduct);

    return data;
}

export const initiateGetProducts = (userId) => {
    const variables = userId ? { userId } : {}
    const client = getClient()
    const graphQLOption = {
        query: GET_ALL_PRODUCTS_QUERY,
        variables
    }

    const data = client.query(graphQLOption).then(res => res.data.products)
    return data
};

/* export const addProductImages = (files) => {
    return dispatch => {
        const client = getClient(dispatch);
        const graphQLOption = {
            mutation: UPLOAD_IMAGES,
            variables: {
                files
            }
        }
        const imagesPath = client.mutate(graphQLOption).then(res => res.data);

        return imagesPath
    }
} */

export const initiateAddProduct = (productInfo) => {
    return (dispatch) => {
        const client = getClient(dispatch);

        return client
            .mutate({
                mutation: ADD_PRODUCT_MUTATION,
                variables: productInfo
            })
            .then((response) => {
                if (response) {
                    dispatch(clearError());
                    return dispatch(addProduct(response.data.addProduct));
                }
            })
            .catch(
                (error) => error.response && dispatch(getError(error.response.data))
            );
    };
};

export const initiateEditProduct = (product) => {
    return (dispatch) => {
        const client = getClient(dispatch);

        return client
            .mutate({
                mutation: EDIT_PRODUCT_MUTATION,
                variables: product
            })
            .then((response) => {
                if (response) {
                    dispatch(clearError());
                    return dispatch(editProduct(response.data.editProduct));
                }
            })
            .catch(
                (error) => error.response && dispatch(getError(error.response.data))
            );
    };
};



export const initiateDeleteProduct = (skuId) => {
    return (dispatch) => {
        const client = getClient(dispatch);

        const variables = {
            skuId
        };

        const data = client.mutate({ mutation: DELETE_PRODUCT_MUTATION, variables })

        return data;
    };
};