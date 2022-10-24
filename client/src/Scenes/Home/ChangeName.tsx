import React from "react";
import { Formik, Form } from "formik";
import { fetchUserChangeName } from "../../api/users";
import { useSelector } from "react-redux";
import { loggedUserId } from "../../store/selectors/userSelectors";
import ChangeNameFormikInput from "../../Components/FormikInputs/home/changeNameFormikInput";

function ChangeName({ changeName, setChangeName, setChangePass, setChangeAbout}):JSX.Element {

    type initialNameValuesTypes = {
        newName: string,
    }
    type formValuesTypes = {
        newName: string,
    }
    type errorsObjTypes = {
        newName?: string,
    }

    const userId = useSelector(loggedUserId);
    const initialNameValues:initialNameValuesTypes = {
        newName: '',
    }
    const validateForm = ((formValues:formValuesTypes): void | errorsObjTypes => {        
        let isPassed = true;
        let errorsObj:errorsObjTypes = {};

        if(changeName && !formValues.newName.length) {
            isPassed = false;
            errorsObj.newName = 'Обязательное поле для заполнения!'
        }
        if(changeName && formValues.newName.length > 13) {
            isPassed = false;
            errorsObj.newName = 'Слишком длинное имя'
        }

        isPassed = false;
        if(!isPassed) return errorsObj;
    })

    return (
        <li className="home__list-item">
            <Formik initialValues={initialNameValues} validate={validateForm} onSubmit={(formValues: any) => {
                fetchUserChangeName(userId, formValues.newName);
                location.reload();
            }}>
                <Form>
                    <button type="button" className={changeName ? "home__change--active" : "home__change"} onClick={() => {
                        setChangeName(!changeName)
                        setChangePass(false);
                        setChangeAbout(false);
                    }}>Сменить имя</button>
                    {changeName &&
                        <div className="home__list-hidden">
                            <ChangeNameFormikInput name='newName' className="home__list-input" type="text" placeholder="Новое имя" />
                            <button className="home__list-submit" type="submit">Изменить</button>
                        </div>
                    }
                </Form>
            </Formik>
        </li>
    )
}

export default ChangeName;