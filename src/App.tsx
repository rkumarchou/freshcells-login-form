import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Dashboard from './component/Dashboard'
import Login from './component/Login'
function App() {
  const isAuthenticated: string| null  = localStorage.getItem('token')
  return (
     <Router>  
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/dashboard' component={Dashboard}/> 
      </Switch>
    </Router>
  );
}

export default App;
