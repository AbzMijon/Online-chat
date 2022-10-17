import React from 'react';
import { filterMessages } from "../helpers/filterMessages";
import defautAvatar from '../assets/img/defaultAvatar.jpg';
import { useSelector } from 'react-redux';
import { userColor } from '../store/selectors/userSelectors';
import styled from 'styled-components';

const StyledMessages = styled.div `
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
    .username {
        font-size: 15px;
        color: #b71d1d;
        font-weight: bold;
    }
`

function Messages({ messages, searchValue, userName }):JSX.Element {

    const nameColor = useSelector(userColor);
    type MessageTypes = {
        id: number | string,
        userName: string,
        event: string,
        message: string,
    }
    
    return (
        <StyledMessages>
            <div className="messages">
                {filterMessages(messages, searchValue).map((message:MessageTypes) =>
                    <div key={message.id} className={(message.userName !== userName) && (message.event !== 'connection') ? `message-another` : `message-me`}>
                        {message.event === 'connection'
                            ? <div className="message__connection">
                                Пользователь <img src={defautAvatar} alt="" className="message__avatar"/> {userName} подключился
                            </div>
                            : <div className={message.userName !== userName ? 'mess-another' : 'mess-me'}>
                                <span style={{ color: `${nameColor}`}} className="username">{userName}</span> {message.message}
                                <img src={defautAvatar} alt="" className={message.userName !== userName ? "message__avatar-mess--another" : "message__avatar-mess--me"}/>
                            </div>
                        }
                    </div>
                )}
            </div>
        </StyledMessages>
    )
}

export default Messages;