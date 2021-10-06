import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import TwitterIcon from '@material-ui/icons/Twitter';
import "./Sidebar.css"
import Sidebaroption from './sidebaroption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import QueueIcon from '@material-ui/icons/Queue';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Button from '@mui/material/Button';
import axios from 'axios';
import Sign_in from './Sign_in'

function Sidebar() {
    return (
        <div className = "sidebar" >
            <TwitterIcon className="twitter-icon"/>
            <Sidebaroption active text="Home" Icon={HomeIcon} rou_val="Home"/>
            {/* <Sidebaroption text="Explore" Icon={SearchIcon}/> */}
            {/* <Sidebaroption text="Notifications" Icon={NotificationsIcon}/> */}
            <Sidebaroption text="Message" Icon={MailOutlineIcon} rou_val="message"/>
            <Sidebaroption text="Sign In" Icon={VpnKeyIcon} rou_val="sign_in" />
            <Sidebaroption text="Sign Up" Icon={LockOpenIcon} rou_val="signup"/>
            {/* <Sidebaroption text="Bookmarks" Icon={BookmarkBorderIcon}/> */}
            {/* <Sidebaroption text="Lists" Icon={QueueIcon}/> */}
            <Sidebaroption text="Profile" Icon={PermIdentityIcon} rou_val="profile"/>
            <Sidebaroption text="Reviews" Icon={ReviewsIcon} rou_val="reviews"/>
            {/* <Sidebaroption text="More" Icon={MoreHorizIcon}/> */}
            <Button variant="outlined" className="sidebar-tweet">Tweet</Button>
        </div>
    )
}

export default Sidebar;