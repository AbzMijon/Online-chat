import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const StyledWebSock = styled.div `
    .form__wrapper {
        position: absolute;
        top: 0;
        left: 0;
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
    }
`

function WebSock() {

    const [messages, setMessages] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [connected, setConnected] = useState(false);
    const [userName, setUserName] = useState('');
    const socket = useRef();

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
            <StyledWebSock>
                <div className="form__wrapper">
                    <div>
                        <input 
                        value={userName} 
                        onChange={(e) => 
                        setUserName(e.target.value)} 
                        className="form__input" 
                        type="text" 
                        placeholder="Введите ваше имя" />
                        <button className="form__btn" onClick={connect}>Войти в комнату</button>
                    </div>
                </div>
            </StyledWebSock>
        )
    }

    return (
        <StyledWebSock>
            <div className="form__wrapper">
                <div>
                    <div className="messages">
                        {messages.map(message =>
                            <div key={message.id}>
                                {message.event === 'connection'
                                    ? <div className="message_connection">
                                        Пользователь {message.userName} подключился
                                    </div>
                                    : <div className="message">
                                        <span className="username">{message.userName}</span> {message.message}
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
        </StyledWebSock>
    )
}

export default WebSock;