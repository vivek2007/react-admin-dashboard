import { SET_CURRENT_USER, FETCH_USER_DATA, UPDATE_USER_DATA,GET_USER,UPDATE_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';
const initialState = {
    isAuthenticated: false,
	user: {}
}
export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
            case GET_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
            case UPDATE_USER:
            return {
              ...state,
              isAuthenticated: !isEmpty(action.payload),
              user: action.payload
            } 
        case FETCH_USER_DATA:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default: 
            return state;
    }
}


