import { useAuth } from '../authentication/auth';
import challengePub from './challengePub.png';

const HomePage = () => {
  let { user } = useAuth();

  return <div>
    <h2>Home page</h2>
    <p>This is the beautiful advertising page !!!</p>
    <p>Do run on challenges, for example a challenge in Narnia universe.</p>
    <img src={challengePub} alt="challengePub" width='575px' height='409px'/>
    <br />
    {!user ? "Log in to start the adventure" : null}
  </div>
};

export default HomePage;
