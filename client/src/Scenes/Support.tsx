import { Formik, Form } from "formik";
import React from "react";
import styled from 'styled-components';
import SupportFormikTextArea from "../Components/FormikInputs/support/SupportFormikTextArea";
import SupportUiImg from '../assets/img/supportUiImg.png';
import SupportFormikSelect from "../Components/FormikInputs/support/SupportFormikSelect";
import { fetchSupportMessage } from "../api/support";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../constans/routes";
import { userEmail } from "../store/selectors/userSelectors";
import { useSelector } from "react-redux";

const StyledSupport = styled.div`
    padding: 20px 25px;
    background-color: #161b22;
    .support__title {
        color: #fff;
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 35px;
    }

    .support__avatar {
        position: absolute;
        top: 15px;
        right: 15px;
    }
    .main {
        max-width: 65%;
    }
    .support__btn {
        padding: 10px 15px;
        background-color: #0d1117;
        border-radius: 5px;
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        transition: 0.2s all;
    }
    .support__btn:hover {
        transform: scale(0.9);
    }
`

function Support():JSX.Element {

    const navigate = useNavigate();
    const userMail = useSelector(userEmail);

    type initialFormValuesTypes = {
        groupProblem: number | string,
        problem: string,
        email: string,
    }
    type errorsObjTypes = {
        groupProblem?: number | string,
        problem?: string,
    }
    const initialFormValues:initialFormValuesTypes = {
        groupProblem: 0,
        problem: '',
        email: userMail,
    }
    const validateForm = (formValues:initialFormValuesTypes) => {
        let errorsObj:errorsObjTypes = {};
        let isPassed = true;

        if(!formValues.problem.length) {
            errorsObj.problem = 'Для отправки сообщения необходимо заполнить форму..';
            isPassed = false;
        }
        console.log(formValues.groupProblem);
        
        if(+formValues.groupProblem === 0 || formValues.groupProblem === undefined) {
            errorsObj.groupProblem = 'Пожалуйста, выберите одну из групп проблем..';
            isPassed = false;
        }
        isPassed = false;
        if(!isPassed) return errorsObj;
    }
    return (
        <StyledSupport>
            <img className="support__avatar" src={SupportUiImg} alt="" />
            <main className="main">
                <h2 className="support__title">Добро пожаловать на страницу поддержки!</h2>
                <Formik initialValues={initialFormValues} validate={validateForm} onSubmit={(formValues) => {
                    fetchSupportMessage(formValues.groupProblem, formValues.problem, formValues.email);
                    navigate(ROUTES.supportSubmit);
                    console.log('message gives!');
                }}>
                    <Form>
                        <SupportFormikSelect name='groupProblem' required placeholder='Выберите группу проблем'/>
                        <SupportFormikTextArea name='problem' required placeholder='Подробно опишите вашу проблему..'/>
                        <button className="support__btn" type="submit">Отправить письмо!</button>
                    </Form>
                </Formik>
            </main>
        </StyledSupport>
    )
};;

export default Support;