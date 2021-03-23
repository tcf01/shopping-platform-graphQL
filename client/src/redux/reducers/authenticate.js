import { LOGIN_SUCCESS, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAIL, LOGOUT_SUCCESS } from '../../utils/constants';


const initialState = {
    username: '',
    email: '',
    role: '',
    isLogin: false,
    _id:''
}

const authenticateUserReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
        case AUTHENTICATE_USER_SUCCESS:
            const { username, email, role, _id} = action.userData;
            return { username, email, role, _id, isLogin: true }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('auth-token')
            return { isLogin: false }
        case AUTHENTICATE_USER_FAIL:
            return false;
        default:
            return state;
    }
}

export default authenticateUserReducer;