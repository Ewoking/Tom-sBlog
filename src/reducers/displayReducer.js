import { SWITCH_DISPLAY } from "../actions/display/action-types";

const initialState = {
    darkMode : true
}

export default function DisplayReducer(state = initialState, action) {
    switch(action.type){
        case SWITCH_DISPLAY :
            return {darkMode: !state.darkMode}
        default:
            return initialState;
    }
}