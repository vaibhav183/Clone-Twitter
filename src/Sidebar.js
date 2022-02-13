import React, { useState, useEffect } from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import "./Sidebar.css"
import Sidebaroption from './sidebaroption';
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Button from '@mui/material/Button';
import Sign_in from './Sign_in'
import {useSelector,useDispatch} from "react-redux"

function Sidebar() {
    const myState=useSelector((state)=>state.changeToken)
    const myState1=useSelector((state)=>state.changeToken1)


if(myState!=null && myState1!=null){
    return(
    <div className = "sidebar" >
        <TwitterIcon className="twitter-icon"/>
        <Sidebaroption active text="Home" Icon={HomeIcon} rou_val="Home"/>
        <Sidebaroption text="Message" Icon={MailOutlineIcon} rou_val="message"/>
        <Sidebaroption text="Sign Out" Icon={LockOpenIcon} rou_val="signout"/>
        <Sidebaroption text="Profile" Icon={PermIdentityIcon} rou_val="profile"/>
        <Sidebaroption text="Reviews" Icon={ReviewsIcon} rou_val="reviews"/>
        <Button variant="outlined" className="sidebar-tweet">Tweet</Button>
    </div>
    )
}
else{
return (
    <div className = "sidebar" >
        <TwitterIcon className="twitter-icon"/>
        <Sidebaroption active text="Home" Icon={HomeIcon} rou_val="Home"/>
        <Sidebaroption text="Sign In" Icon={VpnKeyIcon} rou_val="sign_in" />
        <Sidebaroption text="Sign Up" Icon={LockOpenIcon} rou_val="signup"/>
        <Button variant="outlined" className="sidebar-tweet">Tweet</Button>
    </div>
)
}
}

export default Sidebar;