import { React } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import authService from '../api/authService';
import RegularRoute from './RegularRoute';

class AuthenticatedRoute extends RegularRoute {
    state = {
        loading: true,
        isAuthenticated: false,
    };

    componentDidMount() {
        authService.isValidSession().then((isAuthenticated) => {
            this.setState({
                loading: false,
                isAuthenticated: isAuthenticated,
            });
        });
    }

    render() {
        // const { component: Component } = this.props;
        if (this.state.loading) {
            // TODO: una mejor página de carga
            return (
                <Spinner
                    className='text-center loading-spinner'
                    animation='border'
                />
            );
        } else {
            console.log(this.state);
            if (this.state.isAuthenticated) {
                return super.render();
            } else {
                return <Redirect to='/login' />;
            }
        }

        // if (isLoggedIn) {
        //     return super.render();
        // } else {
        //     return <Redirect to='/login' />;
        // }
    }
}

export default withRouter(AuthenticatedRoute);
