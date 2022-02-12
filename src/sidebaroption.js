import React, { useState,useEffect } from 'react';
import {Link,Redirect} from 'react-router-dom'
import "./sidebaroption.css";
import {useSelector,useDispatch} from "react-redux"
import {setNull,setTokenNumber} from "./actions/index";
import changeToken from './reducers/setToken';
import Popper from '@mui/material/Popper';
import Test from './test';

function Sidebaroption({text,Icon,rou_val}) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [contained,setContained]=useState(true)

    const signout=()=>{
        setOpen(true)

        // dispatch(setNull(null))
        // localStorage.removeItem('token');
        
    }
    if(rou_val=='signout'){
       return(
            <div className="sidebaroption">
                <Popper open={open} transition>
                <Test />
                </Popper>
                <Icon/>
                <h2 className="link" onClick={signout}>{text}</h2>
            </div>
       );
    }
    else{
        return (
            <div className="sidebaroption">
                <Icon/>
                <h2><Link className="link" to={rou_val}>{text}</Link></h2>
                
            </div>
        );
    }
}

export default Sidebaroption;
