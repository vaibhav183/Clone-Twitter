const intialState=localStorage.getItem('token');

const changeToken=(state=intialState,action)=>{
    switch(action.type){
        case "doNull":
            return null;
        case "doNotSetNull":
            return action.token;
        default :
            return state;
    }
}

export default changeToken;