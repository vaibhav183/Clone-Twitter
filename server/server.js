const express = require('express');
const path = require('path')
const app=express();

let reqPath = path.join(__dirname, '../frontend_react/public/index.html');

app.get('/',(req,res)=>{
    res.sendFile(reqPath);
})


app.listen(3000,function(){
    console.log("server reached at 3000");
})