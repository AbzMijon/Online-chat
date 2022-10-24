import {formValuesTypes, errorsObjTypes } from './types';

export const validateForm = ((formValues:formValuesTypes, changeName:boolean, changePass:boolean, changeAbout:boolean): void | errorsObjTypes => {        
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
    if(changePass && !formValues.newPassword.length) {
        isPassed = false;
        errorsObj.newPassword = 'Обязательное поле для заполнения!'
    }
    if(changePass && formValues.newPassword.length <= 3 && formValues.newPassword.length >= 1) {
        isPassed = false;
        errorsObj.newPassword = 'Ненадежный пароль!'
    }
    if(changeAbout && !formValues.about.length) {
        isPassed = false;
        errorsObj.about = 'Обязательное поле для заполнения!'
    }

    isPassed = false;
    if(!isPassed) return errorsObj;
})