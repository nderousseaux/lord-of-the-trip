import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
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

const App = () => {

  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
      <Link to="/"> <h1>Lord of the trips</h1> </Link>
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
          <Redirect to="/" />
        </Switch>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
