import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import "./sidebaroption.css";
function sidebaroption({text,Icon,rou_val}) {
    return (
        <div className="sidebaroption">
            <Icon/>
            <h2><Link className="link" to={rou_val}>{text}</Link></h2>
            
        </div>
    );
}

export default sidebaroption;
