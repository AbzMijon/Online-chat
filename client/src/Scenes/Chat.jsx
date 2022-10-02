import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { loggedUserName } from '../store/selectors/userSelectors'; 

const StyledChat = styled.div `
    .form__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .form {
        padding: 20px 25px;
        border-radius: 0 0 10px 10px;
        background-color: #fff;
    }
    .messages {
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        padding: 20px 30px;
    }

    .message {
        margin: 10px 3px;
        padding: 10px 15px;
        display: inline-block;
        border-radius: 12px;
        background-color: #d8cfcf;
        position: relative;
    }
    .username {
        position: absolute;
        top: -13px;
        left: 4;
        font-size: 10px;
        color: #000;
        font-weight: bold;
    }
    .form__input, .form__btn {
        padding: 10px 15px;
        border: none;
        outline: none;
        margin-right: 10px;
        background-color: #04C45C;
        font-weight: bold;
        font-size: 25px;
        border-radius: 5px;
        color: #fff;
        transition: 0.2s ease-in;
        cursor: pointer;
    }
    .form__btn:hover {
        transform: scale(1.1);
        background-color: #0e994f;
        box-shadow: 0 0 60px #6eb48f;
    }
`

function Chat() {

    const [messages, setMessages] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [connected, setConnected] = useState(false);
    const socket = useRef();
    const userName = useSelector(loggedUserName);

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            setConnected(true);
            console.log('Подключение установленно');
            const message = {
                event: 'connection',
                userName,
                id: Math.round(Math.random() * 1000),
            }
            socket.current.send(JSON.stringify(message));
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev) => [...prev, message]);
        }
        socket.current.onclose = () => {
            console.log('Socket подключение завершено');
        }
        socket.current.onerror = () => {
            console.log('Socket ошибка');
        }
    }

    const sendMessage = () => {
        const message = {
            userName,
            message: messageValue,
            id: Math.round(Math.random() * 1000),
            event: 'message',
        }
        socket.current.send(JSON.stringify(message));
        setMessageValue('');    
    }

    if(!connected) {
        return (
            <StyledChat>
                <div className="form__wrapper">
                    <div>
                        <button className="form__btn" onClick={connect}>Войти в комнату</button>
                    </div>
                </div>
            </StyledChat>
        )
    }

    return (
        <StyledChat>
            <div className="form__wrapper">
                <div>
                    <div className="messages">
                        {messages.map(message =>
                            <div key={message.id}>
                                {message.event === 'connection'
                                    ? <div className="message_connection">
                                        Пользователь {userName} подключился
                                    </div>
                                    : <div className="message">
                                        <span className="username">{userName}</span> {message.message}
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                    <div className="form">
                        <input value={messageValue} onChange={(e) => setMessageValue(e.target.value)} className="form__input" placeholder="Введите сообщение.." type="text"/>
                        <button className="form__btn" onClick={sendMessage}>Отправить</button>
                    </div>
                </div>
            </div>
        </StyledChat>
    )
}

export default Chat;