const intialState=localStorage.getItem('token1');

const changeToken1=(state=intialState,action)=>{
    switch(action.type){
        case "doNull":
            return null;
        case "setMail":
            return action.token;
        default :
            return state;
    }
}

export default changeToken1;