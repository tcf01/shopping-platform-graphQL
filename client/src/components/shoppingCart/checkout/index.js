import React from 'react'
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends React.PureComponent {
    render() {
        const { handleStripeToken, label, handleNoProductSelected, isProductsChosen } = this.props;

        return (
            <StripeCheckout
                token={handleStripeToken}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            // label={label}
            >
                <Button onClick={handleNoProductSelected} disabled={isProductsChosen ? false : true}>{label}</Button>
            </StripeCheckout>
        )
    }
}

export default Checkout;