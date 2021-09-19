import React, { useState, useEffect } from 'react'
import "./feed.css"
import Avatar from '@mui/material/Avatar';
import Vaibhav from "./public/link4.jpg"
import Button from '@mui/material/Button';
import Post from "./Post"

function Feed() {
    const [posts, setPosts] = useState([]);


  // async function getposts(db) {
  //   const citiesCol = ;
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   return cityList;
  // }
    return (
        <div className="feed">
            <div className="feed_header">
                <h2>Home</h2>
            </div>
            <form className="form">
                <div className="input_box">
                <Avatar alt="Vaibhav Sharp" src={Vaibhav} />
                <textarea placeholder="What's happening in college...."/>
                </div>
                <input className="input_url" placeholder="Enter url of image" type="text"/>
                <Button variant="outlined">Tweet</Button>
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
