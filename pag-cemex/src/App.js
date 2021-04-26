import './App.css';
import Navbar from './components/Navbar';
import LoggedRoute from './components/LoggedRoute'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Juego from './pages/Juego';
import User from './pages/User';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Router>
        <Switch>
          <Route exact path='/login' exact component={Login} />
          <div>
            <Navbar />
            <LoggedRoute exact path='/' exact component={Home} />
            <LoggedRoute path='/juego' exact component={Juego} />
            <LoggedRoute path='/user' exact component={User} />
          </div>
        </Switch>
    </Router>
    </>
  );
}

export default App;
