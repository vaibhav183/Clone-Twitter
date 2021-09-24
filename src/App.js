import './App.css';
import Sidebar from './Sidebar';
import Feed from "./Feed";
import Widget from './widget';
// import DB from "./Firebase";
function App() {
  return (
    <div className="app">
      <Sidebar/>
      <Feed/>
      <Widget/>
    </div>
  );
}

export default App;
