import react from 'react'

function blank(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Enter Email Address</span>
    );
}
function passblank(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Enter Password</span>
    );
}
function otpBlank(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Enter OTP</span>
    );
}
function otpCheck(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Wrong OTP!! Please Try Again</span>
    );
}
function notStrong(){
    return(
    <span style={{color:'#ff5500',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Not Enough Good...</span>
    );
}function firname(){
    return(
    <span style={{color:'#db4112',marginTop:'0px',marginBottom:'0px',fontWeight:600,fontSize:"1.3em"}}>Enter First Name</span>
    );
}
function lasname(){
    return(
    <span style={{color:'#db4112',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Enter Last Name</span>
    );
}
function strong(){
    return(
    <span style={{color:'#11ad31',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Perfect Password!!</span>
    );
}
function muchStrong(){
    return(
    <span style={{color:'#db4112',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Strong Your Password...</span>
    );
}
function notMatch(){
    return(
    <span style={{color:'#db4112',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Password didn't match...</span>
    );
}
function wrong(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Incorrect Format</span>
    );
}
function check(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Incorrect Email Address</span>
    );
}
function error_occur(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Some Error Occured! Try Again</span>
    );
}
function user_error(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>This username already exist...</span>
    );
}
function name_error(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Enter a name</span>
    );
}
function already(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Email Already Exist!!</span>
    );
}
function verify(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Verify Your Email Address</span>
    );
}
function verifyOtp(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Verify Your OTP</span>
    );
}
function detail_wrong(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Wrong Details! Try Again...</span>
    );
}
function success(){
    return(
    <span style={{color:'green',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Email Verified</span>
    );
}

export {firname,lasname,blank,otpBlank,passblank,name_error,detail_wrong,user_error,notMatch,otpCheck,notStrong,strong,muchStrong,wrong,check,error_occur,already,verify,verifyOtp,success};