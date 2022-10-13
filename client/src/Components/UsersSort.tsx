import React, { useState } from "react";
import { usersSortArray } from '../constans/usersSortArray';

function UserSort():JSX.Element {

    const [selectValue, setSelectValue] = useState('');
    
    return (
        <select name="users" onChange={(e) => setSelectValue(e.target.value)}>
            {usersSortArray.map(sortOption => {
                return (
                    <option className="users__sortfield" key={sortOption.id} value={sortOption.id}>
                        {sortOption.text}
                    </option>
                )
            })}
        </select>
    )
}

export default UserSort;