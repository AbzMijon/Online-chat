import styled from 'styled-components'
import darkBackground from '../../assets/img/darkBackground.jpg';
import lightBG from '../../assets/img/lightBG.jpg';

export const StyledChat = styled.div `
    .form__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(${darkBackground}) center;
        position: relative;
    }
    .container {
        width: 650px;
        padding: 10px 15px;
        margin: 0 auto;
        position: relative;
        height: 100%;
    }
    .form {
        padding: 20px 25px;
        border-radius: 0 0 10px 10px;
        background-color: transparent;
        width: 100%;
    }
    .messages {
        background-color: transparent;
        border-radius: 10px 10px 0 0;
        padding: 20px 30px;
        width: 100%;
        overflow-y: auto;
        max-height: 850px;
    }
    .messages::-webkit-scrollbar {
        width: 0;
    }
    .mess-me, .mess-another {
        margin: 10px 3px;
        padding: 5px 15px 8px 15px;
        display: inline-flex;
        flex-direction: column;
        background-color: #ffffff;
        position: relative;
        flex-wrap: wrap;
        color: #1a1a1a;
    }
    .mess-me {
        border-radius: 12px 12px 12px 0;
    }
    .mess-another {
        border-radius: 12px 12px 0px 12px;
    }
    .message-another {
        display: flex;
        justify-content: end;
    }
    .message__connection {
        margin: 15px 0;
        color: #fff;
        text-align: center;
        font-size: 17px;
        font-weight: bold;
    }
    .username {
        font-size: 15px;
        color: #b71d1d;
        font-weight: bold;
    }
    .form {
        padding: 20px 25px;
        border-radius: 10px;
        background-color: #212121;
        border: 1px solid #363636;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .form__btn {
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 20px;
        color: #a3a3a3;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .form__btn:hover {
        color: #fff;
    }
    .form__btn-smile {
        font-size: 25px;
    }
    .form__input {
        width: 85%;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 15px;
        color: #fff;
    }
    .form__btn-in {
        padding: 10px 15px;
        border: none;
        outline: none;
        margin-right: 10px;
        background-color: #a3a3a3;
        font-weight: bold;
        font-size: 25px;
        border-radius: 5px;
        color: #fff;
        transition: 0.2s ease-in;
        cursor: pointer;
    }
    .form__btn-in:hover {
        transform: scale(1.1);
        box-shadow: 0 0 6px #949494;
    }
    .message__avatar {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-left: 5px;
    }
    .message__avatar-mess--me, .message__avatar-mess--another {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        bottom: -5px;
    }
    .message__avatar-mess--me {
        left: -30px;
    }
    .message__avatar-mess--another {
        right: -30px;
    }
    .emoji {
        position: absolute;
        bottom: 120px;
        left: 0px;
        transition: 0.2s ease-in;
    }
    .chat__name {
        font-size: 19px;
        text-align: center;
        color: #c4c4c4;
    }
    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #1a1a1a;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-bottom: 1px solid #c4c4c4;
        padding: 7px 0;
        z-index: 3;
    }
    .chat__users {
        color: #d4d4d4;
        display: flex;
        cursor: pointer;
    }
    .main {
        margin-top: 60px;
    }
    .chat__search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chat__search-icon {
        font-size: 25px;
        color: #e9e9e9;
        cursor: pointer;
    }
    .chat__search-input {
        border: none;
        outline: none;
        background-color: #212121;
        font-size: 22px;
        color: #949494;
        padding: 10px 15px;
        border-radius: 5px;
        margin-right: 15px;
    }
    .chat__maxlvl {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 50px;
        color: #e4e4e4;
        font-size: 17px;
        display: flex;
        align-items: center;
    }
    .crown {
        color: #b1b112;
        margin-right: 5px;
    }
`