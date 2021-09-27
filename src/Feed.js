import React, { useState, useEffect } from 'react'
import "./feed.css"
import Avatar from '@mui/material/Avatar';
import Vaibhav from "./public/link4.jpg"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import Axios from 'axios'
import Post from "./Post"
import FormData from 'form-data';
// import {Image} from 'cloudinary-react'

function Feed() {
    const [dataPost,setDataPost]=useState(null)
    const [error_data,setError_data]=useState("")
    const [dbdata,setDbdata] = useState([]);
    const [posts, setPosts] = useState({
        name:"Babita Pandey",
        username:"Babita@183",
        email:"bp789792@gmail.com",
        post_data:"",
        post_url:"",
        verified:true,
        text:""
    });
   const textchange=(e)=>{
       setPosts({ ...posts, text:(e.target.value)})
   }
   useEffect(()=>{
       Axios.get("https://clone-twitter-by-vaibhav.herokuapp.com/fetch")  
       .then((data)=>{
            setDbdata(data.data)
       })
       .catch(()=>{
           console.log("Error, Can't fetch from database")
       })
   })

   const submission=async(e)=>{
       e.preventDefault();
       const formData = new FormData()
       formData.append('file', dataPost)
       formData.append('upload_preset','postimage' )
    //    formData.append('name',posts.name)
    //    formData.append('username',posts.username)
    //    formData.append('email',posts.email)
    //    formData.append('post_url',posts.post_url)
    //    formData.append('verified',posts.verified)
    //    formData.append('text',posts.text)
    //    console.log(formData)
    console.log(dataPost,posts.text,posts.post_url)
       if(dataPost===null && posts.text==='' && posts.post_url===''){
        setError_data("Pick your Idea first....")
        setUploadName("Upload Image")
        setPosts({...posts,text:"",post_url:""})
        setDataPost(null)
       }
       else if(dataPost!==null){
        Axios.post("https://api.cloudinary.com/v1_1/vaibhav183vibhu/image/upload",formData)  // change proxy(in package.json) to backend server.
       .then(async function (response) {
            console.log(response.data.secure_url);
            setPosts({...posts,post_data:response.data.secure_url})
            const store = {
                name:posts.name,
                username:posts.username,
                email:posts.email,
                post_data:response.data.secure_url,
                post_url:posts.post_url,
                verified:posts.verified,
                text:posts.text
            }
            console.log(store)
            Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/insert",store)
            .then((response)=>{
                console.log(response)
                setUploadName("Upload Image")
                setPosts({...posts,text:"",post_url:""})
                setDataPost(null)
                setError_data("Idea submitted Successfully")
            })
            .catch((error)=>{
                console.log(error)
                setUploadName("Upload Image")
                setPosts({...posts,post_url:"",text:""})
                setDataPost(null)
                setError_data("Ooh something wrong!!")
            })
       })
       .catch(function (error) {
        console.log("not sent");
      })
     }
     else{
        const store = {
            name:posts.name,
            username:posts.username,
            email:posts.email,
            post_data:"",
            post_url:posts.post_url,
            verified:posts.verified,
            text:posts.text
        }
        Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/insert",store)
            .then((response)=>{
                console.log(response)
                setUploadName("Upload Image")
                setPosts({...posts,text:"",post_url:""})
                setDataPost(null)
                setError_data("")
            })
            .catch((error)=>{
                console.log(error)
                setUploadName("Upload Image")
                setPosts({...posts,post_url:"",text:""})
                setDataPost(null)
                setError_data("")
        })
     }
   }

   const [uploadName,setUploadName] =useState("Upload Image");
   const uploaded=(e)=>{
       var s=(e.target.files[0].type)
       if(s==="image/jpeg" || s==="image/png") {
        console.log(e.target.files[0])
        setUploadName(e.target.files[0].name)
        setDataPost(e.target.files[0])
       }
   }
   const uploadUrl=(e)=>{
    setPosts({...posts,post_url:e.target.value})
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
                <div className="posting_data">
                <Button className="upload" variant="outlined" component="label" startIcon={<FileUploadIcon/>}>
                    {uploadName} <input type="file" hidden onChange={(e)=>uploaded(e)}/>
                </Button>
                <input className="input_url" placeholder="Enter URL of Image" value={posts.post_url}  type="text" onChange={(e)=>uploadUrl(e)}/>
                </div>
                <div className="submit_button">
                <h4 className="Error_sign">{error_data}</h4>
                <Button className="submit" variant="outlined" onClick={submission}>Tweet</Button>
                </div>
                
            </form>
            {dbdata.map((post) => (  
            <Post 
            display_pic={Vaibhav} 
            Name={post.name} 
            Username={post.username} 
            verified={post.verified} 
            text={post.text} 
            post_data={post.post_data}
            post_url={post.post_url} 
            />
             ))}
        </div>
    )
}

export default Feed;

