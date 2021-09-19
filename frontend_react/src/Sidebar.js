import React from 'react';
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
import Button from '@mui/material/Button';
function Sidebar() {
    return ( 
        <div className = "sidebar" >
            <TwitterIcon className="twitter-icon"/>
            <Sidebaroption active text="Home" Icon={HomeIcon}/>
            <Sidebaroption text="Explore" Icon={SearchIcon}/>
            <Sidebaroption text="Notifications" Icon={NotificationsIcon}/>
            <Sidebaroption text="Message" Icon={MailOutlineIcon}/>
            <Sidebaroption text="Bookmarks" Icon={BookmarkBorderIcon}/>
            <Sidebaroption text="Lists" Icon={QueueIcon}/>
            <Sidebaroption text="Profile" Icon={PermIdentityIcon}/>
            <Sidebaroption text="More" Icon={MoreHorizIcon}/>
            <Button variant="outlined" className="sidebar-tweet">Tweet</Button>
        </div>
    )
}

export default Sidebar;