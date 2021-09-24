require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors') // It is used to connection between two servers
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
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    })
    Posts = mongoose.model('posts', post_schema);
})

app.get("/", function(req, res) {
    // res.send("Hello")\
    res.sendFile(__dirname+"/index.html")
})

app.post('/insert', (req, res) => {
    const post1 = new Posts({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        post_data: req.body.post_data,
        verified: req.body.verified,
        text: req.body.text
    })
    post1.save(function(err) {
        if (err) return console.log("error");
        else return console.log("Data posted successfully");
    })
})

app.listen(process.env.PORT || 3001, function() {
    console.log("Server reached at port 3001")
})