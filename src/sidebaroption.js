import React from 'react'
import "./sidebaroption.css";
function sidebaroption({text,Icon}) {
    return (
        <div className="sidebaroption">
            <Icon/>
            <h2>{text}</h2>
        </div>
    );
}

export default sidebaroption;
