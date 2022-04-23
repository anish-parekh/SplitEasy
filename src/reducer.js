import { render } from "@testing-library/react";
import { Route } from "react-router-dom";
import Login from "./Login";
/** initially the user is NOT logged in */
export const initialState = {
    user: {
        displayName: "anish"
    }
    // user: null
};

/** pushing information into the data layer through dispatch function */
export const actionTypes = {
    SET_USER: "SET_USER"
};

// export function null_user () {
//     // console.log(action.user);
//     reducer("",{type:"null"});
//     // render(<Login/>,document.getElementById('root'));
    
// };


const reducer = (state,action) => {
    console.log(action);
    switch(action.type) {
        case actionTypes.SET_USER:
            return {                        /** we return whatever we intend to change in the data layer */
                ...state,           /** keep everyting the same */
                user: action.user   /** except the user */
            };
        // case "null":
        //     return {
        //         ...state,           /** keep everyting the same */
        //         user: null   /** null  */
        //     }
            default:        {/** if we are not changing the user then don't change anything and return the same old version */}
                return state;
    }
};

export default reducer;