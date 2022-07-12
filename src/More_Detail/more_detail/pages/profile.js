import React, {useState, useEffect,useReducer } from "react";
import { useProfilePageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import ProfilePicture from "../components/shared/ProfilePicture";
import changeUserData from "../../../reducers/user_detail";
import {useSelector,useDispatch} from "react-redux"
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import {filling,clear, setNull} from "../../../actions/index";
import {
  Hidden,
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  Zoom,
  Divider,
  DialogTitle,
  Avatar
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { GearIcon } from "../icons";
import ProfileTabs from "../components/profile/ProfileTabs";
import LoadingScreen from "../components/shared/LoadingScreen";
import NotFound from "./not-found"
import axios from "axios";

function ProfilePage(props) {
  const classes = useProfilePageStyles();
  const [showOptionsMenu, setOptionsMenu] = React.useState(false);
  const myState=useSelector((state)=>state.changeToken)
  const myState1=useSelector((state)=>state.changeToken1)
  const user_data=useSelector((state)=>state.changeUserData)
  const [userdetail,setUserdetail]=useState(null)
  const [not_found,setNot_found]=useState(false)
  const [errorhandle,setErrorhandle]=useState("Fetching User Details....")
  const isOwner = false;

  function handleOptionsMenuClick() {
    setOptionsMenu(true);
  }

  function handleCloseMenu() {
    setOptionsMenu(false);
  }

  useEffect(()=>{
    axios.put(`https://clone-twitter-by-vaibhav.herokuapp.com/user_detail/${props.match.params.email}`)
    .then((res)=>{
      if(res.data.msg=="success"){
        setUserdetail(res.data.user)
        setNot_found(false)
        setErrorhandle("")
      }
      else{
        setErrorhandle("This user doesn't exist in our system.")
        setNot_found(true)
      }
    })
    .catch((err)=>{
      setErrorhandle("Can't able to fetch User details. Please try again later.")
      setNot_found(true)
    })
  },[props.match.params.email,user_data])

  if(userdetail==null && not_found==false) return (<LoadingScreen name="Loading..." />)
  if(not_found===true) return <NotFound />

  return (
    <Layout title="User Details">
      {userdetail && <div className={classes.container}>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} image={userdetail.profile_image} />
            <CardContent className={classes.cardContentLarge} style={{color:'white'}}>
              <ProfileNameSection
                user={userdetail}
                isOwner={isOwner}
                user_data={user_data}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
              <PostCountSection user={userdetail} />
              <NameBioSection user={userdetail} />
            </CardContent>
          </Card>
        {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
        {userdetail && <ProfileTabs user={userdetail} email={props.match.params.email} isOwner={isOwner} />}
      </div>}
    </Layout>
  );
}



function ProfileNameSection({ user, isOwner,user_data, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);
  const myState=useSelector((state)=>state.changeToken)
  const myState1=useSelector((state)=>state.changeToken1)
  const dispatch=useDispatch()

  const Refollow=()=>{
    setFollowButton(
      <LoadingButton
        endIcon={<SaveIcon />}
        loadingPosition="end"
        color="success"
        loading="true"
        variant="outlined"
      ></LoadingButton>
    )
    axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/follow_user",{email:user_data.email,user_email:user.email})
    .then((resp)=>{
      if(resp.data.msg=="success"){
        axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/fetching_data_user",{token:myState,token1:myState1})
        .then((response)=>{
            if(response.data.msg=='success'){
                ////////////// Fill the user_data with help of reducer/////////////
                dispatch(filling(response.data))  // Filling is action on user_details.js file values
                setStatus(!status)
                // setFollowButton(<Button variant="contained" color="primary" className={classes.button} onClick={Refollow} >Follow</Button>)
            }
            else{
                dispatch(setNull())
            }
        })
        .catch((err)=>{
          alert("Server Error! Try again later")
        })
      }
      else{
        alert("Current user not found")
      }
    })
    .catch((err)=>{
      alert("Server Error! Try again later")
    })
  }
  
  const [followButton, setFollowButton] = useState(<Button variant="contained" color="primary" onClick={Refollow} className={classes.button}>Follow</Button>)
  const dissable=(<Button variant="outlined" color="primary" dissabled className={classes.button}>Follow</Button>)
  const [status, setStatus] = useState(false)
  useEffect(()=>{
    (user_data.following).forEach(element => {
      if(element.email==user.email){
        setFollowButton(
          <Button
            onClick={() => setUnfollowDialog(true)}
            variant="outlined"
            className={classes.button}
          >
            Following
          </Button>
        )
      }
    });
  },[status])


  const handleUnfollowClick =()=>{
    axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/unfollow_user",{email:user_data.email,user_email:user.email})
    .then((resp)=>{
      if(resp.data.msg=="success"){
        axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/fetching_data_user",{token:myState,token1:myState1})
        .then((response)=>{
            if(response.data.msg=='success'){
                ////////////// Fill the user_data with help of reducer/////////////
                dispatch(filling(response.data))  // Filling is action on user_details.js file values
                setUnfollowDialog(false)
                setFollowButton(<Button variant="contained" color="primary" className={classes.button} onClick={Refollow} >Follow</Button>)
            }
            else{
                dispatch(setNull())
            }
        })
        .catch((err)=>{
          alert("Server Error! Try again later")
        })
      }
      else{
        alert("Current user not found")
      }
    })
    .catch((err)=>{
      alert("Server Error! Try again later")
    })
  }


  return (
    <>
        <section className={classes.usernameSection}>
          <Typography className={classes.username} style={{color:'#FFDEAD'}}>{user.username}</Typography>
          {isOwner ? (
            <>
              <Link to="/accounts/edit">
                <Button variant="outlined">Edit Profile</Button>
              </Link>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            </>
          ) : (
            <>{(myState && myState1) ?followButton:dissable}</>
          )}
        </section>
      {showUnfollowDialog && (
        <UnfollowDialog user={user} user_data={user_data} Unfollowed={handleUnfollowClick} onClose={() => setUnfollowDialog(false)} />
      )}
    </>
  );
}



function UnfollowDialog({ onClose, user,user_data,Unfollowed }) {
  const classes = useProfilePageStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper
      }}
      onClose
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.name}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography
        align="center"
        variant="body2"
        className={classes.unfollowDialogText}
      >
        Do you want to <b>Unfollow</b> {user.name}<br/>({user.username})
      </Typography>
      <Divider />
      <Button className={classes.unfollowButton} onClick={Unfollowed}>Unfollow</Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}



function PostCountSection({ user }) {
  const classes = useProfilePageStyles();
  const options = ["posts", "followers", "following"];

  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        {options.map(option => (
          <div key={option} className={classes.followingText}>
            <Typography className={classes.followingCount}>
              {user[option].length}
            </Typography>
            <Hidden xsDown>
              <Typography>{option}</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography color="textSecondary">{option}</Typography>
            </Hidden>
          </div>
        ))}
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}

function NameBioSection({ user }) {
  const classes = useProfilePageStyles();

  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.name}</Typography>
      <Typography style={{color:'#F5F5DC'}}>{user.bio}</Typography>
      <a href={user.website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>
          {user.website}
        </Typography>
      </a>
    </section>
  );
}

function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const [showLogOutMessage, setLogOutMessage] = React.useState(false);

  function handleLogOutClick() {
    setLogOutMessage(true);
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper
      }}
      TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to log back in to continue using Twitter.
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogOutClick} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: "12px 8px" }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}

export default ProfilePage;
