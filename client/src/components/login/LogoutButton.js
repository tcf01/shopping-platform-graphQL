import React from 'react'

const LogoutButton = ({handleLogout}) => {
    return (
        <button onClick={handleLogout} className={'btn btn-lg btn-danger center modal-button'}>
            Logout
        </button>
    )
}

export default LogoutButton;