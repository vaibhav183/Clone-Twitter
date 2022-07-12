////////// Reducer /////////
const intialState={
    name:"",
    username:"",
    email:"",
    verified:false,
    imgurl:"",
    followers:[],
    following:[],
    posts:[],
    comments:[]
}
const changeUserData=(state=intialState,action)=>{
    switch(action.type){
        case "filled":
            return action.data;
        case "follower_change":
            return {
                ...state,
                followers: state.followers.filter((item)=>item.email!=action.data)
            }
        case "following_change":
            return {
                ...state,
                following: state.following.filter((item)=>item.email!=action.data)
            }
        case "clear":
            return state;
        default :
            return intialState;
    }
}

export default changeUserData;