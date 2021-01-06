import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action ) => {
    switch(action.type) {
        case 'add_error':
            return ({...state, errorMessage: action.payload});
        
        case 'signin' :
            return ({ errorMessage: '', token: action.payload});

        case 'signout':
            return ({ errorMessage: '', token: null});

        case 'clear_error_message':
            return ({...state, errorMessage: ''});

        default:
            return state;
    }
};

const signup = (dispatch) => async ({ email, password }) => {
    
    try{
        //make api request to signup with that email and password
        const response = await trackerApi.post('/signup', {email, password})

        //if we sign up modify that state, and say that we are authenticated
        AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token})
    } catch(err) {
        //if signing up fail. show an error message
        dispatch ({
            type: 'add_error',
            payload: "Something went wrong while signing up"
        })
    }
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({
        type: 'clear_error_message'
    })
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
        dispatch({ type: 'signin', payload: token});
    }
}

const signin = (dispatch) => async ({ email, password }) => {
    
    try {
        //Try to sign in
        const response = await trackerApi.post('/signin', {email, password})

        //Handle success by updating state
        AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token});
        
    } catch(err) {
        //Handle failure by showing error message
        dispatch ({
            type: 'add_error',
            payload: 'Something went wrong while signing in'
        })
    }
}

const signout = (dispatch) => async () => {
        //signout
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'})
}

export const { Context, Provider } = createDataContext(
    authReducer,
    {signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);