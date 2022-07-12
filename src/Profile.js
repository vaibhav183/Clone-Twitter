import React,{useEffect,useState} from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import "./Profile.css"
import 'animate.css';
import $ from 'jquery';
import Axios from 'axios'
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
import Navbar from './More_Detail/more_detail/components/shared/Navbar'

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
        ? 'radial-gradient(circle, #161a4b, #13174a, #111348, #0e0f47, #0c0b45)'
        : props.color === 'blue'
            ? 'radial-gradient(circle, #3d2c79, #3b2c7e, #382c82, #352c87, #312c8c)'
            :  props.color === 'violet'
                ? 'radial-gradient(circle, #3d2c79, #3b2c7e, #382c82, #352c87, #312c8c)'
                :  'radial-gradient(circle, #161a4b, #13174a, #111348, #0e0f47, #0c0b45)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === 'red'
        ? '0 3px 5px 2px #172038'
        : '0 3px 5px 2px #172038',
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
  if(name.split('\n').length<=1){
    return {
      sx: {bgcolor: stringToColor(name)},
      children: `${name[0]}`,
    };
  }
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
  const [photo_upload,setPhoto_upload]=useState("")
  const [name_err,setName_err]=useState("")
  const [user_err,setUser_err]=useState("")
  const [updated,setUpdated]=useState(false)
  const [blockChange, setBlockChange] = useState(true);

  //Photo Upload
  function upload(value){
    if(((value.target.files[0].type)=="image/png" || (value.target.files[0].type)=="image/jpeg") && (value.target.files[0].size)>0){
      setPhoto_upload(value.target.files[0].name)
    }
    else{
      setPhoto_upload("Only Photo Allowed")
    }
  }

  //Fetching data
  useEffect(() => {
    Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/fetching_data_user",{token:myState,token1:myState1})
    .then((response)=>{
        if(response.data.msg=='success'){
            dispatch(filling(response.data))
        }
        else{
            dispatch(setNull())
        }
    })
    .catch((err)=>{
        alert("Something went wrong! Please try again later")
    })
    },[blockChange,myState1,myState]);

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

  // Block User
  const block=(e)=>{
    axios.post('https://clone-twitter-by-vaibhav.herokuapp.com/block_user',{email:user_data.email,user_email:e.target.id.split('*')[1],block_status:(e.target.id.split('*')[0]=="true"?true:false)})
    .then((res)=>{
      if(res.data.msg=='success'){
        setOpen(false);
        setBlockChange(!block)
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

  //Unfollow User
  const unfollow=(e)=>{
    axios.post('https://clone-twitter-by-vaibhav.herokuapp.com/unfollow_user',{email:user_data.email,user_email:(e.target.id)})
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

  const errorRemove=(e)=>{
    if(e.target.id=="username")
    setUser_err("");
    else
    setName_err("");
  }
  // Form Submission aaa
  const submitForm = (event) => {
    event.preventDefault();
    // console.log(event.target[0].files[0])
    if($('#name').val()=="" && $('#username').val()=="" && (event.target[0].files[0]==undefined)){
      setName_err(<span style={{color:"red",fontSize:"1.2em"}}>Enter any details to update it</span>);
      setUser_err(<span style={{color:"red",fontSize:"1.2em"}}>Enter any details to update it</span>);
    }
    else{
      setName_err("");
      setUser_err("");
      $('#updating_but').removeClass("hide_grid")
      $('#update_but').addClass("hide_grid");
      Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/username_checking",{username:$('#username').val()})
      .then((res)=>{
        if(res.data.msg=='success'){
          if((event.target[0].files[0]!=undefined) && ((event.target[0].files[0].type)=="image/jpeg" || (event.target[0].files[0].type)=="image/png") && (event.target[0].files[0].size)>0){
            const formData = new FormData()
             formData.append('file', event.target[0].files[0])
             formData.append('upload_preset','postimage' )
             Axios.post("https://api.cloudinary.com/v1_1/vaibhav183vibhu/image/upload",formData)
             .then((response)=>{
              Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/profile_update",{email:myState1,token:myState,name:$('#name').val(),username:$('#username').val(),img:response.data.secure_url})
              .then((response)=>{
                if (response.data.msg === 'success'){
                  Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/fetching_data_user",{token:myState,token1:myState1})
                  .then((response)=>{
                      if(response.data.msg=='success'){
                          dispatch(filling(response.data))
                      }
                      else{
                          dispatch(setNull())
                      }
                      $('#updating_but').addClass("hide_grid");
                      $('#update_but').removeClass("hide_grid");
                  })
                  .catch((err)=>{
                    alert("Some Error Occured")
                    $('#updating_but').addClass("hide_grid");
                    $('#update_but').removeClass("hide_grid");
                  })
                }else if(response.data.msg === 'fail'){
                  alert("Some Error Occured")
                  $('#updating_but').addClass("hide_grid");
                  $('#update_but').removeClass("hide_grid");
                }
              })
              .catch((error)=>{
                alert("Ooh!! something went wrong")
                $('#updating_but').addClass("hide_grid");
                  $('#update_but').removeClass("hide_grid");
              })
             })
             .catch((error)=>{
               alert("Ooh!! some error occured. Please try again later")
               $('#updating_but').addClass("hide_grid");
                  $('#update_but').removeClass("hide_grid");
             })
            }
            else{
              Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/profile_update",{email:myState1,token:myState,name:($('#name').val()),username:$('#username').val(),img:user_data.imgurl})
              .then((response)=>{
                if (response.data.msg === 'success'){
                  Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/fetching_data_user",{token:myState,token1:myState1})
                  .then((response)=>{
                      if(response.data.msg=='success'){
                          dispatch(filling(response.data))
                      }
                      else{
                        alert("Couldn't update due to technical problem")
                          dispatch(setNull())
                      }
                      $('#updating_but').addClass("hide_grid");
                      $('#update_but').removeClass("hide_grid");
                  })
                  .catch((err)=>{
                    alert("Some Error Occured")
                    $('#updating_but').addClass("hide_grid");
                    $('#update_but').removeClass("hide_grid");
                  })
                }else if(response.data.msg === 'fail'){
                  alert("Some Error Occured")
                  $('#updating_but').addClass("hide_grid");
                    $('#update_but').removeClass("hide_grid");
                }
                else{
                  alert("Some Error Occured. Check your internet Connection")
                  $('#updating_but').addClass("hide_grid");
                    $('#update_but').removeClass("hide_grid");
                }
              })
              .catch((error)=>{
                alert("Ooh!! Something went wrong")
                $('#updating_but').addClass("hide_grid");
                    $('#update_but').removeClass("hide_grid");
              })
            }
        }
        else{
          alert("Ooh!! Something went wrong")
                $('#updating_but').addClass("hide_grid");
                    $('#update_but').removeClass("hide_grid");
        }
      })
      .catch((err)=>{
        alert("Ooh!! Server Error...")
                $('#updating_but').addClass("hide_grid");
                    $('#update_but').removeClass("hide_grid");
      })
    }
  }

  const cancelAlert=()=>{
    setUpdated(false);
  }
  
  if(myState!=null && myState1!=null){
  return (
      <Container maxWidth="lg" style={{marginTop:'1em'}}>
        <Navbar data="Profile Section" />
        {updated && <Alert className="animate__animated animate__fadeInDown" severity="success" style={{position:'absolute',zIndex:10,marginLeft:'35%',width:"30%"}}>
        <AlertTitle style={{width:"190%"}}>Update Successfully<CancelIcon style={{float:'right',cursor:"pointer"}} onClick={cancelAlert} /></AlertTitle>
        Your Profile has been <strong>updated</strong>
      </Alert>}
      <Grid container spacing={4} style={{marginTop:"5%"}}>
        <Grid item xs={8} sm={4}>
          <Item className="leftGrid">
              {user_data.name!="" && <Avatar {...stringAvatar(user_data.name)} className="Profile_Photo" src={user_data.imgurl} />}
              <h1 style={{color:"#F0F8FF"}}>{user_data.name}</h1>
              <h3 style={{color:'#FFE4E1',marginTop:'-1em'}}>{user_data.username}{" "}{user_data.verified && <VerifiedIcon id="post_headerSpecial" />}</h3>
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
              <MyButton color="red" id="update" onClick={(e)=>handleClick(e)}>Update Profile</MyButton>
              </Badge>
              </div>
          </Item>
        </Grid>
        <Grid item xs={12} sm={10} md={8} style={{marginLeft:'auto',marginRight:'auto'}} >


          {/* Follower Section */}
         {bfollower && <List sx={{marginLeft:'auto',marginRight:'auto', width: '80%',borderRadius:'1em' ,backgroundColor:"#163057",padding:"0em 0.8em 0.8em 0.8em"}}>
         <h1 style={{textAlign:'center',marginTop:'0em',color:"whitesmoke"}}>Folllowers</h1>
         <hr style={{color:'white'}} />
         {user_data.followers.length==0 && <h2 style={{textAlign:'center',color:'#FAF0E6'}}>Oops! No followers yet...</h2>}
         {(user_data.followers).map((item)=>(
            <ListItem alignItems="center" style={{backgroundColor:"#0892D0",borderRadius:'0.6em',marginBottom:'0.8em'}}>
              <ListItemAvatar>
                <Avatar {...stringAvatar(item.name)} src={item.imgurl} />
              </ListItemAvatar>
              <ListItemText
                primary={<Link to={`userDetail/${item.email}`}><b style={{color:"#F8F8FF"}}>{item.name}{item.verified && <VerifiedIcon id="post_headerSpecial" />}</b></Link>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'block',color:'#F5F5DC' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.username}<br/>
                      <strong style={{color:'#FFE4E1'}}>{`Followers: `}</strong> {item.followers>0?item.followers:0}<br/> 
                      <strong style={{color:'#FFE4E1'}}>{`Following: `}</strong> {item.following>0?item.following:0}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
              {!item.block && <Button variant="contained" style={{float:'right',marginRight:'-4em'}} onClick={handleOpen}>Block</Button>}
              {item.block && <Button variant="contained" style={{float:'right',marginRight:'-4em'}} onClick={handleOpen}>Unblock</Button>}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
                  {item.block==false?"Block":"Unblock"} To User<hr/>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to <b>{item.block==false?"Block":"Unblock"}</b> this user?
                  </Typography>
                  <Button variant="contained" color="inherit" style={{marginTop:'2em'}} onClick={handleClose}>Dismiss</Button>
                  <Button variant="contained" color="error"  id={item.block==true?`true*${item.email}`:`false*${item.email}`} style={{marginTop:'2em',float:'right'}} onClick={block}>Yes</Button>
                </Box>
              </Modal>
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
            </List>}

          {/* Following Section */}
          {bfollowing && <List sx={{marginLeft:'auto',marginRight:'auto', width: '80%', borderRadius:'1em' ,backgroundColor:"#163057",padding:"0em 0.8em 0.8em 0.8em" }}>
            <h1 style={{textAlign:'center',marginTop:'0em',color:"whitesmoke"}}>Folllowing</h1>
            <hr style={{color:'white'}} />
            {user_data.following.length==0 && <h2 style={{textAlign:'center',color:'#FAF0E6'}}>You haven't followed anyone...</h2>}
            {(user_data.following).map((item)=>(
                <ListItem alignItems="center" style={{backgroundColor:"#0892D0",borderRadius:'0.6em',marginBottom:'0.8em'}}>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(item.name)} src={item.imgurl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Link to={`userDetail/${item.email}`}><b style={{color:"#F8F8FF"}}>{item.name}{item.verified && <VerifiedIcon id="post_headerSpecial" />}</b></Link>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' ,color:'#F5F5DC'}}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.username}<br/>
                          <strong style={{color:'#FFE4E1'}}>{`Followers: `}</strong> {item.followers>0?item.followers:0}<br/> 
                          <strong style={{color:'#FFE4E1'}}>{`Following: `}</strong> {item.following>0?item.following:0}
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
              <h1 style={{textAlign:'center',marginTop:'0em',color:"whitesmoke"}}>All Posts</h1>
              <hr style={{color:'white'}} />
              {user_data.posts.length==0 && <h2 style={{textAlign:'center',color:'#FAF0E6'}}>No posts...</h2>}
              {(user_data.posts).map((item)=>(
                  <Paper sx={{ padding: "2em",marginBottom:'1em'}} style={{backgroundColor:'#0892D0',borderRadius:'0.4em'}} elevation={2}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid justifyContent="left" item xs={12} zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left",color:"#F8F8FF" }}>{item.name}<span id="post_badge" style={{color:'#F5F5DC'}}>&ensp;&ensp;&ensp;{item.date.slice(0,10)}</span></h4>
                        {/* <p style={{ textAlign: "left", color: "white",marginTop:'0px' }}>
                          {(item.time).slice(0,10)}
                        </p> */}
                        <pre style={{ border: 'initial',whiteSpace:'pre-wrap',padding: 'initial',color:'#FDF5E6',fontFamily:'sans-serif',fontSize:'inherit' }}>
                          {item.text}
                        </pre>
                        <Grid style={{display:'flex',alignItems: 'flex-start',columnGap:'1em'}}>
                        {item.post_data==""?"":<img sm={5} style={{marginTop:'1em',height:'22em',maxWidth:'60%'}} src={item.post_data} />}
                        {item.post_url==""?"":<img sm={5} style={{marginTop:'1em',height:'22em',maxWidth:'60%'}} src={item.post_url} />}
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
              <h1 style={{textAlign:'center',marginTop:'0em',color:"whitesmoke"}}>Comments</h1>
              <hr style={{color:'white'}} />
              {user_data.comments.length==0 && <h2 style={{textAlign:'center',color:'#FAF0E6'}}>Haven't commented on anyone...</h2>}
              {(user_data.comments).map((item,index)=>(
                  <Paper key={index} sx={{ padding: "2em",marginBottom:'1em'}} style={{backgroundColor:'#0892D0',borderRadius:'0.4em'}} elevation={2}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar {...stringAvatar(item.name)} src={item.imgurl} />
                      </Grid>
                      <Grid justifyContent="left" item xs={12} zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left",color:"#F8F8FF"}}>{item.name}<span id="post_badge" style={{color:'#F5F5DC'}}>&ensp;&ensp;&ensp;@{item.username}{" "}{item.verified && <VerifiedIcon id="post_headerSpecial" />}</span></h4>
                        <p style={{ textAlign: "left", color: "#FFDEAD",marginTop:'0px' }}>
                          {(item.time).slice(0,10)}
                        </p>
                        {item.text!="" && <pre style={{ textAlign: "left",color:'#FFFFF0',fontFamily:'sans-serif',fontSize:'1em',whiteSpace:'pre-wrap'}}>
                          {item.text}
                        </pre>}
                        {item.post_data!="" && <img alt={item.post_data} src={item.post_data} />}
                        {item.post_url!="" && <img alt={item.post_url} src={item.post_url} />}
                        <Grid justifyContent="left" item xs={12} zeroMinWidth>
                          <h4>Me:</h4>
                          <pre style={{fontFamily:'sans-serif', fontSize:'1em',whiteSpace:'pre-wrap',marginLeft:'1em',marginTop:'-0.4em',color:'#FFE4E1'}}>{item.my_comment}</pre>
                      </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
              ))}
            </div>}

            {/* Update Profile */ }
            {update && <div className="comments">
            <h1 style={{textAlign:'center',marginTop:'0em',color:'whitesmoke'}}>Update Profile</h1>
                  <Box component="form" noValidate onSubmit={submitForm}  sx={{ mt: 3,height:'80%', marginLeft:'10%',marginRight:'10%',borderRadius:'1em',backgroundColor:'#F0FFFF'}}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <CreateIcon style={{color:'white'}} />
                    }
                    component="label"
                    style={{marginLeft:'40%',cursor:"pointer"}}
                  >
                  {user_data.name!="" && <Avatar {...stringAvatar(user_data.name)} src={user_data.imgurl} style={{marginTop:"10%",width:'7em',height:'7em',opacity:'0.7'}} />}
                  <input
                    type="file"
                    onChange={(e) => upload(e)}
                    hidden
                  />
                  </Badge>

                  <h4 style={{color:"revert",textAlign:'center'}}>{photo_upload}</h4>
                    <Grid container spacing={2}>
                      <Grid item xs={8} style={{marginLeft:'auto',marginRight:'auto'}}>
                        <TextField
                          autoComplete="name"
                          name="name"
                          required
                          fullWidth
                          id="name"
                          placeholder={user_data.name}
                          label="Name"
                          onChange={errorRemove}
                          autoFocus
                          helperText={name_err}
                        />
                      </Grid>

                      <Grid item xs={8} id='email_grid' style={{marginLeft:'auto',marginRight:'auto'}}>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          placeholder={user_data.username}
                          onChange={errorRemove}
                          autoComplete="username"
                          helperText={user_err}
                        />
                      </Grid>

                    </Grid>
                    <Button
                      type="submit"
                      id="update_but"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{width:"60%",marginLeft:'20%',marginBottom:"40%"}}
                    >
                      Update Profile
                    </Button>

                    {/* Updating aaa*/}
                    <LoadingButton
                      loading="true"
                      className="hide_grid"
                      id="updating_but"
                      fullWidth
                      loadingPosition="end"
                      endIcon={<SaveIcon />}
                      sx={{ mt: 3, mb: 2,bgcolor:'#bd00fc' }}
                      style={{width:"60%",marginLeft:'20%',marginBottom:"40%"}}
                      variant="contained"
                    >
                      Updating...
                    </LoadingButton>
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