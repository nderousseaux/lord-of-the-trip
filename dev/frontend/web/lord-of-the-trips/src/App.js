import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './authentication/auth';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import AdminChallenges from './admin/challenges'
import EditChallenge from './admin/editChallenge'
import EditMap from './admin/editMap'
import './Custom.css';

const queryClient  = new QueryClient({
  defaultConfig: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false
    }
  }
});

const Header = () => {
  let { user, logout} = useAuth();
  return (
    <>
      <Link to="/"> <h1>Lord of the trips</h1> </Link>
      {!user ? <> <Link to="/login"><b>Login</b></Link> or <Link to="/signup"><b>Signup</b></Link> </> : null}
      {user ? <> Hello {user.first_name} {user.last_name}, or {user.pseudo} to call you with your pseudo <button onClick={logout}>Logout</button> </> : null}
    </>
  );
};

const Main = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <hr />
        <Switch>
          <Route exact path="/">
            <AdminChallenges />
          </Route>
          <Route path="/editchallenge/:id">
            <EditChallenge />
          </Route>
          <Route path="/editmap/:id">
            <EditMap />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Redirect to="/" />
        </Switch>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
