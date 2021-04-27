import React, { useEffect } from 'react';
// import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom';

const AuthenticatedRoute = ({ title, component: Component, ...rest }) => {
    useEffect(() => {
        document.title = 'CEMEX' + (title === undefined ? '' : ` – ${title}`);
    });

    //   const isLoggedIn = AuthService.isLoggedIn()
    const isLoggedIn = getCookie('logged') !== null;

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

// Funcion TEMPORAL para leer cookie de sesion iniciada
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + '=';
    var begin = dc.indexOf('; ' + prefix);
    if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(';', begin);
        if (end === -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

export default AuthenticatedRoute;
