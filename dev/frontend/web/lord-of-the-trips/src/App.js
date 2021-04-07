import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Konva from './konva/konva'
import AdminChallenges from './admin/challenges'
import EditChallenge from './admin/editChallenge'
import EditMap from './admin/editMap'

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
      <h1>Lord of the trips</h1>
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
          <Route path="/konva">
            <Konva />
          </Route>
          <Redirect to="/" />
        </Switch>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
