import React from "react";
import { useField } from "formik";
import styled from 'styled-components';

const StyledLoginFormikInput = styled.div `
    .field {
        position: relative;
        margin-bottom: 20px;
    }
    .field__error {
        color: #921919;
        font-size: 11px;
    }
    .login__title-field {
        position: absolute;
        top: -23px;
        left: 0px;
        z-index: 2;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #4A5568;
        background-color: transparent;
    }
    .login__title-field::first-letter {
        text-transform: uppercase;
    }
    .login__field, .login__field--error {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #2D3748;
        border-radius: 5px;
        padding: 18px 22px;
        width: 100%;
    }
    .login__field {
        border: 1px solid #E8E8E8;
    }
    .login__field--error {
        border: 1px solid #811d1d;
    }
`

function LoginFormikInput(props) {
    
	const [field, meta, helpers] = useField(props.name);
    console.log(meta.error);
    
	return (
        <StyledLoginFormikInput>
            <div className='field'>
                <h5 className='login__title-field'>{props.name}</h5>
                <input className={meta.touched && meta.error ? 'login__field--error' : 'login__field'} {...props} {...field} />
                {meta.touched && meta.error && (
                    <p className='field__error'>{meta.error}</p>
                )}
		    </div>
        </StyledLoginFormikInput>
	);
}

export default LoginFormikInput;