import { useAuth } from '../authentication/auth';
import challengePub from './challengePub.png';

const HomePage = () => {
  let { user } = useAuth();

  return <div>
    <h2>Page d'accueil</h2>
    <p>Bienvenue sur la superbe page de pub !!!</p>
    <p>Faites des courses sur des challenges, par exemple un challenge dans l'univers de Narnia</p>
    <img src={challengePub} alt="challengePub" width='575px' height='409px'/>
    <br />
    {!user ? "Connecter vous pour commencer l'aventure" : null}
  </div>
};

export default HomePage;
