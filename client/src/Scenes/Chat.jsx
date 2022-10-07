import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { loggedUserName } from '../store/selectors/userSelectors'; 
import lightBG from '../assets/img/lightBG.jpg';
import darkBackground from '../assets/img/darkBackground.jpg';
import defautAvatar from '../assets/img/defaultAvatar.jpg';
import { AiOutlineSend } from 'react-icons/ai';
import Spinner from "../Components/Spinner";
import EmojiPicker from 'emoji-picker-react';
import { BiSmile } from 'react-icons/bi';

const StyledChat = styled.div `
    .form__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(${darkBackground}) center;
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
    .message__avatar-mess {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        bottom: -5px;
        left: -30px;
    }
    .emoji {
        position: absolute;
        bottom: 120px;
        left: 0px;
    }
`

function Chat() {

    const [messages, setMessages] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [connected, setConnected] = useState(false);//spinner
    const socket = useRef();
    const userName = useSelector(loggedUserName);
    const [handleStiker, setHandleStiker] = useState(false);

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
    useEffect(() => {
        connect();
    }, []);
    
/*     useEffect(() => {
        const messagesText = messages.filter(message => message.message);
        if(messagesText.length) {
            axios.post('http://localhost:8000/messages/', {
                event: "message",
                id: Math.round(Math.random() * 1000),
                message: messageValue,
                userName: userName,
            })
        }
    }, [messages]); */

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
        return <Spinner/>
    }

    return (
        <StyledChat>
            <div className="form__wrapper">
                <div className="container">
                    <div className="messages">
                        {messages.map(message =>
                            <div key={message.id}>
                                {message.event === 'connection'
                                    ? <div className="message__connection">
                                        Пользователь <img src={defautAvatar} alt="" className="message__avatar"/> {userName} подключился
                                    </div>
                                    : <div className="message">
                                        <span className="username">{userName}</span> {message.message}
                                        <img src={defautAvatar} alt="" className="message__avatar-mess"/>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                    <div className="form">
                        <button className="form__btn form__btn-smile" type="button" onClick={() => setHandleStiker(!handleStiker)}><BiSmile/></button>
                        <input value={messageValue} onKeyDown={(keyPress) => {
                            if(keyPress.keyCode === 13) {
                                sendMessage();
                            }
                        }}
                        onChange={(e) => setMessageValue(e.target.value)} 
                        className="form__input" 
                        placeholder="Message.." 
                        type="text"/>
                        <button type="button" className="form__btn" onClick={sendMessage}><AiOutlineSend/></button>
                    </div>
                    <div className="emoji">
                        {handleStiker && <EmojiPicker
                            Theme='dark'
                            onEmojiClick={(emojiObj) => setMessageValue((prevMessage) => prevMessage + emojiObj.emoji)}
                            className='message__emojipicker'
                            />
                        }
                    </div>
                </div>
            </div>
        </StyledChat>
    )
}

export default Chat;