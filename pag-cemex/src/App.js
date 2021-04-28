import './App.css';
import Navbar from './components/Navbar';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import RegularRoute from './components/RegularRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Juego from './pages/Juego';
import User from './pages/User';
import Login from './pages/Login';
import Ajustes from './pages/Ajustes';
import Upperbar from './components/Upperbar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <>
            
            <Router>
                <Switch>
                    <RegularRoute
                        path='/login'
                        title='Iniciar sesión'
                        exact
                        component={Login}
                    />
                    <div>
                        <Upperbar />
                        <Navbar/>
                      
                        <Switch>
                            <AuthenticatedRoute
                                path='/'
                                title='Página principal'
                                exact
                                component={Home}
                            />
                            <AuthenticatedRoute
                                path='/juego'
                                title='Juego'
                                exact
                                component={Juego}
                            />
                            <AuthenticatedRoute
                                path='/user'
                                title='Pefil'
                                exact
                                component={User}
                            />
                            <AuthenticatedRoute
                                path='/ajustes'
                                title='Ajustes'
                                exact
                                component={Ajustes}
                            />
                        </Switch>
                   
                    </div>
                </Switch>
            </Router>
        </>
    );
}

export default App;
