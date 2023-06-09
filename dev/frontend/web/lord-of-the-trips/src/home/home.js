import { useAuth } from '../authentication/auth';
import challengePub from './challengePub.png';
import { useStyles } from '../CustomCSS';

const HomePage = () => {
  let { user } = useAuth();
  const classes = useStyles();

  return <div className={classes.homeAlign}>
    <h1 className={classes.homeh1}>Lord of the TRIPS</h1>
    <h2 className={classes.homeh2}>Devenez le master des challenges, le roi du défi, l'empereur de l'obstacle</h2>
    <p className={classes.homep}>Le parcours est virtuel, le mouvement est réel <br></br>
    Réaliser des courses, affrontez des obstacles dans vos UNIVERS préférée</p>
    <p  className={classes.homepbold}> <b>{!user ? "Inscrivez vous, Connecter vous,... pour commencer l'aventure" : null}</b></p>
    <img src={challengePub} alt="challengePub" width='100%' height='100%'/>
    <br />
    
  </div>
};

export default HomePage;
