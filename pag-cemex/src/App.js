import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home'
import Juego from './pages/Juego'
import User from './pages/User'

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/juego' exact component={Juego} />
          <Route path='/user' exact component={User} />
        </Switch>
     
    </Router>
    </>
  );
}

export default App;
