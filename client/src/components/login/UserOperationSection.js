import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ModalContainer from '../common/modal';
import UserToggleMenu from './UserToggleMenu';
import { LOGOUT_SUCCESS } from '../../utils/constants'
import { login, register } from '../../redux/actions/authenticate';



const UserOperationSection = () => {
    const [modalIsShown, setModalIsShown] = useState(false)
    const isLogin = useSelector(state => state.user.isLogin)
    const dispatch = useDispatch()
    const history = useHistory()


    const handleLoginFormOnSubmit = async (loginInfo) => {
        await dispatch(login(loginInfo))

        if (isLogin) {
            history.push('/')
            setModalIsShown(false)
        }
    }

    const handleRegisterFormOnSubmit = async (registerInfo) => {
        await dispatch(register(registerInfo))
    }

    const handleLogout = () => {
        dispatch({ type: LOGOUT_SUCCESS });
        setModalIsShown(false)
    }

    const propsPassDownForModal = {
        modalIsShown,
        showModal: setModalIsShown,
        handleLoginFormOnSubmit,
        handleRegisterFormOnSubmit
    }

    return (
        <>
            {!isLogin
                ?
                <ModalContainer {...propsPassDownForModal} />
                :
                <>
                    <UserToggleMenu handleLogout={handleLogout} />
                </>
            }
        </>
    )
}

export default UserOperationSection;