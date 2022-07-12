import * as React from 'react';
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import $ from 'jquery';
import './Sign_in.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import Backdrop from '@mui/material/Backdrop';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Axios from 'axios'
import validator from 'validator'
import {firname,lasname,blank,otpBlank,passblank,notMatch,otpCheck,detail_wrong,notStrong,strong,muchStrong,wrong,check,error_occur,already,verify,verifyOtp,success} from "./error";
import {useSelector,useDispatch} from "react-redux"
import {setNull,setTokenNumber,setTokenNumber1} from "./actions/index";
import Navbar from './More_Detail/more_detail/components/shared/Navbar'

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const myState=useSelector((state)=>state.changeToken)
  const myState1=useSelector((state)=>state.changeToken1)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [msg,setMsg]=React.useState("")
  const [loginmsg,setLoginmsg]=React.useState("")
  const [passmsg,setPassmsg]=React.useState("")
    const handleOpen = () => {
        setOpen(true);
        setMsg("")
    };
    const handleClose = () => {
        setOpen(false);
        setMsg("")
    };

    //Show Password
    const [showPassword,setShowPassword]=React.useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    //Sign in
    const handleSubmit=(e)=>{
      setPassmsg("")
      if(($('#email').val())=="")
        setLoginmsg(blank())
      else if(isEmail($('#email').val())==false){
        setLoginmsg(wrong())
      }
      else if(($('#password').val())=="")
        setPassmsg(passblank())
      else{
        $('#signin').addClass('loading');
        $('#signing').removeClass('loading');
        Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/user_signin",{email:($('#email').val()),pass:($('#password').val())})
        .then((response)=>{
          if(response.data.msg=='success'){
            localStorage.setItem('token',(response.data.token));
            localStorage.setItem('token1',(response.data.token1));
            dispatch(setTokenNumber(response.data.token))
            dispatch(setTokenNumber1(response.data.token1))
          }
          else if(response.data.msg=='wrong'){
            $('#signin').removeClass('loading');
            $('#signing').addClass('loading');
            setPassmsg(detail_wrong())
          }
          else{
            $('#signin').removeClass('loading');
            $('#signing').addClass('loading');
            setPassmsg(error_occur())
          }
        })
        .catch((err)=>{
          $('#signin').removeClass('loading');
          $('signing').addClass('loading');
          setPassmsg(error_occur())
        })
      }
    }
    //Email Validator
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
    //Password Validator
    const [pass_verified,setPass_verified]=React.useState(false)
    const validate = (value) => {
      if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        setMsg(strong())
        setPassmsg(strong())
        setPass_verified(true)
      } else {
        setMsg(notStrong())
        setPassmsg(notStrong())
        setPass_verified(false)
      }
    }

    // Forgot Password OTP Check
    const sendOtp = (event) => {
      event.preventDefault();
      if(($('#verificationOtp').val())===""){
        setMsg(otpBlank())
      }
      else{
        $('#otpButton').addClass('loading');
        $('#loadingButton').removeClass('loading');
        Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/otp_verification",{email:$('#verifyEmail').val(),otp:$('#verificationOtp').val()})
        .then((response)=>{
            if (response.data.msg === 'success'){
              $('#loadingButton').addClass('loading');
              $('#newSubmit').removeClass("loading");
              $('#title1st').addClass('loading');
              $('#title2nd').removeClass("loading");
              $('#text1st').addClass('loading');
              $('#text2nd').removeClass("loading");
              setMsg("")
          }else if(response.data.msg === 'fail'){
            $('#otpButton').removeClass('loading');
            $('#loadingButton').addClass('loading');
            setMsg(otpCheck())
          }
        })
        .catch((err)=>{
          $('#otpButton').removeClass('loading');
          $('#loadingButton').addClass('loading');
          setMsg(error_occur())
        })
      }
    };

    //Forgot Password Email Check
    const sendEmail=(event)=>{
      event.preventDefault();
      if(($('#verifyEmail').val())==""){
        setMsg(blank())
      }
      else if(isEmail($('#verifyEmail').val())===false){
        setMsg(wrong())
      }
      else{
        $('#sendButton').addClass('loading');
        $('#loadingButton').removeClass('loading');
      Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/forgot_password_email",{tomail:$('#verifyEmail').val()})
      .then((response)=>{
        if (response.data.msg === 'success'){
            $('#email1st').addClass("hideit");
            $('#otp1st').removeClass("loading");
            $('#loadingButton').addClass('loading');
            $('#otpButton').removeClass("loading");
            setMsg("")
        }else if(response.data.msg === 'fail'){
          $('#sendButton').removeClass('loading');
          $('#loadingButton').addClass('loading');
          setMsg(check())
        }
      })
      .catch((err)=>{
        setMsg(error_occur())
        $('#sendButton').removeClass('loading');
        $('#loadingButton').addClass('loading');
      })
      }
    }

    const [match,setMatch]=React.useState("");
    const submitNew=(e)=>{
      e.preventDefault();
      if(pass_verified==false){
        setMsg(notStrong())
      }
      else if(($('#new1').val())!=($('#new2').val())){
        setMatch(notMatch())
      }
      else{
        Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/password_change",{tomail:$('#verifyEmail').val(),newpass:$('#new1').val()})
        .then((response)=>{
          if (response.data.msg === 'success'){
            alert("Password Change Successfully")
            setOpen(false);
          }else if(response.data.msg === 'fail'){
            setMatch(error_occur())
          }
        })
        .catch((err)=>{
          setMatch(error_occur())
        })
      }
    }
    const free=(value)=>{
      if(value!=""){
      setMsg("")
      setMatch("")
      setLoginmsg("")
      setPassmsg("")
      }
    }
  if(myState!=null && myState1!=null){
    return <Redirect to="/" />
  }
  else{
  return (
    <ThemeProvider theme={theme}>
      <Navbar data="User Sign-in" />
      <Container component="main" style={{width:'40em'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:'2em',
            borderStyle:'ridge',
            borderRadius:'1em',
            boxShadow:'1em 1em 3em grey',
            backgroundColor:'#F5F5F5'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>free(e)}
              helperText={loginmsg}
            />
            <FormControl sx={{ mt: 1}} fullWidth variant="outlined">
              <InputLabel color="secondary">Enter Password</InputLabel>
              <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => free(e)}
              id="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Enter Password"
              />
              <p style={{margin:'0.6em 0 0 0.6em',fontSize:'0.8em'}}>{passmsg}</p>
            </FormControl>

            <Button
              fullWidth
              onClick={handleSubmit}
              id="signin"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <LoadingButton
                className="loading"
                id='signing'
                loading
                fullWidth
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                >
                Signing in
            </LoadingButton>
            <Grid container>
              <Grid item xs={5}>
                <Button onClick={handleOpen} style={{fontSize:'0.78em'}}>
                  Forgot password?
                </Button>
              </Grid>
              <Grid item xs={7}>
                <Button>
                <Link to="/signup" style={{textDecoration:"none",fontSize:'0.82em'}}>
                {/* <Linked variant="body2"> */}
                  {"Don't have an account? Sign Up"}
                {/* </Linked> */}
                </Link>
                </Button>
              </Grid>
            </Grid>
            <Link to="/" style={{textDecoration:"none"}}>
            <Button fullWidth sx={{ mt: 2, mb: 5 }} variant="text">Home Page</Button>
            </Link>
          </Box>
        </Box>
      </Container>
      <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 1000,
          }}
      >
          <Grid item id="title1st" style={{marginBottom:"-2em"}}>
          <DialogTitle id="alert-dialog-title" style={{fontSize:'1.5em', fontWeight:600}}>
           Forgot Password ?
          <hr/>
          </DialogTitle>
          </Grid>
          <Grid item id="title2nd" className='loading' style={{marginBottom:"-2em"}}>
          <DialogTitle id="alert-dialog-title" style={{fontSize:'1.5em', fontWeight:600}}>
           Set Password
          <hr/>
          </DialogTitle>
          </Grid>
          <DialogContent>
          <Grid item id="text1st">
          <DialogContentText id="alert-dialog-description" style={{color:'#451452',fontSize:'1em'}}>
              If you forgot your password, Don't worry.We will help you.<br/>
              Enter your <b>Email</b>, We will send a OTP to change the Password.
              <Grid item id="email1st"><TextField id="outlined-basic" id="verifyEmail" autoFocus label="Email Address" onChange={(e) => free(e.target.value)} variant="outlined" size="small" style={{marginTop:'1em',width:'50%'}} helperText={msg} /></Grid>
              <Grid item id="otp1st" className='loading'><TextField id="outlined-basic" id="verificationOtp" autoFocus label="Enter OTP" onChange={(e) => free(e.target.value)} variant="outlined" size="small" style={{marginTop:'1em',width:'50%'}} helperText={msg} /></Grid>
          </DialogContentText>
          </Grid>
          <Grid item id="text2nd" className='loading'>
          <DialogContentText id="alert-dialog-description text2nd" style={{color:'#451452',fontSize:'1em'}}>
              Password Muxt be 8 characters contained, at least 1 numeric, 1 uppercase letter, 1 smallcase letter, 1 special letter<br/>
              <b>Set Your New Password...</b><br/>
              <TextField id="outlined-basic" id="new1" autoFocus label="Enter New Password" onChange={(e) => free(e.target.value)} type="password" onChange={(e) => validate(e.target.value)} variant="outlined" size="small" style={{marginTop:'0.5em',marginBottom:'0.5em',width:'50%'}} helperText={msg} /><br/>
              <b>Verify Your Password</b><br/>
              <TextField id="outlined-basic" id="new2" label="Verify Password" onChange={(e) => free(e.target.value)} type="password" variant="outlined" size="small" style={{marginTop:'0.5em',width:'50%'}} helperText={match} />
          </DialogContentText>
          </Grid>
          </DialogContent>
          <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Dismiss</Button>
          <Button variant="contained" id='sendButton' onClick={sendEmail}>Send</Button>
          <Button variant="contained" id='otpButton' className="loading" onClick={sendOtp}>Verify</Button>
          <Button variant="contained" id='newSubmit' className="loading" onClick={submitNew}>Submit</Button>
          <LoadingButton
              className="loading"
              id='loadingButton'
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              >
              Verifying
          </LoadingButton>
          </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
  }
}