import react from 'react'

function blank(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'1px'}}>Provide Email Address</h3>
    );
}
function otpBlank(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'1px'}}>Enter OTP</h3>
    );
}
function otpCheck(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'1px'}}>Wrong OTP!! Please Try Again...</h3>
    );
}
function notStrong(){
    return(
    <h3 style={{color:'#ff5500',marginTop:'0px',marginBottom:'1px'}}>Not Enough Good...</h3>
    );
}function firname(){
    return(
    <h3 style={{color:'#db4112',marginTop:'0px',marginBottom:'1px'}}>Enter First Name</h3>
    );
}
function lasname(){
    return(
    <h3 style={{color:'#db4112',marginTop:'0px',marginBottom:'1px'}}>Enter Last Name</h3>
    );
}
function strong(){
    return(
    <h3 style={{color:'#11ad31',marginTop:'0px',marginBottom:'1px'}}>Perfect Password!!</h3>
    );
}
function muchStrong(){
    return(
    <h3 style={{color:'#db4112',marginTop:'0px',marginBottom:'1px'}}>Strong Your Password...</h3>
    );
}
function wrong(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'1px'}}>Incorrect Format</h3>
    );
}
function check(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'1px'}}>Incorrect Email Address</h3>
    );
}
function success(){
    return(
    <h3 style={{color:'green',marginTop:'0px',marginBottom:'1px'}}>Correct Email Address</h3>
    );
}

export {firname,lasname,blank,otpBlank,otpCheck,notStrong,strong,muchStrong,wrong,check,success};