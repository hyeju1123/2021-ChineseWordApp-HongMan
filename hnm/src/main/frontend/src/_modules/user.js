import AuthenticationService from "../auth/AuthenticationService";
import { handleAlertOn } from "./alert";

/* type */
const RESTORE_TOKEN = 'restore_token';

const SIGN_IN = 'sign_in';
const SIGN_IN_SUCCESS = 'sign_in_success';
const SIGN_IN_ERROR = 'sign_in_error';

const SIGN_OUT = 'sign_out';
const SIGN_OUT_SUCCESS = 'sign_out_success';
const SIGN_OUT_ERROR = 'sign_out_error';

/* action */
export const restoreToken = (token) => {
    return {
        type: 'restore_token',
        token: token
    }
}

export const signIn = (email, password, snsType) => async dispatch => {
    dispatch({ type: SIGN_IN, error: null });

    AuthenticationService
        .executeJwtAuthenticationService(email, password, snsType)
        .then(res => {
            console.log('res.data: ', res.data)
            const data = res.data;
            if (data.emailAuth === true) {
                AuthenticationService.registerSuccessfullLoginForJwt(email, data.accessToken, data.memberId, snsType);
                dispatch({ type: SIGN_IN_SUCCESS, payload: res.data })
            } else if (data.emailAuth === false) {
                dispatch(handleAlertOn('회원가입을 완료해주세요!', `등록한 메일함(${email})에서 메일 인증을 완료해주세요.`, ()=>{} ));
                dispatch({ type: SIGN_IN_ERROR, error: 'Unauthenticated email.' })
            }
        })
        .catch(async (e) => {
            dispatch({ type: SIGN_IN_ERROR, error: e })
            dispatch(handleAlertOn('로그인 실패!', '이메일이나 비밀번호를 다시 확인해 주세요', ()=>{} ));
            if (snsType === 'google') await AuthenticationService.googleLogout();
            if (snsType === 'naver') AuthenticationService.naverLogout();
        })
}

export const signOut = () => async dispatch => {
    dispatch({ type: SIGN_OUT });

    try {
        AuthenticationService.logout()
            .then(
                dispatch({ type: SIGN_OUT_SUCCESS })
            )
    } catch (e) {
        dispatch({ type: SIGN_OUT_ERROR, error: e })
    }

}


/* reducer */
const initialState = {
    isLoading: true,
    isSignOut: false, 
    userToken: null,
    error: null
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                ...state.data,
                userToken: action.token,
                isLoading: false,
                error: null
            }
        case SIGN_IN:
            return {
                ...state.data,
                userToken: null,
                isLoading: true,
                error: null,
            }    
        case SIGN_IN_SUCCESS:
            return {
                ...state.data,
                userToken: action.payload.accessToken,
                isLoading: false,
                error: null
            }
        case SIGN_IN_ERROR:
            return {
                ...state.data,
                error: action.error,
                userToken: null,
                isLoading: false
            }
        case SIGN_OUT:
            return {
                ...state.data,
                isLoading: true,
                error: null
            }
        case SIGN_OUT_SUCCESS:
            return {
                isLoading: false,
                userToken: null,
                isSignOut: true,
                error: null
            }
        case SIGN_OUT_ERROR:
            return {
                ...state.data,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}