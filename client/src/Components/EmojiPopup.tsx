import React from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { themeMode } from '../store/selectors/themeSelectors';

const StyledEmojiPicker = styled.div `
    .emoji {
        position: absolute;
        bottom: 120px;
        left: 0px;
        transition: 0.2s ease-in;
    }
`

function EmojiPopup({ handleStiker, setMessageValue }):JSX.Element {

    type MessageTypes = {
        id: number | string,
        userName: string,
        event: string,
        message: string,
    }

    const theme = useSelector(themeMode);

    return (
        <StyledEmojiPicker>
            <div className="emoji">
            {handleStiker && <EmojiPicker
                theme={theme === 'dark' ? 'dark' : 'light'}
                onEmojiClick={(emojiObj: { emoji: any; }) => setMessageValue((prevMessage: MessageTypes) => prevMessage + emojiObj.emoji)}
                className='message__emojipicker'
                />
            }
        </div>
        </StyledEmojiPicker>
        
    )
}

export default EmojiPopup;