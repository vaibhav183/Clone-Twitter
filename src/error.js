import react from 'react'

function blank(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Provide Email Address</span>
    );
}
function otpBlank(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Enter OTP</span>
    );
}
function otpCheck(){
    return(
    <span style={{color:'red',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Wrong OTP!! Please Try Again...</span>
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
function success(){
    return(
    <span style={{color:'green',marginTop:'0px',marginBottom:'1px',fontWeight:600,fontSize:"1.3em"}}>Email Verified</span>
    );
}

export {firname,lasname,blank,otpBlank,otpCheck,notStrong,strong,muchStrong,wrong,check,verify,verifyOtp,success};