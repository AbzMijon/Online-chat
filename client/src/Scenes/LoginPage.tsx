import React, { useState } from "react";
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import LoginFormikInput from "../Components/FormikInputs/LoginFormikInput";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constans/routes'; 
import { randomInteger } from "../helpers/randomInteger";
import { userColor } from "../constans/userColors";
import axios from "axios";

const StyledLoginPage = styled.div `
    .login {
        width: 560px;
        height: 650px;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .login__subtitle {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #2D3748;
        margin-bottom: 4px;
    }
    .login__title {
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 35px;
        color: #1A202C;
        margin-bottom: 37px;
    }
    .login__btn {
        width: 100%;
        padding: 15px 25px;
        text-align: center;
        background-color: #04C45C;
        border-radius: 5px;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        border: none;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .login__btn--dont {
        width: 100%;
        padding: 15px 25px;
        text-align: center;
        background-color: #2D3748;
        border-radius: 5px;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        border: none;
        cursor: pointer;
    }
    .login__texts {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .login__forgot, .login__help {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #2C5282;
        margin: -5px 0 15px 0;
        cursor: pointer;
    }
    .login__error {
        text-align: center;
        margin: 10px 0;
        color:#bd3939;
    }
`

function LoginPage():JSX.Element {

    const [dontHaveAcc, setDontHaveAcc] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const randColor = () => {
        const num = randomInteger(0, userColor.length - 2);
        return userColor[num];
    };
    
    type initialFormvaluesTypes = {
        name: string,
        email: string,
        password: string,
        id: number | string,
        color: string,
    }
    const initialFormValues:initialFormvaluesTypes = {
        name: '',
        email: '',
        password: '',
        id: Math.round(Math.random() * 1000),
        color: '',
    }

    type formValueTypes = {
        name?: string,
        email?: string,
        password?: string,
    }
    type validateFormTypes = {
        name: string,
        email: string,
        password: string,
        id: number | string,
        color: string,
    }

    const validateForm = (formValues:validateFormTypes):formValueTypes | void => {
        let isPassed = true;
        let errorsObject:formValueTypes = {};

        if(dontHaveAcc && !formValues.name) {
            isPassed = false;
            errorsObject.name = 'The field must not be empty'
        }

        if(dontHaveAcc && formValues.name.length > 15) {
            isPassed = false;
            errorsObject.name = 'The name must be less'
        }

        if(!formValues.email) {
            isPassed = false;
            errorsObject.email = 'The field must not be empty'
        }

        if(!formValues.password) {
            isPassed = false;
            errorsObject.password = 'The field must not be empty'
        }

        if(formValues.password.length <= 4 && formValues.password.length> 0) {
            isPassed = false;
            errorsObject.password = 'The password is unreliable'
        }

        isPassed = false;

        if(!isPassed) return errorsObject;
    }

    return (
        <StyledLoginPage>
            <div className="login">
                <div className="login__wrap">
                <h5 className="login__subtitle">{dontHaveAcc ? 'Welcome, dear user!' : 'Welcome back'}</h5>
                <h3 className="login__title">{dontHaveAcc ? 'Let`s create your account' : 'Login to your account'}</h3>
                    <Formik initialValues={initialFormValues} validate={validateForm} onSubmit={(formvalues:validateFormTypes) => {
                        axios.post(`http://localhost:8000/${dontHaveAcc ? 'users' : 'login'}`, {
                            name: formvalues.name,
                            email: formvalues.email,
                            password: formvalues.password,
                            level: 0,
                        }).then(() => {
                            axios.get(`http://localhost:8000/users`).then(response => {
                                const findUser = response.data.find((user: { email: string; }) => user.email === formvalues.email);
                                dispatch(
                                    {type: 'userLogIn', payload: 
                                    {
                                        name: dontHaveAcc ? formvalues.name : findUser.name, 
                                        email: formvalues.email, 
                                        password: formvalues.password, 
                                        id: dontHaveAcc ? formvalues.id : findUser.id,
                                        color: randColor(),
                                    }})
                                    navigate(PATH.homePage);
                            })
                        }).catch(error => error && setLoginError(error.response.data));
                    }}>
                        <Form>
                            {dontHaveAcc && <LoginFormikInput name='name' type='text' placeholder='Enter your name..' required  />}
                            <LoginFormikInput name='email' type='email' placeholder='Enter your email..' required />
                            <LoginFormikInput name='password' type='password' placeholder='Enter your password..' required />
                            {loginError && <p className="login__error">{loginError}</p>}
                            <div className="login__texts">
                                <p className="login__help">Help me!</p>
                                <p className="login__forgot">Forgot password?</p>
                            </div>
                            <button className="login__btn" type="submit">Login now</button>
                            <button className="login__btn--dont" type="button" onClick={() => setDontHaveAcc(!dontHaveAcc)}>{dontHaveAcc ? 'Have account?' : 'Dont have account?'}</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </StyledLoginPage>
    )
}

export default LoginPage;