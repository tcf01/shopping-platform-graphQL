import { gql } from 'apollo-boost';

export const CREDIT_CARD_PAYMENT_STRIPE = gql`
    mutation ($userId: String!, $stripeToken: String!, $checkoutProduct: [CheckoutProduct!]!){
        payWithCreditCardStripe(userId: $userId, stripeToken: $stripeToken, checkoutProduct: $checkoutProduct){
            username
            stripeId
        }
    }
`
