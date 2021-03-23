import React, { memo, useCallback } from 'react';
import './form.scss';

const Form = ({children, onSubmit, ...otherProps}) => {
    const submitHandler = useCallback((e) => {
        e.preventDefault();
        onSubmit && onSubmit(e);
    }, [onSubmit]);

    return (
        <form className={'custom-form'} onSubmit={submitHandler} {...otherProps} >
            {children}
        </form>
    );
}

export default memo(Form);