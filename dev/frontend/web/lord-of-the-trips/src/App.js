import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Konva from './konva/konva'
import AdminChallenges from './admin/challenges'

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
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Lord of the trips</h1>
        <hr />
        <AdminChallenges />
        <hr />
        <Konva />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
