import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import $ from 'jquery';
import "./Members.css"
import {useSelector,useDispatch} from "react-redux"
import List from '@mui/material/List';
import ResponsiveAppBar from './navbar'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar';
import SaveIcon from '@mui/icons-material/Save';
import VerifiedIcon from '@mui/icons-material/Verified';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import {filling,clear, setNull,follower_change,following_change} from "./actions/index";
import { LensTwoTone } from '@mui/icons-material';
export default function Twitter_member(){
    const myState = useSelector((state) => state.changeToken)
    const myState1 = useSelector((state) => state.changeToken1)
    const user_data = useSelector((state) => state.changeUserData)
    const dispatch = useDispatch()
    const [suggest,setSuggest]=useState(null)
    const [search,setSearch]=useState(true)
    const [arr,setArr]=useState([])

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
        console.log(err)
    })
    },[]);

    //Fetching total user
  useEffect(() => {
    Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/fetch_total_user",{email:myState1,token:myState})
    .then((response)=>{
        if(response.data.msg=='success'){
          setSuggest(response.data.values)
        }
        else{
            // dispatch(setNull())
            alert("Fetched Wrong Datails")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    },[user_data]);

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
    const followed=(e)=>{
      var len=e.target.id.split('@')[0].length
      var st=e.target.className.indexOf(e.target.id.split('@')[0])
      let chk=e.target.className.slice(st,st+len);
      $(`.${chk}`).addClass("hide_grid")
      $(`#${chk}${chk}${chk}`).removeClass("hide_grid")
      Axios.post('https://clone-twitter-by-vaibhav.herokuapp.com/follow_user',{email:user_data.email,user_email:(e.target.id)})
      .then((res)=>{
        if(res.data.msg=='success'){
          $(`#${chk}${chk}${chk}`).addClass("hide_grid")
          $(`#${chk}${chk}`).removeClass("hide_grid")
        }
        else{
          alert("Some Error Occured!! Please try again...");
          $(`.${chk}`).removeClass("hide_grid")
          $(`#${chk}${chk}${chk}`).addClass("hide_grid")
        }
      })
      .catch((err)=>{
        alert("Some Error Occured!! Please try again...");
        $(`.${chk}`).removeClass("hide_grid")
        $(`#${chk}${chk}${chk}`).addClass("hide_grid")
      })
    }
    if(myState==null || myState1==null){
        return <Redirect to="/" />
    }
    else{
    return ( 
        <List sx={{marginLeft:'auto',marginRight:'auto',width:"50%", bgcolor: 'background.paper' }}>
                    {user_data && <ResponsiveAppBar image={user_data.imgurl} name={user_data.name} />}
                     {suggest && user_data && (suggest).map((item)=>(
                        <ListItem alignItems="center" style={{backgroundImage:'linear-gradient(315deg, #FF8008 0%, #FFC837 74%)',borderRadius:'0.4em',marginBottom:'0.8em'}}>
                          <ListItemAvatar>
                            <Avatar {...stringAvatar(item.Name)} src={item.imgurl} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={<b>{item.Name}{item.verified && <VerifiedIcon id="post_headerSpecial" />}</b>}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'block' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item.username || "unknown"}<br/>
                                  <strong style={{color:'white'}}>{`Followers: `}</strong> {item.followers>0?item.followers:0}<br/> 
                                  <strong>{`Following: `}</strong> {item.following>0?item.following:0}
                                </Typography>
                                
                              </React.Fragment>
                            }
                          />
                          <Button variant="contained" style={{float:'right',marginRight:'-4em'}} className={item.Email.split('@')[0]} id={item.Email} onClick={followed}>Follow</Button>
                          <LoadingButton
                            endIcon={<SaveIcon />}
                            loadingPosition="end"
                            color="success"
                            loading="true"
                            variant="outlined"
                            className="hide_grid"
                            id={`${item.Email.split('@')[0]}${item.Email.split('@')[0]}${item.Email.split('@')[0]}`}
                          >
                            <b style={{color:"green"}}>Following</b>
                          </LoadingButton>
                          <Button variant="contained" className="hide_grid followed" id={`${item.Email.split('@')[0]}${item.Email.split('@')[0]}`}  color="success" endIcon={<CheckIcon />} disabled>
                            Followed
                          </Button>
                          <Divider variant="inset" component="li" />
                        </ListItem>
                      ))}
                      {!suggest && <CircularProgress style={{width:"4em",height:"4em",marginLeft:"40%"}} color="success" />}
                        </List>
    )
}
}