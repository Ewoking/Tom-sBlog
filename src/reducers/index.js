import { combineReducers } from "redux";
import DisplayReducer from "./displayReducer";
import UserReducer from './userReducer';


const rootReducer = combineReducers({
    user: UserReducer,
    display: DisplayReducer
});

export default rootReducer;