import React, { useState, useEffect } from 'react'
import "./feed.css"
import Avatar from '@mui/material/Avatar';
import Vaibhav from "./public/link4.jpg"
import Button from '@mui/material/Button';
import Axios from 'axios'
import Post from "./Post"

function Feed() {
    const [posts, setPosts] = useState({
        name:"Babita Pandey",
        username:"Babita@183",
        email:"bp789792@gmail.com",
        post_data:"hello Babita",
        verified:true,
        text:""
    });
   const textchange=(e)=>{
       setPosts({ ...posts, text:(e.target.value)})
   }

   const submission=async(e)=>{
       e.preventDefault();
       const store={name:posts.name, username:posts.username, email:posts.email, post_data:posts.post_data, verified:posts.verified, text:posts.text}
       await Axios.post("/insert",store)  // change proxy(in package.json) to backend server.
       .then(console.log("Data sent"));
   }

    return (
        <div className="feed">
            <div className="feed_header">
                <h2>Home</h2>
            </div>
            <form className="form" method="POST">
                <div className="input_box">
                <Avatar alt="Vaibhav Sharp" src={Vaibhav} />
                <textarea placeholder="What's happening in college...." value={posts.text} onChange={textchange}  />
                </div>
                <input className="input_url" placeholder="Enter url of image" type="text"/>
                <Button variant="outlined" onClick={submission}>Tweet</Button>
            </form>
            {/* {posts.map((post) => (
            <Post 
            display_pic={post.display_pic} 
            Name={post.Name} 
            Username={post.Username} 
            verified={post.verified} 
            text={post.text} 
            post_data={post.post_data}
            />
             ))}; */}
        </div>
    )
}

export default Feed;
