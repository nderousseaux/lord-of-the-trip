import { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import { AuthProvider, useAuth } from './authentication/auth';
import HomePage from './home/home';
import LoginDrawer from './authentication/LoginDrawer';
import SignupDrawer from './authentication/SignupDrawer';
import UserDashboard from './user/dashboard';
import ViewSubscribedChallenge from './user/viewSubscribedChallenge';
import ViewNotSubscribedChallenge from './user/viewNotSubscribedChallenge';
import AdminDashboard from './admin/dashboard';
import EditChallenge from './admin/editChallenge';
import EditMap from './admin/editMap';
import AdminViewChallenge from './admin/viewChallenge';
import './Custom.css';
import { useStyles } from './CustomCSS';
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
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  let { user, logout} = useAuth();
  const history = useHistory();
  return (
    <>
      <Link to="/"> <h1>Lord of the trips</h1> </Link>
      {!user ? <> <Button onClick={() => setOpenLogin(true)} size="small" variant="contained" color="primary" className={classes.colorPrimary} style={{textTransform: 'none'}}>Connexion</Button> ou {' '}
                  <Button onClick={() => setOpenSignup(true)} size="small" variant="contained" color="primary" className={classes.colorPrimary} style={{textTransform: 'none'}}>Inscription</Button> </>
             : null}
      {user ? <>
        Salut {user.first_name} {user.last_name}, ou {user.pseudo} pour t'appeler avec ton pseudo. {user.is_admin ? "Vous êtes un administrateur !" : null}
        {' '}<Button onClick={logout} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Déconnexion</Button>
        <br />
        {' '} <Button onClick={() => history.push(`/dashboard`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Dashboard utilisateur</Button>
      </> : null}
      {user?.is_admin ? <>
        {' '} <Button onClick={() => history.push(`/admindashboard`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Dashboard administrateur</Button>
      </> : null}
      <LoginDrawer openState={openLogin} setOpenState={setOpenLogin} setOpenSignup={setOpenSignup} />
      <SignupDrawer openState={openSignup} setOpenState={setOpenSignup} setOpenLogin={setOpenLogin} />
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
