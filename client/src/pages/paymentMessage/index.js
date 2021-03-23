import React from 'react';
import { useLocation } from 'react-router';

const useSuitableInfo = () => {
    const query = useLocation();

    if (query === 'success') {
        return {
            status: 'success',
            message: 'Payment succeed. You can go to "order" page to check the status',
            // Image
        }
    }
}


const PaymentMessagePage = () => {
    const detail = useSuitableInfo()

    return (
        <div className='payment-message-page-wrapper'>
            <div className={`payment ${detail.status}`}>
                <div className="status-pic">

                </div>
                <div className="msg">{detail.message}</div>
            </div>
        </div>
    )
}

export default PaymentMessagePage;