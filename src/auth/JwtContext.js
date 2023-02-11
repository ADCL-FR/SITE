import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback } from 'react';
// utils
import axios from '../utils/axios';
//
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

const reducer = (state, action) => {
    if (action.type === 'INITIAL') {
        return {
            isInitialized: true,
            isAuthenticated: action.payload.isAuthenticated,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGIN') {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }
    if (action.type === 'REGISTER') {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    }

    return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {
            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);

                const response = await axios.get('/api/user');

                const user  = response.data;
                dispatch({
                    type: 'INITIAL',
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                });
            } else {
                dispatch({
                    type: 'INITIAL',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'INITIAL',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    // LOGIN
    const login = async (username, password) => {
        const response = await axios.post('/auth/token', {
            username,
            password,
        }).catch((error) => {
            throw  error.detail;
        });

        const { access, refresh } = response.data;
        localStorage.setItem('refreshToken', refresh);
        setSession(access);
        const user_response = await axios.get('/api/user');

        const  user = user_response.data;
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        });

    };

    // REGISTER
    const register = async (email, password, firstName, lastName) => {
        const response = await axios.post('/api/account/register', {
            email,
            password,
            firstName,
            lastName,
        });
        const { accessToken, user } = response.data;

        localStorage.setItem('accessToken', accessToken);

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        });
    };

    // refresh token
    const refresh_token = async () => {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : '';
        if (refreshToken && isValidToken(refreshToken)){

        }else{

        }
    }

    // LOGOUT
    const logout = async () => {
        setSession(null);
        dispatch({
            type: 'LOGOUT',
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
