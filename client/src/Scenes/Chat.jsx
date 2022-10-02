import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { loggedUserName } from '../store/selectors/userSelectors'; 
import lightBG from '../assets/img/lightBG.jpg';

const StyledChat = styled.div `
    .form__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(${lightBG});
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
    .message {
        margin: 10px 3px;
        padding: 5px 15px 8px 15px;
        display: inline-flex;
        flex-direction: column;
        border-radius: 12px 12px 12px 0;
        background-color: #ffffff;
        position: relative;
        flex-wrap: wrap;
    }
    .message_connection {
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
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .form__btn {
        
    }
    .form__input {
        width: 85%;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 15px;
        color: #535353;
    }
    .form__btn-in {
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
    .form__btn-in:hover {
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
        if(message.message.length) {
            socket.current.send(JSON.stringify(message));
            setMessageValue('');
        }
    }

    if(!connected) {
        return (
            <StyledChat>
                <div className="form__wrapper">
                    <div>
                        <button className="form__btn-in" onClick={connect}>Connect to room</button>
                    </div>
                </div>
            </StyledChat>
        )
    }

    return (
        <StyledChat>
            <div className="form__wrapper">
                <div className="container">
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
                        <input value={messageValue} onKeyDown={(keyPress) => {
                            if(keyPress.keyCode === 13) {
                                sendMessage();
                            }
                        }}
                        onChange={(e) => setMessageValue(e.target.value)} 
                        className="form__input" 
                        placeholder="Message.." 
                        type="text"/>
                        <button className="form__btn" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </StyledChat>
    )
}

export default Chat;