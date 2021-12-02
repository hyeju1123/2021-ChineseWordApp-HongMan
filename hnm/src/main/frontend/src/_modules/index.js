import { combineReducers } from "redux";
import user from './user';
import alert from "./alert";
import color from "./color";

const rootReducer = combineReducers({
    user, alert, color
})

export default rootReducer;