import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { loggedUserName } from '../store/selectors/userSelectors'; 
import { AiOutlineSend } from 'react-icons/ai';
import Spinner from "../Components/Spinner";
import { BiSmile } from 'react-icons/bi';
import GlobalServerError from "../HOC/GlobalServerError";
import { isServerError } from "../store/selectors/serverErrorSelectors";
import ChatHeader from "../Components/ChatHeader";
import Messages from "../Components/Messages";
import EmojiPopup from "../Components/EmojiPopup";
import styled from 'styled-components';
import darkBackground from '../assets/img/darkBackground.jpg';
import lightBG from '../assets/img/lightBG.jpg'

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
        width: 100%;
        padding: 20px 25px;
        border-radius: 10px;
        background-color: ${(props) => props.theme.chatInput};
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
        color: ${(props) => props.theme.fontColor};
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
    .main {
        margin-top: 60px;
    }
    .bismile, .aioutlinesend {
        color: ${(props) => props.theme.fontColor};
    }
`

function Chat():JSX.Element {

    const [messages, setMessages] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [connected, setConnected] = useState(false);
    const socket = useRef();
    const userName = useSelector(loggedUserName);
    const [handleStiker, setHandleStiker] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const isError = useSelector(isServerError);
    const [messagesCount, setMessagesCount] = useState(0);

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
        socket.current.onmessage = (event: { data: string; }) => {
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
        setHandleStiker(false);
        setMessagesCount(messagesCount + 1);
    }

    if(!connected) {
        return <Spinner/>
    }
    if (isError) {
        return <GlobalServerError/>
    }

    return (
        <StyledChat>
            <div className="form__wrapper">
                <ChatHeader searchValue={searchValue} setSearchValue={setSearchValue}/>
                <div className="container">
                    <main className="main">
                        <Messages 
                            messages={messages} 
                            searchValue={searchValue} 
                            userName={userName}
                        />
                        <div className="form">
                            <button className="form__btn form__btn-smile" type="button" onClick={() => setHandleStiker(!handleStiker)}><BiSmile className="bismile"/></button>
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
                            <button type="button" className="form__btn" onClick={sendMessage}><AiOutlineSend className="aioutlinesend"/></button>
                        </div>
                        <EmojiPopup 
                            handleStiker={handleStiker} 
                            setMessageValue={setMessageValue} 
                        />
                    </main>
                </div>
            </div>
        </StyledChat>
    )
}

export default Chat;