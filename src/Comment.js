import React from 'react'
import { Avatar } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import Box from '@mui/material/Box';
import "./Post.css"
import {useSelector,useDispatch} from "react-redux"
import {Link} from 'react-router-dom'

const commonStyles = {
    bgcolor: '#415A9E',
    borderColor: 'black',
    m: 1,
    width: '88%',
    marginLeft:'5%'

  };

function Comment(props) {
    const myState=useSelector((state)=>state.changeToken)
    const user_data=useSelector((state)=>state.changeUserData)
    return (
        <Box sx={{ ...commonStyles, borderRadius: 2, display: 'flex',whiteSpace: 'normal' }} >
        {/* <div className="comment" style={{whiteSpace: 'pre-line',width:"88%",marginLeft:"5%"}}> */}
            <div className="post_header">
                <div className="post_headertext">
                <div className="post_avatar" style={{marginTop:"0%"}}>
                    <Avatar src={props.pic} alt={props.name} />
                </div>
                <div>
                    <p> {myState && user_data.email==props.email?<Link to="/profile" style={{color:"whitesmoke",fontSize:"1.1em"}}>{props.name}</Link>:<Link to={`userDetail/${props.email}`} style={{color:"whitesmoke",fontSize:"1.1em"}}>{props.name}</Link>}
                    <span id="post_badge">
                    {props.verified && <VerifiedIcon id="post_headerSpecial" />}
                    {" "}    @{props.username}
                    </span>
                    </p>
                    <pre style={{fontSize: 'inherit',color: 'inherit',fontFamily: 'inherit',whiteSpace:'pre-wrap'}}>{props.msg}</pre>
                </div>
                </div>
            {/* </div> */}
        </div>
        </Box>
    )
}

export default Comment
