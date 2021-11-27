import { SWITCH_DISPLAY } from "./action-types";

export const switchDisplay = () => {
    return function(dispatch) {
        dispatch({
            type: SWITCH_DISPLAY,
            payload: null
        })
    }
}