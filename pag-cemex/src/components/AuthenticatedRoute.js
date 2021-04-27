import { React } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
// import AuthService from './Services/AuthService'
import RegularRoute from './RegularRoute';

class AuthenticatedRoute extends RegularRoute {
    render() {
        const isLoggedIn = getCookie('logged') !== null;
        if (isLoggedIn) {
            return super.render();
        } else {
            return <Redirect to='/login' />;
        }
    }
}

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

export default withRouter(AuthenticatedRoute);
