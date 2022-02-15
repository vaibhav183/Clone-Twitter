require('dotenv').config();
const fs = require('fs')
const express = require('express');
const app = express();
const bcrypt = require("bcrypt")
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // file upload
app.use(fileUpload());
const cors = require('cors') // It is used to connection between two servers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("Public"))
app.use(bodyParser.json())
var nodemailer = require('nodemailer');
const path = require('path')
    /*app.use('/fetch1', express.static(path.join(__dirname, '/Public')));*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(cors());
const url = "mongodb+srv://vaibhav183:Jobportal$9999@cluster0.zksak.mongodb.net/twitter_clone";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
var Posts;
var post_schema;
db.on('error', console.error.bind(
    console, "Connection Error"
));
db.once('open', function() {
    console.log("database connected");
    post_schema = new mongoose.Schema({
        name: String,
        username: String,
        email: String,
        post_data: String,
        post_url: String,
        verified: Boolean,
        text: String,
        date:Date
    })
    Posts = mongoose.model('posts', post_schema);
})

const User_Data = new mongoose.Schema({
    Name: String,
    Email: String,
    username:String,
    Password: String,
    image:String,
    verified:Boolean,
    followers:[Object],
    following:[Object],
    posts:[Object],
    comments:[Object],
    token:String
});
const User = mongoose.model('User', User_Data);

const Otp_data = new mongoose.Schema({
    email:String,
    otp: Number
});
const Otp = mongoose.model('Otp', Otp_data);

app.get("/", function(req, res) {
    // res.send("Hello")\
    res.sendFile(__dirname + "/index.html")
})
let date = new Date()
app.get('/fetch', (req, res) => {
        console.log("fetched from database")
        Posts.find({}, function(err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result);
            }
        })
    })
    // file upload
    /*var uploadPath;
     var sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else{
    console.log(req.files)
    sampleFile = req.files.myFile   // myfile is name of same data which is send by formData
    uploadPath=__dirname + '/Public/' + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) { //mv for move to 'Public' folder
        if (err){
           console.log(date.getMilliseconds())
        }else{
           console.log(date.getMilliseconds())
        }
      });
      }*/
var array_object;
app.post('/fetching_data_user',(req,res)=>{
    User.findOne({token:req.body.token},(err,result)=>{
        if(err){
            res.json({
                msg: 'fail'
            });
        }
        else{
            Otp.deleteMany((err)=>{
                if(result==null){
                    res.json({
                        msg:'fail'
                    });
                }
                else{
                    bcrypt.compare(result.Email,req.body.token1,(err,decrypt)=>{
                        if(decrypt==false){
                            res.json({
                                msg:'fail'
                            });
                        }
                        else{
                            Posts.find({email:result.Email},(err,items)=>{
                                if(err){
                                    array_object=[]
                                }
                                else{
                                    array_object=items
                                }
                                res.json({
                                    msg:'success',
                                    name:result.Name,
                                    username:result.username,
                                    email:result.Email,
                                    verified:result.verified,
                                    imgurl:result.image,
                                    followers:result.followers,
                                    following:result.following,
                                    posts:array_object,
                                    comments:result.comments
                                });
                            })
                        }
                    })
                }
            })
        }
    })
})

app.post('/insert', (req, res) => {
    console.log("insert data................................")

    // data upload into database
    const post1 = new Posts({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        post_data: req.body.post_data,
        post_url: req.body.post_url,
        verified: req.body.verified,
        text: req.body.text
    })
    post1.save(function(err){
        if (err) {
            res.send(err)
        } else {
            res.send("success")
        }
    })
})

app.post('/email_verification',(req,res)=>{
    var rand=Array.from(Array(6), () => Math.floor(Math.random() * 9)).join('');
    var message=`You tried to log in our portal.Here is the six-digit OTP to continue ${rand} . Use this OTP for Email Verification`
    const frommail='hiteshkyq23@gmail.com'
      const password = 'Hitesh@234'
      const tomail=req.body.tomail
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: frommail,
          pass: password
        }
      });
      var mailOptions = {
        from: frommail,
        to: tomail,
        subject: 'Verification Email',
        text: message
      };
      User.findOne({Email:tomail},(err,item)=>{
        if(err){
            console.log("error")
        }
        else{
            if(item==null){
                transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          res.json({
                            msg: 'fail'
                          });
                        }
                        else{
                          const data = new Otp({
                                  email: tomail,
                                  otp:rand
                          });
                          data.save();
                          res.json({
                            msg: 'success'
                          })
                        }
                });
            }
            else{
                res.json({
                    msg: 'found'
                });
            }
        }
      })
})

