import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './authentication/auth';
import Header from './home/header';
import Routes from './home/routes';
import './Custom.css';

const queryClient  = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

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
