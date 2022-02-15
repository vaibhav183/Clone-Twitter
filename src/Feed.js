import React, { useState, useEffect } from 'react'
import "./feed.css"
import 'animate.css';
import Avatar from '@mui/material/Avatar';
import Vaibhav from "./public/link4.jpg"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import Axios from 'axios'
import Post from "./Post"
import FormData from 'form-data';
import {useSelector,useDispatch} from "react-redux"
import {filling,clear} from "./actions/index";
// import {Image} from 'cloudinary-react'

//Profile Photo short Name
function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {bgcolor: stringToColor(name)},
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

function Feed() {
    const myState=useSelector((state)=>state.changeToken)
    const myState1=useSelector((state)=>state.changeToken1)
    const user_data=useSelector((state)=>state.changeUserData)
    const dispatch=useDispatch()
    const [dataPost,setDataPost]=useState(null)
    const [error_data,setError_data]=useState("")
    const [dbdata,setDbdata] = useState([]);
    const [posts, setPosts] = useState({
        name:"Vaibhav Pandey",
        username:"Vaibhav@183",
        email:"vp789792@gmail.com",
        post_data:"",
        post_url:"",
        verified:true,
        text:""
    });
   const textchange=(e)=>{
       setPosts({ ...posts, text:(e.target.value)})
   }
   useEffect(()=>{
       let abortController = new AbortController(); 
       Axios.get("https://clone-twitter-by-vaibhav.herokuapp.com/fetch")  
       .then((data)=>{
            setDbdata((data.data).reverse())
       })
       .catch(()=>{
           console.log("Error, Can't fetch from database")
       })
       return () => {  
        abortController.abort();  
       }  
   },[])

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

   useEffect(() => {
    Axios.post("https://clone-twitter-by-vaibhav.herokuapp.com/fetching_data_user",{token:myState,token1:myState1})
    .then((response)=>{
        if(response.data.msg=='success'){
            console.log(response.data.posts)
            dispatch(filling(response.data))
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    },[]);

   // Returning Object
   if(myState==null || myState1==null){
       return (
        <div className="feed">
            <div className="feed_header">
                <h1 className="animate__animated animate__backInUp" style={{marginTop:1}}>Home</h1>
            </div>
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
   else{
    return (
        <div className="feed">
            <div className="feed_header">
                <h1 className="animate__animated animate__backInUp" style={{marginTop:2}}>Welcome {user_data.name}</h1>
            </div>
            <form className="form" method="POST">
                <div className="input_box">
                <Avatar {...stringAvatar("Vaibhav Pandey")} src={user_data.imgurl} />
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
}

export default Feed;

