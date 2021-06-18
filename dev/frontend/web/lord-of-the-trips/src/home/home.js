import { useAuth } from '../authentication/auth';
import challengePub from './challengePub.png';
import { useStyles } from '../CustomCSS';

const HomePage = () => {
  let { user } = useAuth();
  const classes = useStyles();

  return <div className={classes.homeAlign}>
    <h1 font-size="50px">Lord of the TRIPS</h1>
    <h2 font-size="40px">Devenez le master des challenges, le roi du dfi, l'empereur de l'obstacle</h2>
    <p font-size="35px">Le parcours est virtuel, le mouvement est réel <br></br>
    Réaliser des courses, affrontez des obstacles dans vos UNIVERS préférée</p>
    <img src={challengePub} alt="challengePub" width='100%' height='100%'/>
    <br />
    {!user ? "Connecter vous pour commencer l'aventure" : null}
  </div>
};

export default HomePage;
