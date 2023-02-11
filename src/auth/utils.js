// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }

    const decoded = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {

        const refresh_token = localStorage.getItem('refreshToken');
        if (refresh_token) {
            axios.post('/auth/token/refresh', {refresh: refresh_token})
                .then((response) => {
                    const { access } = response.data;
                    setSession(access)
                }).catch((error) => {
                localStorage.removeItem('refreshToken');
                window.location.href = PATH_AUTH.login;
            })
        } else {
            localStorage.removeItem('refreshToken');
            window.location.href = PATH_AUTH.login;
        }


    }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (access) => {
    if (access) {
        localStorage.setItem('accessToken', access);
        axios.defaults.headers.common.Authorization = `Bearer ${access}`;

        // This function below will handle when token is expired
        const { exp } = jwtDecode(access); // ~3 days by minimals server

        tokenExpired(exp);
    } else {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
    }
};
