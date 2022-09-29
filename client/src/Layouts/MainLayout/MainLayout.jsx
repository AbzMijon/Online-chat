import React from "react";

function MainLayout(props) {
    return (
        <div className="home">
            {props.children}
        </div>
    )
};

export default MainLayout;