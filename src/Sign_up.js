import * as React from 'react';
import { useState, useEffect } from 'react';
import $ from 'jquery'; 
import "./signup.css"
import Axios from 'axios'
import {Link,Redirect} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Linked from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {firname,lasname,blank,otpBlank,otpCheck,notStrong,strong,muchStrong,wrong,check,error_occur,already,verify,verifyOtp,success} from "./error";
import emailjs from 'emailjs-com'
import validator from 'validator'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useSelector,useDispatch} from "react-redux"
import {setNull,setTokenNumber,setTokenNumber1} from "./actions/index";
import changeToken from './reducers/setToken';
import changeToken1 from './reducers/setToken1';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Linked color="inherit" href="https://material-ui.com/">
        Your Website
      </Linked>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const myState=useSelector((state)=>state.changeToken)
  const myState1=useSelector((state)=>state.changeToken1)
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  
  //Password Checking
  const validate = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage(strong())
      setPass_verified(true)
    } else {
      setErrorMessage(notStrong())
      setPass_verified(false)
    }
  }

  //Photo Upload
  function upload(value){
    // console.log(value.target.files[0].size)
    if(((value.target.files[0].type)=="image/png" || (value.target.files[0].type)=="image/jpeg") && (value.target.files[0].size)>0){
      setPhoto_upload(value.target.files[0].name)
      setColor("success")
      setVariant("contained");
    }
    else{
      value=undefined
      setPhoto_upload("Only Photo Allowed")
      setVariant("outlined");
      setColor("error");
    }
  }

  function checking(value){
    if(value!=""){
      setEmail_error("")
      setOtp_error("")
    }
  }
  function fname_check(value){
    if(value!=""){
      setFname("")
    }
  }
  function lname_check(value){
    if(value!=""){
      setLname("")
    }
  }

  //Show Password
  const [showPassword,setShowPassword]=React.useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

  //ALL USE STATE
  const [registered,setRegistered]=useState(false)
  const [fname, setFname] = useState('')
  const [variant, setVariant] = useState('contained')
  const [color, setColor] = useState('primary')
  const [lname, setLname] = useState('')
  const [email_lable,setEmail_lable]=useState("Email Address")
  const [errorMessage, setErrorMessage] = useState('')
  const [email_verified,setEmail_verified]=useState(false)
  const [pass_verified,setPass_verified]=useState(false)
  const [photo_upload,setPhoto_upload]=useState("Upload Photo")
  const [email_error,setEmail_error]=useState("")
  const [otp_error,setOtp_error]=useState("")

  //OTP Verififcation
  const otpVarification = (event) => {
    event.preventDefault();
    if(($('#otp').val())===""){
      setOtp_error(otpBlank())
    }
    else{
      $('#check_grid').addClass("hide_grid");
      $('#verifying').removeClass("hide_grid");
      Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/otp_verification",{email:$('#email').val(),otp:$('#otp').val()})
      .then((response)=>{
          if (response.data.msg === 'success'){
            setEmail_verified(true);
            $('#verifying').addClass("hide_grid");
            $('#verifed').removeClass("hide_grid");
            setOtp_error(success())
        }else if(response.data.msg === 'fail'){
          $('#check_grid').removeClass("hide_grid");
          $('#verifying').addClass("hide_grid");
          setOtp_error(otpCheck())
        }
      })
      .catch((err)=>{
        $('#check_grid').removeClass("hide_grid");
          $('#verifying').addClass("hide_grid");
          setOtp_error(error_occur())
      })
    }
  };

  //Email Verififcation
  const emailVarification = (event) => {
    event.preventDefault();
    if(($('#email').val())===""){
      setEmail_error(blank())
    }
    else if(isEmail($('#email').val())===false){
      setEmail_error(wrong())
    }
    else{
      $('#verify_grid').addClass("hide_grid");
      $('#verifying').removeClass("hide_grid");
      Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/email_verification",{tomail:$('#email').val()})
      .then((response)=>{
        if(response.data.msg === 'found'){
          $('#verify_grid').removeClass("hide_grid");
          $('#verifying').addClass("hide_grid");
          setEmail_error(already())
        }
        else if (response.data.msg === 'success'){
            $('#email_grid').addClass("hide_grid");
            $('#verifying').addClass("hide_grid");
            $('#otp_grid').removeClass("hide_grid");
            $('#check_grid').removeClass("hide_grid");
        }else if(response.data.msg === 'fail'){
          $('#verify_grid').removeClass("hide_grid");
          $('#verifying').addClass("hide_grid");
          setEmail_error(check())
        }
      })
      .catch((err)=>{
        setEmail_error(error_occur())
        $('#verify_grid').removeClass("hide_grid");
        $('#verifying').addClass("hide_grid");
      })
    }
  };
  
  // Form Submission
  const submitForm = (event) => {
    event.preventDefault();
    // console.log(event.target[14].files[0])
    if($('#firstName').val()==""){
      console.log("hello")
      setFname(firname());
    }
    else if($('#lastName').val()==""){
      setLname(lasname());
    }
    else if(email_verified==false){
      setEmail_error(verify())
      setOtp_error(verifyOtp())
    }
    else if(pass_verified==false){
      setErrorMessage(muchStrong())
    }
    else{
      $('#signingUp').removeClass("hide_grid");
      $('#signUp').addClass("hide_grid");
      if((event.target[14].files[0]!=undefined) && ((event.target[14].files[0].type)=="image/jpeg" || (event.target[14].files[0].type)=="image/png") && (event.target[14].files[0].size)>0){
      const formData = new FormData()
       formData.append('file', event.target[14].files[0])
       formData.append('upload_preset','postimage' )
       Axios.post("https://api.cloudinary.com/v1_1/vaibhav183vibhu/image/upload",formData)
       .then(async function (response){
        Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/user_signup",{fname:$('#firstName').val(),lname:$('#lastName').val(),email:$('#email').val(),pass:$('#password').val(),img:response.data.secure_url})
        .then((response)=>{
          if (response.data.msg === 'success'){
            localStorage.setItem('token',(response.data.token));
            localStorage.setItem('token1',(response.data.token1));
            dispatch(setTokenNumber(response.data.token))
            dispatch(setTokenNumber1(response.data.token1))
            setRegistered(true);
          }else if(response.data.msg === 'fail'){
            alert("Some Error Occured")
            $('#signingUp').addClass("hide_grid");
            $('#signUp').removeClass("hide_grid");
          }
        })
        .catch((error)=>{
          alert("Ooh!! something went wrong")
          $('#signingUp').addClass("hide_grid");
          $('#signUp').removeClass("hide_grid");
        })
       })
       .catch((error)=>{
         alert("Ooh!! something went wrong")
         $('#signingUp').addClass("hide_grid");
         $('#signUp').removeClass("hide_grid");
       })
      }
      else{
        Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/user_signup",{fname:$('#firstName').val(),lname:$('#lastName').val(),email:$('#email').val(),pass:$('#password').val(),img:""})
        .then((response)=>{
          if (response.data.msg === 'success'){
            dispatch(setTokenNumber(response.data.token))
            dispatch(setTokenNumber1(response.data.token1))
            localStorage.setItem('token',(response.data.token));
            localStorage.setItem('token1',(response.data.token1));
            setRegistered(true);
          }else if(response.data.msg === 'fail'){
            alert("Some Error Occured")
            $('#signingUp').addClass("hide_grid");
            $('#signUp').removeClass("hide_grid");
          }
        })
        .catch((error)=>{
          alert("Ooh!! Something went wrong")
          $('#signingUp').addClass("hide_grid");
          $('#signUp').removeClass("hide_grid");
        })
      }
    }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  if(myState!=null && myState1!=null){
    return <Redirect to="/" />
  }
  else{
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="fName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => fname_check(e.target.value)}
                  autoFocus
                  helperText={fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lName"
                  autoComplete="lname"
                  onChange={(e) => lname_check(e.target.value)}
                  helperText={lname}
                />
              </Grid>


              {/* Email Details */}
              <Grid item xs={9} id='email_grid'>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={email_lable}
                  name="email"
                  onChange={(e) => checking(e.target.value)}
                  autoComplete="email"
                  helperText={email_error}
                />
              </Grid>
              <Grid item xs={3} id="verify_grid">
                <Button
                fullWidth
                variant="contained"
                onClick={emailVarification}
                style={{height:'3em',marginTop:'7%'}}
                > Verify
                </Button>
              </Grid>


              {/* Verify Button */}
              <Grid item xs={3} className="hide_grid" id="verifying">
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  style={{height:'3em',marginTop:'7%'}}
                  variant="outlined"
                >
                  Verifying
                </LoadingButton>
              </Grid>


              {/* Otp Verififcation */}
              <Grid item xs={6} className="hide_grid" id="otp_grid">
                <TextField
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  onChange={(e) => checking(e.target.value)}
                  name="otp"
                  autoComplete="OTP"
                  helperText={otp_error}
                />
              </Grid>
              <Grid item xs={4} className="hide_grid" id="check_grid">
                <Button
                fullWidth
                variant="contained"
                id='otp_bot'
                onClick={otpVarification}
                style={{height:'3em',marginTop:'6%'}}
                > Verify
                </Button>
              </Grid>


              {/* Otp Verified */}
              <Grid item xs={4} className="hide_grid" id="verifed">
              <Button variant="outlined" color="success" style={{height:'3em',marginTop:'6%'}} disabled>
                Verified
              </Button>
              </Grid>

              {/* Password */}
              <FormControl sx={{ mt: 2,ml:2 }} fullWidth variant="outlined">
                <InputLabel color="secondary">Enter Password</InputLabel>
                <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => validate(e.target.value)}
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
                <p style={{margin:'0.6em 0 0 0.6em',fontSize:'0.8em'}}>{errorMessage}</p>
              </FormControl>

              
              <Grid item xs={12}>
                <Button
                  variant={variant}
                  component="label"
                  endIcon={<PhotoCamera />}
                  color={color}
                >
                  {photo_upload}
                  <input
                    type="file"
                    onChange={(e) => upload(e)}
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
        </Box>
      </Container>
    </ThemeProvider>
  );
  }
}