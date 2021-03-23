import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

import './modal.scss'
import TriggerButton from './TriggerButton';
import LoginForm from '../../login/LoginForm';
import RegisterForm from '../../register';

const toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
};

const ModalContainer = ({ showModal, modalIsShown, triggerText, handleLoginFormOnSubmit, handleRegisterFormOnSubmit }) => {
    let modal = document.querySelector('.modal-wrapper')
    const [isShowLoginForm, setIsShowLoginForm] = useState(true);

    const closeModal = () => {
        showModal(false)
        toggleScrollLock();
    };

    const onKeyDown = (event) => {
        if (event.keyCode === 27) {
            closeModal();
        }
    };

    const onClickOutside = (event) => {
        if (modal && modal.contains(event.target)) return;

        closeModal();
        toggleScrollLock();
    };

    const handleShowRegisterOrLogin = () => {
        if (isShowLoginForm) {
            return <LoginForm showSuitableComponent={setIsShowLoginForm} handleOnSubmit={handleLoginFormOnSubmit} />
        } else {
            return <RegisterForm showSuitableComponent={setIsShowLoginForm} handleOnSubmit={handleRegisterFormOnSubmit}/>
        }
    }

    return (
        <>
            <TriggerButton
                handleOnClick={showModal}
                triggerText={triggerText}
            />

            {modalIsShown
                ?
                ReactDOM.createPortal(
                    <div className="modal-wrapper">
                        <FocusTrap>
                            <aside
                                tag="aside"
                                role="dialog"
                                tabIndex="-1"
                                aria-modal="true"
                                className="modal-cover"
                                onClick={onClickOutside}
                                onKeyDown={onKeyDown}
                            >
                                <div className="modal-area" ref={(n) => (modal = n)}>
                                    <button
                                        aria-label="Close Modal"
                                        aria-labelledby="close-modal"
                                        className="_modal-close"
                                        onClick={closeModal}
                                    >
                                        <span id="close-modal" className="_hide-visual">Close</span>
                                        <svg className="_modal-close-icon" viewBox="0 0 40 40">
                                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                        </svg>
                                    </button>
                                    <div className="modal-body">
                                        {handleShowRegisterOrLogin()}
                                    </div>
                                </div>
                            </aside>
                        </FocusTrap>
                    </div>
                    ,
                    document.body
                )
                : null}
        </>
    );
}


export default ModalContainer;
