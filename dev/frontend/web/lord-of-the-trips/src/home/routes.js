import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './home';
import UserDashboard from '../user/dashboard';
import ViewSubscribedChallenge from '../user/viewSubscribedChallenge';
import ViewNotSubscribedChallenge from '../user/viewNotSubscribedChallenge';
import ViewFinishChallenge from '../user/viewFinishChallenge';
import AdminDashboard from '../admin/dashboard';
import EditChallenge from '../admin/editChallenge';
import EditMap from '../admin/editMap';
import AdminViewChallenge from '../admin/viewChallenge';
import ChallengesAvailable from '../user/challengesAvailable'

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        {/* User routes */}
        <Route path="/dashboard">
          <UserDashboard />
        </Route>
        <Route path="/ChallengesAvailable">
          <ChallengesAvailable />
        </Route>
        <Route path="/viewsubscibedchallenge/:id">
          <ViewSubscribedChallenge />
        </Route>
        <Route path="/viewnotsubscibedchallenge/:id">
          <ViewNotSubscribedChallenge />
        </Route>
        <Route path="/viewFinishChallenge/:id">
          <ViewFinishChallenge />
        </Route>


        {/* Admin routes */}
        <Route path="/admindashboard">
          <AdminDashboard />
        </Route>
        <Route path="/editchallenge/:id">
          <EditChallenge />
        </Route>
        <Route path="/editmap/:id">
          <EditMap />
        </Route>
        <Route path="/adminviewchallenge/:id">
          <AdminViewChallenge />
        </Route>

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Routes;
