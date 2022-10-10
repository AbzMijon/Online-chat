import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { loggedUserName } from '../store/selectors/userSelectors'; 
import lightBG from '../assets/img/lightBG.jpg';
import darkBackground from '../assets/img/darkBackground.jpg';
import defautAvatar from '../assets/img/defaultAvatar.jpg';
import { AiOutlineSend, AiFillCrown } from 'react-icons/ai';
import Spinner from "../Components/Spinner";
import EmojiPicker from 'emoji-picker-react';
import { BiSmile } from 'react-icons/bi';
import { userColor } from "../store/selectors/userSelectors";
import axios from 'axios';
import  { BsSearch } from 'react-icons/bs';

const StyledChat = styled.div `
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
        padding: 10px 0;
        z-index: 3;
    }
    .chat__users {
        color: #d4d4d4;
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

function Chat() {

    const [messages, setMessages] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [connected, setConnected] = useState(false);
    const socket = useRef();
    const userName = useSelector(loggedUserName);
    const nameColor = useSelector(userColor);
    const [handleStiker, setHandleStiker] = useState(false);
    const [users, setUsers] = useState(0);

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
    useEffect(() => {
        axios.get('http://localhost:8000/users').then(response => {
            console.log(response.data);
            response.data.map((user) => {
                setUsers(users + 1);
            })
        })
    }, [users]);
    
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
        setHandleStiker(false);
    }

    const logicUserColor = {
        color: `${nameColor}`
    }

    if(!connected) {
        return <Spinner/>
    }

    return (
        <StyledChat>
            <div className="form__wrapper">
                <header className="header">
                    <h4 className="chat__maxlvl"><AiFillCrown className="crown"/> 1000 lvl+: 0</h4>
                    <h2 className="chat__name">Единственный Всемирный чат</h2>
                    <h5 className="chat__users">Участников: {users}</h5>
                    <div className="chat__search">
                        <input type="text" className="chat__search-input" placeholder="Поиск.." />
                        <BsSearch className="chat__search-icon"/>
                    </div>
                </header>
                <div className="container">
                    <main className="main">
                        <div className="messages">
                            {messages.map(message =>
                                <div key={message.id} className={(message.userName !== userName) && (message.event !== 'connection') ? `message-another` : `message-me`}>
                                    {message.event === 'connection'
                                        ? <div className="message__connection">
                                            Пользователь <img src={defautAvatar} alt="" className="message__avatar"/> {userName} подключился
                                        </div>
                                        : <div className={message.userName !== userName ? 'mess-another' : 'mess-me'}>
                                            <span style={logicUserColor} className="username">{userName}</span> {message.message}
                                            <img src={defautAvatar} alt="" className={message.userName !== userName ? "message__avatar-mess--another" : "message__avatar-mess--me"}/>
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
                            onChange={(e) => {
                                setMessageValue(e.target.value);
                                setHandleStiker(false);
                            }} 
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
                    </main>
                </div>
            </div>
        </StyledChat>
    )
}

export default Chat;