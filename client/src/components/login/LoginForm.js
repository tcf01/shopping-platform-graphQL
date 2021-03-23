import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import Form from '../common/Form';
import './loginForm.scss'

const roleOption = ['buyer', 'seller']

const LoginForm = ({ handleOnSubmit, showSuitableComponent }) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [activeRole, isSetActiveRole] = useState('buyer')
    const errorMsg = useSelector(({ error }) => error)

    const roleButtonClickEvent = useCallback((e) => {
        const role = e.currentTarget.classList[0]

        isSetActiveRole(role)
    }, [])

    const showRegisterForm = () => {
        showSuitableComponent(false)
    }

    const loginInfo = {
        username,
        password,
        activeRole
    }

    return (
        <>
            <Form onSubmit={() => handleOnSubmit(loginInfo)}>
                <div>
                    {errorMsg}
                </div>
                <div className='role-wrapper'>
                    <div className={'role-header'}> You are?</div>
                    <div className="role-inner-wrapper">
                        {roleOption.map((role, i) => (
                            <div key={`${role}-${i}`} className={`${role} ${role === activeRole ? 'isActive' : ''}`} onClick={roleButtonClickEvent}>I am {role}</div>
                        ))}
                    </div>
                </div>

                <div className="form-submission-section">
                    <div className='input-section'>
                        <label>
                            < input placeholder={'Username'} type="text" className='username' name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <input placeholder={'Password'} className='password' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>

                    </div>
                    <input type="submit" value="Login" />
                </div>
            </Form>
            <div className="register-form" onClick={showRegisterForm}>Not one of us yet? Sign up</div>
        </>

    )
}


export default LoginForm