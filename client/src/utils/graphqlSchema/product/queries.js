import { gql } from 'apollo-boost';


export const GET_PRODUCTS_BY_USER_QUERY = gql`
  query ($userId: String!, $category: String! $filter: Filter){
    getProductsByUser(userId: $userId, category: $category, filter: $filter ) {
      products{
      skuId
      name
      images{
        assetId
        path
      }
      description
      price
      # updatedAt
      }
      extraInfo{
        category
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_QUERY = gql`
  query{
    getAllProducts {
      skuId
      name
      description
      price
      images{
        path
      }
      user{
        _id
        username
      }
    }
  }
`;

export const GET_ONE_PRODUCT_QUERY = gql`
  query ($skuId: String){
    specificProduct(skuId: $skuId) {
      skuId
      name
      description
      price
      images{
        path
      }
      category
      user{
        _id
      }
      # updatedAt
    }
  }
`;

//NOTE:we need to pass the dynamic data entered by the user所以係同Playground寫既有少少唔同: 
// mutation {
//     addProduct(
//         skuId: "1234",
//         data: {
//         name: "Shoes", description: "Nice Shoes",
//         price: 3900
//     }) {
//         skuId
//         name
//         description
//         price
//         updatedAt
//     }
// }






/* REVIEWS */
export const GET_REVIEWS_QUERY = gql`
  query($skuId: ID!) {
    reviews(skuId: $skuId) {
      _id
      title
      comment
      updatedAt
    }
  }
`;




