import * as React from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery';
import './Sign_in.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Linked from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Axios from 'axios'
import validator from 'validator'
import {firname,lasname,blank,otpBlank,notMatch,otpCheck,notStrong,strong,muchStrong,wrong,check,error_occur,already,verify,verifyOtp,success} from "./error";

const theme = createTheme();

export default function SignIn() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [msg,setMsg]=React.useState("")
    const handleOpen = () => {
        setOpen(true);
        setMsg("")
    };
    const handleClose = () => {
        setOpen(false);
        setMsg("")
    };
    const handleSubmit=(e)=>{
      console.log(e)
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
        setPass_verified(true)
      } else {
        setMsg(notStrong())
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
        Axios.post("http://localhost:3001/otp_verification",{email:$('#verifyEmail').val(),otp:$('#verificationOtp').val()})
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
      Axios.post("http://localhost:3001/forgot_password_email",{tomail:$('#verifyEmail').val()})
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
        Axios.post("http://localhost:3001/password_change",{tomail:$('#verifyEmail').val(),newpass:$('#new1').val()})
        .then((response)=>{
          if (response.data.msg === 'success'){
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
      }
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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