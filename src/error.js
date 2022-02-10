import react from 'react'

function blank(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'2px'}}>Provide Email Address</h3>
    );
}
function wrong(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'2px'}}>Incorrect Format</h3>
    );
}
function check(){
    return(
    <h3 style={{color:'red',marginTop:'0px',marginBottom:'2px'}}>Incorrect Email Address</h3>
    );
}
function success(){
    return(
    <h3 style={{color:'green',marginTop:'0px',marginBottom:'2px'}}>Correct Email Address</h3>
    );
}

export {blank,wrong,check,success};