import React, { useState } from "react";
import { usersSortArray } from '../constans/usersSortArray';
import styled from 'styled-components';

const StyledUserSort = styled.div `
    .sort {
        padding: 7px 15px;
        border-radius: 5px 5px 0 5px;
        font-size: 15px;
        outline: none;
        border: none;
    }
`

function UserSort({ setSortValue }):JSX.Element {
    
    return (
        <StyledUserSort>
            <select className="sort" name="users" onChange={(e) => setSortValue(e.target.value)}>
                {usersSortArray.map(sortOption => {
                    return (
                        <option className="users__sortfield" key={sortOption.id} value={sortOption.id}>
                            {sortOption.text}
                        </option>
                    )
                })}
            </select>
        </StyledUserSort>
    )
}

export default UserSort;