import axios from 'axios';
const axiosConfigPostUsers = {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const login = (uid) => ({
    type: 'LOGIN',
    uid
}); 

export const startLogin = (user = {}) => {
    return (dispatch) => {
        axios.post('/users/login', user, axiosConfigPostUsers)
            .then((res) => {
                const token = res.headers['x-auth'];
                localStorage.setItem('token', token);
                dispatch(login(token));
            })
            .catch((e) => {
                dispatch(error());
            });
    };
};

export const register = (uid) => ({
    type: 'REGISTER',
    uid
}); 

export const startRegister = (user = {}) => {
    return (dispatch) => {
        axios.post('/users', user, axiosConfigPostUsers)
            .then((res) => {
                const token = res.headers['x-auth'];
                localStorage.setItem('token', token);
                dispatch(register(token));
            })
            .catch((e) => {
                dispatch(error());
            });
    };
};


export const error = () => ({
    type: 'ERROR',
    error: 'Correo o contraseña incorrecto'
}); 

export const logout = () => ({
    type: 'LOGOUT'
}); 

export const startLogout = () => {
    return (dispatch, getState) => {
        axios.delete('/users/me/token', {headers: {'x-auth': getState().auth.uid}})
            .then((res) => {
                localStorage.removeItem('token');
                dispatch(logout());
            })
            .catch((e) => {
                console.log('Hubo un error', e);
            });
    };
};



