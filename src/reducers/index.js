import changeToken from "./setToken";
import changeToken1 from "./setToken1";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    changeToken1,
    changeToken
});

export default rootReducer;