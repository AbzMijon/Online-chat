import React from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { fetchUserDelete } from "../api/users";

const StyledDeleteAccTry = styled.div `
    .card__wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card {
        width: 450px;
        text-align: center;
        height: 200px;
        padding: 10px 15px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: ${(props) => props.theme.backgroundColor};
        border: 1px solid #fff;
        z-index: 5;
    }
    .card__title {
        font-weight: bold;
        margin-bottom: 15px;
        font-size: 19px;
        color: ${(props) => props.theme.fontColor};
    }
    .card__answers {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card__btn {
        padding: 5px 15px;
        outline: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: 0.1s all;
    }
    .card__btn:hover {
        transform: scale(1.1);
    }
    .card__true {
        background-color: #127912;
        margin-right: 30px;
    }
    .card__false {
        background-color: #a31f1f;
    }
`

function DeleteAccTry({ setHandleDeleteAcc, userId }):JSX.Element {

    const dispatch = useDispatch();
    const handleTrue = () => {
        fetchUserDelete(userId);
        dispatch({type: 'userLogOut'});
    }
    const handleFalse = () => {
        setHandleDeleteAcc(false);
    }

    return (
        <StyledDeleteAccTry>
            <div className="card__wrapper" onClick={() => setHandleDeleteAcc(false)}>
                <div className="card" onClick={(event) => event.stopPropagation()}>
                    <h4 className="card__title">Вы уверенны что хотите навсегда потерять аккаунт?</h4>
                    <div className="card__answers">
                        <button className="card__true card__btn" onClick={handleTrue}>Да</button>
                        <button className="card__false card__btn" onClick={handleFalse}>Нет</button>
                    </div>
                </div>
            </div>
        </StyledDeleteAccTry>
    )
}

export default DeleteAccTry;