import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import { AuthProvider, useAuth } from './authentication/auth';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import HomePage from './home/home';
import UserDashboard from './user/dashboard';
import ViewSubscribedChallenge from './user/viewSubscribedChallenge';
import ViewNotSubscribedChallenge from './user/viewNotSubscribedChallenge';
import AdminDashboard from './admin/dashboard';
import EditChallenge from './admin/editChallenge';
import EditMap from './admin/editMap';
import AdminViewChallenge from './admin/viewChallenge';
import './Custom.css';
import Button from '@material-ui/core/Button';

const queryClient  = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

const Header = () => {
  let { user, logout} = useAuth();
  const history = useHistory();
  return (
    <>
      <Link to="/"> <h1>Lord of the trips</h1> </Link>
      {!user ? <> <Link to="/login"><b>Login</b></Link> or <Link to="/signup"><b>Signup</b></Link> </> : null}
      {user ? <>
        Hello {user.first_name} {user.last_name}, or {user.pseudo} to call you with your pseudo. {user.is_admin ? "You are a admin user !" : "You are a normal user."}
        {' '}<Button onClick={logout} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Logout</Button>
        <br />
        {' '} <Button onClick={() => history.push(`/dashboard`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>User Dashboard</Button>
      </> : null}
      {user?.is_admin ? <>
        {' '} <Button onClick={() => history.push(`/admindashboard`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Admin Dashboard</Button>
      </> : null}
    </>
  );
};

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        {/* User routes */}
        <Route path="/dashboard">
          <UserDashboard />
        </Route>
        <Route path="/viewsubscibedchallenge/:id">
          <ViewSubscribedChallenge />
        </Route>
        <Route path="/viewnotsubscibedchallenge/:id">
          <ViewNotSubscribedChallenge />
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

const Main = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <hr />
        <Routes />
      </AuthProvider>
    </>
  );
};

const App = () => {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
