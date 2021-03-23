import React from 'react'

import Form from '../common/Form';
import { useState } from 'react';

import './register.scss'

const RegisterForm = ({ showSuitableComponent, handleOnSubmit, errorMsg }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState([])

    const showLoginForm = () => {
        showSuitableComponent(true)
    }

    const radioInputOnChange = (e) => {
        setRole([e.target.value])
    }

    const handleRegisterSubmit = () => {
        const registerData = { username, password, email, role }

        handleOnSubmit(registerData)
    }


    return (
        <>
            <Form onSubmit={handleRegisterSubmit}>
                <div>{errorMsg}</div>

                <div className="form-submission-section">
                    <div className="title-header">Register to see more</div>
                    <div className='input-section'>
                        <label>
                            < input placeholder={'Username'} type="text" className='username' name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <input placeholder={'Password'} className='password' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <label>
                            <input placeholder={'Email'} className='email' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <div className="role" onChange={radioInputOnChange}>
                            Register as:
                            Buyer: <input type="radio" className="buyer" name="role" value="buyer" />
                            Seller: <input type="radio" className="seller" name="role" value="seller" />
                        </div>
                    </div>
                    <input type="submit" value="Register" />
                    <hr/>
                </div>
            </Form>
            <div className="login-form" onClick={showLoginForm}>Already a member? Log in</div>
        </>
    )
}

export default RegisterForm;