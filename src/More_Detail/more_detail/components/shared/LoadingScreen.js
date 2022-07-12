import React from "react";
import { LogoLoadingIcon } from "../../icons";
import "./LoadingScreen.css"

function LoadingScreen({name="Loading..."}) {

  return (
    <h1 className="loaddingg" style={{marginLeft:"auto",marginRight:"auto",marginTop:"2em",fontSize:"3em",color:"whitesmoke"}}>{name}</h1>
    );
}

export default LoadingScreen;
