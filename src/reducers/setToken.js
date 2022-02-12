const intialState=null;

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