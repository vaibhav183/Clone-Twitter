import { Avatar } from '@mui/material';
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import "./Post.css"

function Post({display_pic,Name,Username,verified,text,post_data}) {
    return (
        <div className="post">
                <div className="post_header">
                    <div className="post_headertext">
                    <div className="post_avatar">
                        <Avatar src={display_pic} alt=""/>
                    </div>
                        <p>{Name}
                        <span id="post_badge">
                        {verified && <VerifiedIcon id="post_headerSpecial" />}
                        {" "}    @{Username}
                        </span>
                        </p>
                    </div>
                    
                </div>
                <p>{text}</p>
                <img className="post_data" src={post_data}/>
                <div id="footer">
                <ChatBubbleOutlineIcon fontSize="small"/>
                <RepeatIcon fontSize="Small"/>
                <FavoriteBorderIcon fontSize="small"/>
                <PublishIcon fontSize="small"/>
            </div>
        </div>
    )
}

export default Post
