import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { userEmail } from "../store/selectors/userSelectors";
import { BallTriangle } from "react-loader-spinner";
import { PATH } from "../constans/routes";
import { useNavigate } from "react-router-dom";

const StyledSupportSubmit = styled.div `
    .support-submit {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: ${(props) => props.theme.backgroundColor};
        color: ${(props) => props.theme.fontColor};
    }
    .support-submit__title, .support-submit__text, .support-submit__btn {
        margin-bottom: 15px;
    }
    .support-submit__title {
        color: ${(props) => props.theme.fontColor};
    }
    .support-submit__btn {
        padding: 5px 15px;
        cursor: pointer;
    }
`

function SupportSubmit():JSX.Element {

    const email = useSelector(userEmail);
    const navigate = useNavigate();

    return (
        <StyledSupportSubmit>
            <div className="support-submit">
                <h2 className="support-submit__title">Ваше письмо успешно доставлено!</h2>
                <p className="support-submit__text">В течении 24 часов на вашу почту ({email}), будет выслан ответ. Спасибо за содейтвие!</p>
                <button className="support-submit__btn" onClick={() => navigate(PATH.chat)}>Вернуться домой</button>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </div>
        </StyledSupportSubmit>
    )
}

export default SupportSubmit;