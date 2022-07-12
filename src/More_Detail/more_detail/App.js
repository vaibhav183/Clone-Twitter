import React from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ProfilePage from "./pages/profile";
import PostPage from "./pages/post";
import EditProfilePage from "./pages/edit-profile";
import NotFoundPage from "./pages/not-found";
import PostModal from "./components/post/PostModal";
import Appp from '../../App';
import Profile from '../../Profile';


function App() {
  const history = useHistory();
  const location = useLocation();
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    if (history.action !== "POP" && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  const isModalOpen = modal && prevLocation.current !== location;

  return (
    <>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={Appp} />
        <Route exact path="/userDetail/:email" component={ProfilePage} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/accounts/edit" component={EditProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/userDetail/:email/:postId" component={PostModal} />}
    </>
  );
}

export default App;
