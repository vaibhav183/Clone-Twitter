import React,{useEffect,useState} from 'react';
import "./Profile.css"
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import {Link,Redirect} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import {useSelector,useDispatch} from "react-redux"
import { user_error,name_error } from './error';
import CreateIcon from '@mui/icons-material/Create';
import {filling,clear, setNull,follower_change,following_change} from "./actions/index";
import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'0.5em',
  boxShadow: 24,
  p: 2,
};


const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : props.color === 'blue'
            ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
            :  props.color === 'violet'
                ? 'linear-gradient(315deg, #03e5b7 0%, #037ade 74%)'
                :  'linear-gradient(315deg, #ee9617 0%, #fe5858 74%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: '3em',
    width: '16em',
    padding: '0 30px',
    margin: 2,
  },
});
function MyButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

MyButton.propTypes = {
  color: PropTypes.oneOf(['blue', 'red', 'violet','yellow']).isRequired,
};

//Profile Photo short Name
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {bgcolor: stringToColor(name)},
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function SimpleContainer() {

  const myState=useSelector((state)=>state.changeToken)
  const myState1=useSelector((state)=>state.changeToken1)
  const user_data=useSelector((state)=>state.changeUserData)
  const dispatch = useDispatch()

  const [bfollower,setBfollower]=useState(false)
  const [bfollowing,setBfollowing]=useState(false)
  const [bposts,setBposts]=useState(false)
  const [bcomments,setBcomments]=useState(true)
  const [update,setUpdate]=useState(false)
  const [photo_upload,setPhoto_upload]=useState("Upload Photo")

  const handleClick=(e)=>{
    switch(e.target.id){
      case "follower":
        setBfollower(true);
        setBfollowing(false)
        setBposts(false);
        setBcomments(false);
        setUpdate(false)
        break;
      case "following":
        setBfollower(false);
        setBfollowing(true)
        setBposts(false);
        setBcomments(false);
        setUpdate(false)
        break;
      case "posts":
        setBfollower(false);
        setBfollowing(false)
        setBposts(true);
        setBcomments(false);
        setUpdate(false)
        break;
      case "comments":
        setBfollower(false);
        setBfollowing(false)
        setBposts(false);
        setBcomments(true);
        setUpdate(false)
        break;
      case "update":
        setBfollower(false);
        setBfollowing(false)
        setBposts(false);
        setBcomments(false);
        setUpdate(true)
        break;
      default:
        setBfollower(false);
        setBfollowing(false)
        setBposts(false);
        setBcomments(true);
    }
  }

  const [open, setOpen] = useState(false);
  const [fopen, setFopen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fhandleClose = ()=> setFopen(false)
  const fhandleOpen = () => setFopen(true)

  const block=(e)=>{
    axios.post('http://localhost:3001/block_user',{email:user_data.email,user_email:(e.target.id)})
    .then((res)=>{
      if(res.data.msg=='success'){
        dispatch(follower_change(e.target.id));
        setOpen(false);
      }
      else{
        setOpen(false);
        alert("Some Error Occured!! Please try again...");
      }
    })
    .catch((err)=>{
      setOpen(false)
      alert("Some Error Occured!! Please try again...");
    })
  }

  const unfollow=(e)=>{
    axios.post('http://localhost:3001/unfollow_user',{email:user_data.email,user_email:(e.target.id)})
    .then((res)=>{
      if(res.data.msg=='success'){
        dispatch(following_change(e.target.id));
        setFopen(false);
      }
      else{
        setFopen(false);
        alert("Some Error Occured!! Please try again...");
      }
    })
    .catch((err)=>{
      setFopen(false)
      alert("Some Error Occured!! Please try again...");
    })
  }

  if(myState!=null && myState1!=null){
  return (
      <Container maxWidth="lg" style={{marginTop:'1em'}}>
      <Grid container spacing={4}>
        <Grid item xs={8} sm={4}>
          <Item>
              <Avatar {...stringAvatar(user_data.name)} className="Profile_Photo" src={user_data.imgurl} />
              <h1>{user_data.name}</h1>
              <h3 style={{color:'gray',marginTop:'-1em'}}>{user_data.username}{" "}{user_data.verified && <VerifiedIcon id="post_headerSpecial" />}</h3>
              <div>
              <Badge className="follower" badgeContent={user_data.followers.length} color="warning">
              <MyButton color="red" id="follower" onClick={(e)=>handleClick(e)}>Follower</MyButton>
              </Badge>
              <Badge className="following" badgeContent={user_data.following.length} color="info">
              <MyButton color="blue" id="following" onClick={(e)=>handleClick(e)}>Following</MyButton>
              </Badge>
              <Badge className="following" badgeContent={user_data.posts.length} color="warning">
              <MyButton color="yellow" id="posts" onClick={(e)=>handleClick(e)}>Posts</MyButton>
              </Badge>
              <Badge className="following" badgeContent={user_data.comments.length} color="info">
              <MyButton color="violet" id="comments" onClick={(e)=>handleClick(e)}>Comments</MyButton>
              </Badge>
              <Badge className="update_profile">
              <MyButton color="violet" id="update" onClick={(e)=>handleClick(e)}>Update Profile</MyButton>
              </Badge>
              </div>
          </Item>
        </Grid>
        <Grid item xs={12} sm={10} md={8} style={{marginTop:'-0.5em',marginLeft:'auto',marginRight:'auto'}} >


          {/* Follower Section */}
         {bfollower && <List sx={{marginLeft:'auto',marginRight:'auto', width: '80%', bgcolor: 'background.paper' }}>
         <h1 style={{textAlign:'center',marginTop:'0em'}}>Folllowers</h1>
         {(user_data.followers).map((item)=>(
            <ListItem alignItems="center" style={{backgroundImage:'linear-gradient(315deg, #FF8008 0%, #FFC837 74%)',borderRadius:'0.4em',marginBottom:'0.8em'}}>
              <ListItemAvatar>
                <Avatar {...stringAvatar(item.name)} src={item.imgurl} />
              </ListItemAvatar>
              <ListItemText
                primary={<b>{item.name}{item.verified && <VerifiedIcon id="post_headerSpecial" />}</b>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'block' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.username}<br/>
                      <strong style={{color:'white'}}>{`Followers: `}</strong> {item.followers>0?item.followers:0}<br/> 
                      <strong>{`Following: `}</strong> {item.following>0?item.following:0}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
              <Button variant="contained" style={{float:'right',marginRight:'-4em'}} onClick={handleOpen}>Block</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
                    Block To User<hr/>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to <b>block</b> this user?
                  </Typography>
                  <Button variant="contained" color="inherit" style={{marginTop:'2em'}} onClick={handleClose}>Dismiss</Button>
                  <Button variant="contained" color="error"  id={item.email} style={{marginTop:'2em',float:'right'}} onClick={block}>Yes</Button>
                </Box>
              </Modal>
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
            </List>}

          {/* Following Section */}
          {bfollowing && <List sx={{marginLeft:'auto',marginRight:'auto', width: '80%', bgcolor: 'background.paper' }}>
            <h1 style={{textAlign:'center',marginTop:'0em'}}>Folllowing</h1>
            {(user_data.following).map((item)=>(
                <ListItem alignItems="center" style={{backgroundImage:'linear-gradient(315deg, #A6FFCB 0%, #12D8FA 74%)',borderRadius:'0.4em',marginBottom:'0.8em'}}>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(item.name)} src={item.imgurl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<b>{item.name}{item.verified && <VerifiedIcon id="post_headerSpecial" />}</b>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.username}<br/>
                          <strong style={{color:'white'}}>{`Followers: `}</strong> {item.followers>0?item.followers:0}<br/> 
                          <strong>{`Following: `}</strong> {item.following>0?item.following:0}
                        </Typography>
                        
                      </React.Fragment>
                    }
                  />
                  <Button variant="contained" style={{float:'right',marginRight:'-4em'}} onClick={fhandleOpen}>Unfollow</Button>
                  <Modal
                    open={fopen}
                    onClose={fhandleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
                        Unfollow To User<hr/>
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Do you want to <b>Unfollow</b> this user?
                      </Typography>
                      <Button variant="contained" color="inherit" style={{marginTop:'2em'}} onClick={fhandleClose}>Dismiss</Button>
                      <Button variant="contained" color="error"  id={item.email} style={{marginTop:'2em',float:'right'}} onClick={unfollow}>Yes</Button>
                    </Box>
                  </Modal>
                  <Divider variant="inset" component="li" />
                </ListItem>
              ))}
                </List>}

          {/* Post Data */}
          {bposts && <div className="comments">
              <h1 style={{textAlign:'center',marginTop:'0em'}}>All Posts</h1>
              {(user_data.posts).map((item)=>(
                  <Paper sx={{ padding: "2em",marginBottom:'1em'}} style={{backgroundImage:'linear-gradient(135deg,#f7797d 0%,#FBD786 40%)',borderRadius:'0.4em'}} elevation={2}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid justifyContent="left" item xs={12} zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{item.name}<span id="post_badge" style={{color:'#210070'}}>&ensp;&ensp;&ensp;{item.date.slice(0,10)}</span></h4>
                        {/* <p style={{ textAlign: "left", color: "white",marginTop:'0px' }}>
                          {(item.time).slice(0,10)}
                        </p> */}
                        <pre style={{ border: 'initial',whiteSpace:'pre-wrap',padding: 'initial',color:'#d72631',fontFamily:'sans-serif',fontSize:'inherit' }}>
                          {item.text}
                        </pre>
                        <Grid style={{display:'flex',alignItems: 'flex-start',columnGap:'1em'}}>
                        {item.post_data==""?"":<img sm={5} style={{marginBottom:'1em',height:'22em',maxWidth:'60%'}} src={item.post_data} />}
                        {item.post_url==""?"":<img sm={5} style={{marginBottom:'1em',height:'22em',maxWidth:'60%'}} src={item.post_url} />}
                        </Grid>
                        {/* <Grid justifyContent="left" item xs={12} zeroMinWidth>
                          <h4>Me:</h4>
                          <pre style={{fontFamily:'sans-serif', fontSize:'1em',lineHeight:0.6,marginLeft:'1em',marginTop:'-0.4em'}}>{item.my_comment}</pre>
                      </Grid> */}
                      </Grid>
                    </Grid>
                  </Paper>
              ))}
            </div>}

          {/* Comment Section */}
            {bcomments && <div className="comments">
              <h1 style={{textAlign:'center',marginTop:'0em'}}>Comments</h1>
              {(user_data.comments).map((item)=>(
                  <Paper sx={{ padding: "2em",marginBottom:'1em'}} style={{backgroundImage:'linear-gradient(315deg, #ff5f6d 0%, #ffc371 74%)',borderRadius:'0.4em'}} elevation={2}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar {...stringAvatar(item.name)} src={item.imgurl} />
                      </Grid>
                      <Grid justifyContent="left" item xs={12} zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{item.name}<span id="post_badge" style={{color:'#210070'}}>&ensp;&ensp;&ensp;@{item.username}{" "}{item.verified && <VerifiedIcon id="post_headerSpecial" />}</span></h4>
                        <p style={{ textAlign: "left", color: "white",marginTop:'0px' }}>
                          {(item.time).slice(0,10)}
                        </p>
                        <pre style={{ textAlign: "left",color:'#d72631',fontFamily:'sans-serif',fontSize:'1em',whiteSpace:'pre-wrap'}}>
                          {item.post_data}
                        </pre>
                        <img alt={item.post_url} src={item.post_url} />
                        <Grid justifyContent="left" item xs={12} zeroMinWidth>
                          <h4>Me:</h4>
                          <pre style={{fontFamily:'sans-serif', fontSize:'1em',whiteSpace:'pre-wrap',marginLeft:'1em',marginTop:'-0.4em'}}>{item.my_comment}</pre>
                      </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
              ))}
            </div>}

            {/* Update Profile */}
            {update && <div className="comments">
            <h1 style={{textAlign:'center',marginTop:'0em'}}>Update Profile</h1>
                  {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar> */}
                  {/* <Typography component="h1" variant="h5">
                    Sign up
                  </Typography> */}
                  <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Button component="label">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <CreateIcon />
                    }
                  >
                  <Avatar {...stringAvatar(user_data.name)} src={user_data.imgurl} style={{width:'7em',height:'7em',opacity:'0.7'}} />
                  </Badge>
                  <input
                    type="file"
                    hidden
                  />
                  </Button>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="name"
                          name="name"
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          value={user_data.name}
                          autoFocus
                          helperText={name_error}
                        />
                      </Grid>

                      <Grid item xs={10} id='email_grid'>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          value={user_data.username}
                          autoComplete="username"
                          helperText={user_error}
                        />
                      </Grid>
                      
                      <Grid item xs={10}>
                        <Button
                          variant="outlined"
                          component="label"
                          endIcon={<PhotoCamera />}
                        >
                          {photo_upload}
                          <input
                            type="file"
                            // onChange={(e) => upload(e)}
                            hidden
                          />
                        </Button>
                      </Grid>

                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      id="signUp"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>

                    {/* Signing Up */}
                    <LoadingButton
                      loading
                      className="hide_grid"
                      id="signingUp"
                      fullWidth
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      sx={{ mt: 3, mb: 2,bgcolor:'#bd00fc' }}
                      variant="contained"
                    >
                      Signing up...
                    </LoadingButton>


                    <Link to="/sign_in" style={{textDecoration:"none"}}>
                    <Button fullWidth variant="text" style={{bgcolor:"red"}}>Already have an account? Sign in</Button>
                    </Link>
                    <Link to="/" style={{textDecoration:"none"}}>
                    <Button fullWidth sx={{ mt: 2, mb: 5 }} variant="text">Home Page</Button>
                    </Link>
                    {/* <Grid justifyContent="center">
                        <Link to="/sign_in">
                        <Linked href="#" variant="body2">
                          Already have an account? Sign in
                        </Linked>
                        </Link>
                    </Grid> */}
                  </Box>
              </div>}
        </Grid>
      </Grid>
      </Container>
  );
  }
  else{
    return <Redirect to="/" />
  }
}