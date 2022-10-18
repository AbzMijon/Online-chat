import React from "react";
import { useField } from "formik";
import styled from 'styled-components';

const StyledSupportTextArea = styled.div `
    .field {
        position: relative;
        margin-bottom: 20px;
    }
    .field__error {
        color: #921919;
        font-size: 11px;
    }
    .support__title-field {
        position: absolute;
        top: -23px;
        left: 0px;
        z-index: 2;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #4A5568;
        background-color: transparent;
    }
    .support__title-field::first-letter {
        text-transform: uppercase;
    }
    .support__field, .support__field--error {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        background-color: #0d1117;
        color: #fff;
        border-radius: 5px;
        padding: 18px 22px;
        width: 100%;
        border: 1px solid #1f1f1f;
        max-width: 700px;
    }
    .support__field--error {
        border: 1px solid #811d1d;
    }
`

function SupportFormikTextArea(props) {
    
	const [field, meta, helpers] = useField(props.name);
    console.log(meta.error);
    
	return (
        <StyledSupportTextArea>
            <div className='field'>
                <textarea className={meta.touched && meta.error ? 'support__field--error' : 'support__field'} rows="20" {...props} {...field} />
                {meta.touched && meta.error && (
                    <p className='field__error'>{meta.error}</p>
                )}
		    </div>
        </StyledSupportTextArea>
	);
}

export default SupportFormikTextArea;