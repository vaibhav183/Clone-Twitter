import { BrowserRouter,Route,Routes,Switch} from 'react-router-dom'
import './App.css';
import Sidebar from './Sidebar';
import Feed from "./Feed";
import Widget from './widget';
import Signin from './Sign_in'
import Signup from './Sign_up'
import Profile from './Profile'
import Members from './Members'
import UserDetails from './UserDetails';
import NotFoundPage from './More_Detail/more_detail/pages/not-found';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Route exact path="/" component={Sidebar}/>
      <Route exact path="/" component={Feed}/>
    <Switch>
      <Route exact path="/" component={Widget}/>
      <Route exact path="/sign_in" component={Signin}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/members" component={Members}/>
      <Route exact path="/userDetail/:email" component={UserDetails}/>
      <Route path="*" component={NotFoundPage} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
