import { BrowserRouter,Route,Routes,Switch} from 'react-router-dom'
import './App.css';
import Sidebar from './Sidebar';
import Feed from "./Feed";
import Widget from './widget';
import Signin from './Sign_in'
import Signup from './Sign_up'
import Profile from './Profile'
// import DB from "./Firebase";
function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Route exact path="/" component={Sidebar}/>
      <Route exact path="/" component={Feed}/>
      <Route exact path="/" component={Widget}/>
      <Route exact path="/sign_in" component={Signin}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/profile" component={Profile}/>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
