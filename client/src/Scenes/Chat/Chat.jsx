import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { loggedUserName } from '../../store/selectors/userSelectors'; 
import defautAvatar from '../../assets/img/defaultAvatar.jpg';
import { AiOutlineSend, AiFillCrown } from 'react-icons/ai';
import Spinner from "../../Components/Spinner";
import EmojiPicker from 'emoji-picker-react';
import { BiSmile } from 'react-icons/bi';
import { userColor } from "../../store/selectors/userSelectors";
import axios from 'axios';
import  { BsSearch } from 'react-icons/bs';
import { StyledChat } from "./StyledChat";

function Chat() {

    const [messages, setMessages] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [connected, setConnected] = useState(false);
    const socket = useRef();
    const userName = useSelector(loggedUserName);
    const nameColor = useSelector(userColor);
    const [handleStiker, setHandleStiker] = useState(false);
    const [users, setUsers] = useState(0);
    const [amountUsers, setAmountUsers] = useState(0);

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
            setAmountUsers(response.data.length);
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
                    <h5 className="chat__users">Участников: {amountUsers}</h5>
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
                                theme='dark'
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