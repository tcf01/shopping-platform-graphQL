import { gql } from '@apollo/client';


export const ADD_PRODUCT_MUTATION = gql`
  mutation addProduct($category: [String]!, $name: String!, $description: String!, $price: Float! $userId: String!, $files: [FileProps]!) {
    addProduct(data:{name: $name, description: $description, price: $price, userId: $userId, files: $files, category: $category }
    ) {
      skuId
      name
      description
      price
      user{
        _id
      }
      images{
        path
      },
    }
  }
`;

export const EDIT_PRODUCT_MUTATION = gql`
  mutation($skuId: ID!,$userId: String!, $name: String!, $description: String!, $price: Float!, $files: [String]!, $category: [String]! ) {
    editProduct(
      data: {category: $category, skuId: $skuId, name: $name, description: $description, price: $price, userId: $userId, files: $files }
    ) {
      skuId
      name
      description
      user{
        _id, 
        username
      }
      price
      images{
        path
      }
      # updatedAt
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation($skuId: ID!) {
    deleteProduct(skuId: $skuId) {
      skuId
      name
      description
      price
      # updatedAt
    }
  }
`;

export const ADD_REVIEW_MUTATION = gql`
  mutation($skuId: ID!, $title: String!, $comment: String!) {
    addReview(skuId: $skuId, data: { title: $title, comment: $comment }) {
      _id
      title
      comment
      # updatedAt
    }
  }
`;

export const DELETE_REVIEW_MUTATION = gql`
  mutation($reviewId: ID!) {
    deleteReview(reviewId: $reviewId)
  }
`;