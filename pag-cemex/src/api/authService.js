import axios from 'axios';

class AuthService {
    isValidSession = async () => {
        try {
            // TODO: change this in production!!!
            let response = await axios.get('http://localhost:3001/auth');
            return response.data.logged;

            // TODO: catch err on other side
        } catch (err) {
            if (err.response.status === 410) {
                return false;
            }
        }
    };

    logIn = async (userOrEmail, password) => {
        const result = await axios.post('http://localhost:3001/auth/login', {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: {
                userOrEmail: userOrEmail,
                password: password,
            },
        });

        console.log(result);

        localStorage.setItem('access_token', result.data.access);
        localStorage.setItem('refresh_token', result.data.refresh);
    };
}

const authService = new AuthService();

axios.interceptors.request.use(
    async (config) => {
        // const value = await redisClient.get(rediskey);
        // const keys = JSON.parse(value);
        config.headers = {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            const success = await refreshAccessToken();

            if (success) {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${localStorage.getItem('access_token')}`;
                return axios(originalRequest);
            } else {
                throw error;
            }
        }
        return Promise.reject(error);
    }
);

async function refreshAccessToken() {
    let refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        return false;
    }

    const result = await fetch('http://localhost:3001/auth/refresh', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { refresh_token: refreshToken },
    });
    if (!result.refresh_token || !result.access_token) {
        return false;
    }

    localStorage.setItem('access_token', result.data.access);
    localStorage.setItem('refresh_token', result.data.refresh);
    return true;
}

export default authService;
