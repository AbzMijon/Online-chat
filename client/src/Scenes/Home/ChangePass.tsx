import React from "react";
import { Formik, Form } from "formik";
import { fetchUserChangePass } from "../../api/users";
import { useSelector } from "react-redux";
import { loggedUserId } from "../../store/selectors/userSelectors";
import ChangePassFormikInput from "../../Components/FormikInputs/home/ChangePassFormikInput";

function ChangePass({ changePass, setChangeName, setChangePass, setChangeAbout}):JSX.Element {

    type initialPasswordValuesTypes = {
        newPassword: string,
    }
    type formValuesTypes = {
        newPassword: string,
    }
    type errorsObjTypes = {
        newPassword?: string,
    }

    const userId = useSelector(loggedUserId);
    const initialPasswordValues:initialPasswordValuesTypes = {
        newPassword: '',
    }
    const validateForm = ((formValues:formValuesTypes): void | errorsObjTypes => {        
        let isPassed = true;
        let errorsObj:errorsObjTypes = {};

        if(changePass && !formValues.newPassword.length) {
            isPassed = false;
            errorsObj.newPassword = 'Обязательное поле для заполнения!'
        }
        if(changePass && formValues.newPassword.length <= 3 && formValues.newPassword.length >= 1) {
            isPassed = false;
            errorsObj.newPassword = 'Ненадежный пароль!'
        }

        isPassed = false;
        if(!isPassed) return errorsObj;
    })

    return (
        <li className="home__list-item">
            <Formik initialValues={initialPasswordValues} validate={validateForm} onSubmit={(formValues: any) => {
                fetchUserChangePass(userId, formValues.newPassword);
                location.reload();
            }}>
                <Form>
                    <button type="button" className={changePass ? "home__change--active" : "home__change"} onClick={() => {
                        setChangePass(!changePass);
                        setChangeName(false);
                        setChangeAbout(false);
                    }}>Сменить пароль</button>
                    {changePass &&
                        <div className="home__list-hidden">
                            <ChangePassFormikInput name='newPassword' className="home__list-input" type="password" placeholder="Новый пароль" />
                            <button className="home__list-submit" type="submit">Изменить</button>
                        </div>
                    }
                </Form>
            </Formik>
        </li>
    )
}

export default ChangePass;