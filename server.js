require('dotenv').config();
const fs=require('fs')
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // file upload
app.use(fileUpload());
const cors = require('cors') // It is used to connection between two servers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("Public"))
app.use(bodyParser.json())
const path=require('path')
/*app.use('/fetch1', express.static(path.join(__dirname, '/Public')));*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(cors());
const url = "mongodb+srv://vaibhav183:Mongodb_vibhu1@cluster0.zksak.mongodb.net/twitter_clone";
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
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        post_data: {
            type: String
        },
        post_url: {
            type: String
        },
        verified: {
            type: Boolean,
        },
        text: {
            type: String,
        }
    })
    Posts = mongoose.model('posts', post_schema);
})


app.get("/", function(req, res) {
    // res.send("Hello")\
    res.sendFile(__dirname+"/index.html")
})
let date=new Date()
app.get('/fetch',(req,res)=>{
    console.log("fetched from database")
    Posts.find({},function(err, result){
        if(err) {
            res.send(err)
        }else {
            res.send(result) ;
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
app.post('/insert', (req, res) => {
console.log("insert data................................")

      // data upload into database
      const post1 = new Posts({
                  name: req.body.name,
                  username: req.body.username,
                  email: req.body.email,
                  post_data:req.body.post_data,
                  post_url:req.body.post_url,
                  verified: req.body.verified,
                  text: req.body.text
      })
      post1.save(function(err) {
          if (err){
              return console.log(err);
          }
          else {
              return console.log("Data posted successfully",date.getMilliseconds());
          }
      })
})



app.listen(process.env.PORT || 3001, function() {
    console.log("Server reached at port 3001")
})