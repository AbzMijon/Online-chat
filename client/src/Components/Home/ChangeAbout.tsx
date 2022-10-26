import React from "react";
import { Formik, Form } from "formik";
import { fetchUserChangeAbout } from "../../api/users";
import { useSelector } from "react-redux";
import { loggedUserId } from "../../store/selectors/userSelectors";
import ChangeAboutFormikInput from "../../Components/FormikInputs/home/ChangeAboutFormikInput";

function ChangeAbout({ changeAbout, setChangeName, setChangePass, setChangeAbout}):JSX.Element {

    type initialAboutValuesTypes = {
        about: string,
    }
    type formValuesTypes = {
        about: string,
    }
    type errorsObjTypes = {
        about?: string,
    }

    const userId = useSelector(loggedUserId);
    const initialAboutValues:initialAboutValuesTypes = {
        about: '',
    }
    const validateForm = ((formValues:formValuesTypes): void | errorsObjTypes => {        
        let isPassed = true;
        let errorsObj:errorsObjTypes = {};

        if(changeAbout && !formValues.about.length) {
            isPassed = false;
            errorsObj.about = 'Обязательное поле для заполнения!'
        }

        isPassed = false;
        if(!isPassed) return errorsObj;
    })

    return (
        <li className="home__list-item">
            <Formik initialValues={initialAboutValues} validate={validateForm} onSubmit={(formValues: any) => {
                fetchUserChangeAbout(userId, formValues.about);
                location.reload();
            }}>
                <Form>
                    <button type="button" className={changeAbout ? "home__change--active" : "home__change"} onClick={() => {
                        setChangeAbout(!changeAbout);
                        setChangePass(false);
                        setChangeName(false);
                    }}>Сменить описание</button>
                    {changeAbout &&
                        <div className="home__list-hidden">
                            <ChangeAboutFormikInput name='about' className="home__list-input" type="text" placeholder="Ваше описание.." />
                            <button className="home__list-submit" type="submit">Изменить</button>
                        </div>
                    }
                </Form>
            </Formik>
        </li>
    )
}

export default ChangeAbout;