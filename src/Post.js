import { Avatar } from '@mui/material';
import React,{useState,useCallback} from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import {useSelector,useDispatch} from "react-redux"
import Comment from './Comment'
import axios from 'axios';
import "./Post.css"
import {Link} from 'react-router-dom'

function Post({display_pic,Name,Username,email,verified,text,post_data,post_url,likes,userComment,unique}) {
    const myState=useSelector((state)=>state.changeToken)
    const myState1=useSelector((state)=>state.changeToken1)
    const user_data=useSelector((state)=>state.changeUserData)

    const [start,setStart]=useState(false)
    const [textmsg,setTextmsg]=useState("")
    const [commentsuccess,setCommentsuccess]=useState("");
    const openComment=useCallback(()=>{
        setStart(!start);
    },[start])
    const Commented=()=>{
        console.log(userComment)
        {textmsg!=="" && axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/Commented",{email:email,name:Name,username:Username,pic:display_pic,verified:verified, unique:unique,msg:textmsg,com_name:user_data.name,com_username:user_data.username,com_email:user_data.email,com_pic:user_data.imgurl,text:text,post_data:post_data,post_url:post_url})
        .then(response =>{
            if(response.data.msg=="success"){
                setTextmsg("")
                setCommentsuccess("Thank you for Comment...🔥")
            }
            else{
                setCommentsuccess("Something Went wrong! Try again later...😔")
            }
        })
        .catch(err =>{
            setCommentsuccess("Server Error! Try again later...😔")
        })}
    }
    return (
        <div className="post" style={{whiteSpace: 'pre-line'}}>
                <div className="post_header">
                    <div className="post_headertext">
                    <div className="post_avatar">
                        <Avatar src={display_pic} alt=""/>
                    </div>
                        <p>{myState && user_data.email==email?<Link to="/profile" style={{color:"whitesmoke",fontSize:"1.1em"}}>{Name}</Link>:<Link to={`userDetail/${email}`} style={{color:"whitesmoke",fontSize:"1.1em"}}>{Name}</Link>}
                        <span id="post_badge">
                        {verified && <VerifiedIcon id="post_headerSpecial" />}
                        {"   "}    {Username}
                        </span>
                        </p>
                    </div>
                    
                </div>
                <pre style={{fontSize: 'inherit',color: 'white',border: 'initial',marginLeft:"0.6em",marginRight:"0.5em",fontFamily: 'inherit',whiteSpace:'pre-wrap'}}>{text}</pre>
                {post_data && <img className="post_data" src={post_data} alt=""/>}
                {post_data && <br/>}
                {post_url && <img className="post_data" src={post_url} alt=""/>}
                <div id="footer">
                <ChatBubbleOutlineIcon fontSize="small" onClick={openComment} style={{cursor:"pointer",color:"whitesmoke"}} />
                <FavoriteBorderIcon fontSize="small" style={{cursor:"pointer",color:"whitesmoke"}} />
                </div>
                {start && myState && myState1 && <div style={{alignItems:"center",padding:"2% 5% 2% 5%"}}>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Comment..."
                        value={textmsg}
                        onChange={(e)=>{setTextmsg(e.target.value);setCommentsuccess("")}}
                        style={{width:"75%",borderStyle:"outset",borderRadius:"5px",borderColor:"grey",borderWidth:"2px",marginLeft:"auto",marginRight:"auto",backgroundColor:"#F0FFFF"}}
                    />
                    <Button variant="contained" onClick={Commented} style={{width:"20%",float:"right",backgroundColor:"#0A1342"}}>Comment</Button>
                    {commentsuccess!=="" && <p>{commentsuccess}</p>}
                </div>}
                {start && <h3 style={{marginLeft:"0.6em",color:"#FFF0F5"}}>Comments...</h3>}
                {start && userComment.map((comment,ind) => {
                        return(<Comment key={ind} name={comment.name} email={comment.email} username={comment.username} pic={comment.pic} msg={comment.msg} verified={verified} />)
                })}
                {start && userComment.length==0 && <p style={{color:"#F8F8FF",marginLeft:"0.6EM"}}>Oops! No Comments yet 😞.</p>}
        </div>
    )
}

export default Post
