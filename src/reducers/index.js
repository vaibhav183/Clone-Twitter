import changeToken from "./setToken";
import changeToken1 from "./setToken1";
import changeUserData from './user_detail'

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    changeToken1,
    changeToken,
    changeUserData
});

export default rootReducer;