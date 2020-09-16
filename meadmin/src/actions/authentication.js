import { GET_ERRORS, SET_CURRENT_USER,GET_USER,UPDATE_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import AppConstants from 'AppConstants';
import axios from 'axios';

export const loginUser = (user) => dispatch => {
    console.log("user",user)
    axios.post(AppConstants.API+"/users/login", user)
            .then(res => {
                console.log("user111",res)
                if(res.data.Status == 'Failed' ){
                    dispatch({
                        type: GET_ERRORS,
                        payload: res.data
                    }); 
                }else{
                    const { token } = res.data;
                    localStorage.setItem('jwtToken', token);
                    setAuthToken(token);
                    const decoded = jwt_decode(token);
                    dispatch(setCurrentUser(decoded));
                }
            })
            /* .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }); 
            });*/
}

export const getProfile = (id,history )=> async dispatch =>
{
   //console.log(id);
    fetch(AppConstants.API+'/users/profile/'+id).then(response => response.json())
    .then(data => {
     // console.log(" User Details ", data.data);
        if(data.Status == "Failed" )
        {
            dispatch({
                type: GET_ERRORS,
                payload: data.msg
            });
        }
        else
        {
           // console.log(data.user);
            dispatch({
                type: GET_USER,
                payload: data.data
            });
        }	  
    });
};

export const updateProfile = (formData,config,history) => dispatch => {
    axios.post(AppConstants.API+'/users/updateAdminprofile', formData,config).then(res => 
    {
        if(res.data.status == 'success'){
            const update_data = res.data;
            dispatch(updateCurrentUser(update_data));              
            history.push(AppConstants.STAGADMIN+'/viewadminprofile')
        }else
        {
            dispatch({
                type: GET_ERRORS,
                payload: res.data.msg
            });
        }       
       
    });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.href = '/login'
    //history.push('/');
}

//Update admin details
export const updateCurrentUser = update_data => {
	//console.log(update_data);
    return {
        type: UPDATE_USER,
        payload: update_data
    }
}