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
        case "clear":
            return {
                ...state,
                name:"",
                username:"",
                email:"",
                verified:false,
                imgurl:"",
                followers:[],
                following:[],
                posts:[],
                comments:[]
            };
        default :
            return {
                ...state,
                name:"",
                username:"",
                email:"",
                verified:false,
                imgurl:"",
                followers:[],
                following:[],
                posts:[],
                comments:[]
            };
    }
}

export default changeUserData;