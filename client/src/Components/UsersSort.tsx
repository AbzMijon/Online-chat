import React, { useState } from "react";
import { usersSortArray } from '../constans/usersSortArray';

function UserSort({ setSortValue }):JSX.Element {
    
    return (
        <select name="users" onChange={(e) => setSortValue(e.target.value)}>
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