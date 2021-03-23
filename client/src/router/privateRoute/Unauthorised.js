import React from 'react';

const Unauthorized = ({ component, role, ...rest }) => {
    return(
        <div className='unauthorized-page-content-wrapper'>
            <div className="inner-content">
                You have no right
            </div>
        </div>
    )
}

export default Unauthorized;