app.post('/forgot_password_email',(req,res)=>{
    var rand=Array.from(Array(6), () => Math.floor(Math.random() * 9)).join('');
    var message=`You forgot your password. Use this OTP ${rand} to change your Password.`
    const frommail='hiteshkyq23@gmail.com'
      const password = 'Hitesh@234'
      const tomail=req.body.tomail
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: frommail,
          pass: password
        }
      });
      var mailOptions = {
        from: frommail,
        to: tomail,
        subject: 'Verification Email',
        text: message
      };
      transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                res.json({
                  msg: 'fail'
                });
              }
              else{
                const data = new Otp({
                        email: tomail,
                        otp:rand
                });
                data.save();
                res.json({
                  msg: 'success'
                })
              }
      });
})

app.post('/password_change',(req,res)=>{
    User.updateOne({Email:req.body.tomail},{Password:req.body.newpass},(err)=>{
        if (err) {
            res.json({
              msg: 'fail'
            });
          }
          else{
            res.json({
              msg: 'success'
            })
          }
    })
})

app.post('/otp_verification',(req,res)=>{
    Otp.findOne({email:req.body.email,otp:req.body.otp},(err,result)=>{
    if(err){
        res.json({
        msg: 'fail'
        });
    }
    else{
        if(result==null){
            res.json({
            msg: 'fail'
            });
        }
        else{
        Otp.deleteOne({email:req.body.email,otp:req.body.otp},(err)=>{
            if(err){
                res.json({
                    msg: 'fail'
                });
            }
            else{
                res.json({
                   msg: 'success'
                });
            }
        })
        }
    }
    })
 })

app.post('/user_signin',(req,res)=>{
    const email_add=req.body.email
    const random_string=Array.from(Array(30), () => Math.floor(Math.random() * 35).toString(36)).join('');
    User.findOne({Email:req.body.email},(err,result)=>{
        if(err){
            res.json({
                msg: 'fail'
            })
        }
        else{
            if(result==null){
                res.json({
                    msg: 'wrong'
                });
            }
            else{
                bcrypt.compare(req.body.pass,result.Password,(err,decrypt)=>{
                    if(err){
                        res.json({
                            msg: 'fail'
                        })
                    }
                    else{
                        if(decrypt==false){
                            res.json({
                                msg: 'wrong'
                            })
                        }
                        else{
                            User.updateOne({Email:email_add},{token:random_string},(err)=>{
                                bcrypt.hash(result.Email,saltRounds,(err,bcryptData)=>{
                                    res.json({
                                       msg: 'success',
                                       token:random_string,
                                       token1:bcryptData
                                    });
                                })
                            })
                        }
                    }
                })
            }
        }
    })
})

const saltRounds=10;
app.post('/user_signup', (req, res) => {
    const random_string=Array.from(Array(30), () => Math.floor(Math.random() * 35).toString(36)).join('');
    let date=new Date()
    date=date.getFullYear()
    bcrypt.hash(req.body.pass,saltRounds,(err,hash)=>{
        if(err){
            res.json({
            msg: 'fail'
            })
        }
        else{
            const data = new User({
                Name: req.body.fname + " " + req.body.lname,
                Email: req.body.email,
                username:req.body.lname+"@"+date+req.body.fname,
                Password: hash,
                image:req.body.img,
                verified:false,
                followers:[],
                following:[],
                posts:[],
                comments:[],
                token:random_string
            });
            data.save(function(err) {
                if(err){
                    res.json({
                    msg: 'fail'
                    })
                }else {
                    bcrypt.hash(req.body.email,saltRounds,(err,result)=>{
                        res.json({
                           msg: 'success',
                           token:random_string,
                           token1:result
                        });
                    })
                }
            })
        }
    })
})



app.listen(process.env.PORT || 3001, function() {
    console.log("Server reached at port 3001")
})

//DFEB257C8E8A619577EEEB471109E0B0DD122AD646544A3AB08690CCA92D6A51957B571537A1CB8E824ADE98D18CA15D