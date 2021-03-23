import React from 'react'
import { Link } from 'react-router-dom';


const SellerHeader = () => {
    return (
        <div>
            <Link to="/myProduct">My Product</Link>
            <Link to="/add">Add Product</Link>
        </div>
    )
}

export default SellerHeader;