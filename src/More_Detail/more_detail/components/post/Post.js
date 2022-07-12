import React,{useState,useEffect} from "react";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import axios from 'axios'
import {useSelector,useDispatch} from "react-redux"
import Grid from '@mui/material/Grid';
import { Redirect } from 'react-router-dom'
import {
  MoreIcon,
  CommentIcon,
  ShareIcon,
  UnlikeIcon,
  LikeIcon,
  RemoveIcon,
  SaveIcon
} from "../../icons";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Hidden,
  Divider,
  TextField
} from "@material-ui/core";
import OptionsDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data";
import { Avatar } from "@material-ui/core";
import PostSkeleton from "./PostSkeleton";


function Post(props) {
  const classes = usePostStyles();
  const [loading, setLoading] = React.useState(true);
  const [user_data,setUser_data]=useState(null)
  const [likeedval,setlikeedval]=useState(0)
  const [showOptionsDialog, setOptionsDialog] = React.useState(false);
  const myState=useSelector((state)=>state.changeToken)
  const myState1=useSelector((state)=>state.changeToken1)
  const main_user=useSelector((state)=>state.changeUserData)

  useEffect(()=>{
    axios.get(`https://clone-twitter-by-vaibhav.herokuapp.com/user_detail/${props.id}`)
    .then((res)=>{
      if(res.data.msg=="success"){
        setUser_data(res.data.val)
        setlikeedval(res.data.val.likes)
        setLoading(false)
      }
      else{
        alert("Coundn't able to fetch this Post right now...")
      }
    })
    .catch((err)=>{
      alert("Something went wrong")
    })
  },[])

  if (loading) return <PostSkeleton />;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard name={user_data.name} username={user_data.username} profile_image={user_data.user_pic}  avatarSize={32} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setOptionsDialog(true)}
          />
        </div>
        {/* Post Image */}
        <div className={classes.postImage}>
          <img src={user_data.post_data || user_data.post_url} alt="Post media" className={classes.image} />
        </div>
        {/* Post Buttons */}
        <div className={classes.postButtonsWrapper}>
          {myState && myState1 && <div className={classes.postButtons}>
            <LikeButton id={props.id} likes={user_data.likes+1} email={user_data.email} likedval={likeedval} />
          </div>}
          <div className={classes.postCaptionContainer}>
            
            {user_data.user_comment.map((comment,index) => (
                <div key={index} className="post_headertext">
                <div className="post_avatar" style={{marginTop:"0%"}}>
                    <Avatar src={comment.pic} alt={comment.name} />
                </div>
                <div>
                    <p><Link to={`/userDetail/${comment.email}`}><strong>{comment.name}</strong></Link>
                    <span id="post_badge">
                    {"  "}    {comment.username}
                    </span>
                    </p>
                    <pre style={{fontSize: 'inherit',color: 'inherit',fontFamily: 'inherit',whiteSpace:'pre-wrap',color:'black'}}>{comment.msg}</pre>
                </div>
                {/* </Link>  */}
              </div>
            ))}
          </div>
          <Typography color="textPrimary" className={classes.datePosted}>
            {(user_data.date).slice(0,10)}
          </Typography>
            {myState && myState1 && <div className={classes.comment}>
              <Divider />
              <Comment user_data={user_data} main_user={main_user} id={props.id} />
            </div>}
        </div>
      </article>
      {/* {showOptionsDialog && (
        <OptionsDialog user={user_data} onClose={() => setOptionsDialog(false)} />
      )} */}
    </div>
  );
}

function LikeButton({id,likes,likedval,email}) {
  const classes = usePostStyles();
  const [liked, setLiked] = React.useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const [likeedval,setlikeedval]=useState(likedval)
  const handleLike=()=> {//..............................................................................
    {!liked && axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/likes",{"id":id,"likes":likes,"email":email})
    .then((resp)=>{
      setLiked(true);
      setlikeedval(likeedval+1)
    })
    .catch((err)=>{
      alert("Can't like post right now....Sorry")
      setLiked(true);
    })}
  }
  return( 
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <Icon className={className} onClick={handleLike} />
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.likes} style={{display:"inline",width:"5em"}}>
          <span>{`${likeedval} likes`}</span>
        </Typography>
      </Grid>
    </Grid>
  );
}

function SaveButton() {
  const classes = usePostStyles();
  const [saved, setSaved] = React.useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;

  function handleSave() {
    console.log("save");
    setSaved(true);
  }

  function handleRemove() {
    console.log("remove");
    setSaved(false);
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

function Comment({user_data,main_user,id}) {
  const classes = usePostStyles();
  const [content, setContent] = React.useState("");

  const handleComment=()=>{
    {content!="" && axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/commented",{"com_email":main_user.email,"unique":id,"com_name":main_user.name,"com_username":main_user.username,"com_pic":main_user.imgurl,"name":user_data.name,"username":user_data.username,"pic":user_data.profile_image,"verified":user_data.verified,"msg":content,"post_data":user_data.post_data,"post_url":user_data.post_url,"text":user_data.text})
    .then((resp)=>{
      if(resp.data.msg=="success"){
        setContent("")
      }
      else{
        alert("Can't able to comment right now....Sorry for inconvenience.")
      }
    })
    .catch((err)=>{
      alert("Server Error! Please try again later")
    })}
  }

  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        onChange={event => setContent(event.target.value)}
        className={classes.textField}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline
          }
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        onClick={handleComment}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
