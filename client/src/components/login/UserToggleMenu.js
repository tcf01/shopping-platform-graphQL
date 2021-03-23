import React from 'react'
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { ReactComponent as UserImage } from '../../assets/img/user.svg'
import { useSelector } from 'react-redux';

import './userToggleMenu.scss';


const UserToggleMenu = ({ handleLogout }) => {
    const user = useSelector(({ user }) => user)
    const { username } = user;

    return (
        <ButtonGroup className={'user-toggle-menu-wrapper'}>
            <div className="inner-content-wrapper">
                <DropdownButton as={ButtonGroup} title="" id="bg-nested-dropdown">
                    <Dropdown.Item disabled className={'disabled-button'}>
                        <div className="user-info-section">
                            <div className="circle-wrapper">
                                <div className="user-image">
                                    <UserImage />
                                </div>
                            </div>
                            <div className="user-name">{username}</div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="1">Account Service</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={handleLogout}>Logout</Dropdown.Item>
                </DropdownButton>
            </div>
        </ButtonGroup>
    )
}

export default UserToggleMenu;