import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

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
            setMessages((prev) => [message, ...prev])
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
            <div className="form__wrapper">
                <div className="form">
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
        )
    }

    return (
        <div className="form__wrapper">
            <div>
                <div className="form">
                    <input value={messageValue} onChange={(e) => setMessageValue(e.target.value)} className="form__input" placeholder="Введите сообщение.." type="text"/>
                    <button className="form__btn" onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(message =>
                        <div key={message.id}>
                            {message.event === 'connection'
                                ? <div className="message_connection">
                                    Пользователь {message.username} подключился
                                </div>
                                : <div className="message">
                                    {message.username}. {message.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WebSock;