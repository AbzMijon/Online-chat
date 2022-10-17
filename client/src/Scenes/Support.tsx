import { Formik, Form } from "formik";
import React from "react";
import styled from 'styled-components';
import SupportFormikTextArea from "../Components/FormikInputs/SupportFormikTextArea";

const StyledSupport = styled.div`
    padding: 20px 25px;
    .support__title {
        color: #000;
        font-size: 35px;
        font-weight: bold;
    }

    .support__avatar {
        position: absolute;
        top: 15px;
        right: 15px;
    }
`

function Support():JSX.Element {
    type initialFormValuesTypes = {
        groupProblem: number | string,
        problem: string,
    }
    type errorsObjTypes = {
        groupProblem?: number | string,
        problem?: string,
    }
    const initialFormValues:initialFormValuesTypes = {
        groupProblem: 0,
        problem: '',
    }
    const validateForm = (formValues:initialFormValuesTypes) => {
        let errorsObj:errorsObjTypes = {};
        let isPassed = true;

        if(!formValues.problem.length) {
            errorsObj.problem = 'Для отправки сообщения необходимо заполнить форму..';
            isPassed = false;
        }
        if(formValues.groupProblem === 0) {
            errorsObj.groupProblem = 'Пожалуйста, выберите одну из групп проблем..';
            isPassed = false;
        }
        isPassed = false;
        if(!isPassed) return errorsObj;
    }
    return (
        <StyledSupport>
            <h2 className="support__title">Подробно опишите вашу проблему</h2>
            <img className="support__avatar" src="https://skops.ru/wp-content/uploads/2019/01/tehnicheskoe-obsluzhivanie.png" alt="" />
            <Formik initialValues={initialFormValues} validate={validateForm} onSubmit={() => {
                console.log(1);
            }}>
                <Form>
                    <SupportFormikTextArea name='problem' required placeholder='Кратко опишите вашу проблему..'/>
                </Form>
            </Formik>
        </StyledSupport>
    )
};;

export default Support;