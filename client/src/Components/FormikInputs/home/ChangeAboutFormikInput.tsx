import React from "react";
import { useField } from "formik";
import styled from 'styled-components';

const StyledChangeAboutFormikInput = styled.div `
    .field {
        position: relative;
    }
    .field__error {
        color: #921919;
        font-size: 11px;
    }
    .home__field, .home__field--error {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #2D3748;
        border-radius: 5px;
        padding: 18px 22px;
        width: 100%;
    }
    .home__field {
        border: 1px solid #E8E8E8;
    }
    .home__field--error {
        border: 1px solid #811d1d;
    }
`

function ChangeAboutFormikInput(props) {
    
	const [field, meta, helpers] = useField(props.name);
    
	return (
        <StyledChangeAboutFormikInput>
            <div className='field'>
                <textarea className={meta.touched && meta.error ? 'home__field--error' : 'home__field'} {...props} {...field} />
                {meta.touched && meta.error && (
                    <p className='field__error'>{meta.error}</p>
                )}
		    </div>
        </StyledChangeAboutFormikInput>
	);
}

export default ChangeAboutFormikInput;