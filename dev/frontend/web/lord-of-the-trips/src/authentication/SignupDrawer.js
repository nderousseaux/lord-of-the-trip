import { useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../CustomCSS';
import { useAuth } from '../authentication/auth';
import logo from '../logo.png';

const SignupDrawer = ({ openState, setOpenState, setOpenLogin }) => {
  const classes = useStyles();
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { signup } = useAuth();

  let handleSubmit = e => {
    e.preventDefault();
    signup(first_name, last_name, pseudo, email, password)
    .then( () => {
      closeDrawer();
      setFirst_name('');
      setLast_name('');
      setPseudo('');
      setEmail('');
      setPassword('');
      setMessage('');
    })
    .catch(error => {
      setMessage(error.message);
    });
  };

  const closeDrawer = () => {
    setOpenState(false);
  };

  return (
    <div>
      <Drawer anchor={'right'} open={openState} onClose={closeDrawer} classes={{ paper: classes.drawer }}>
        <div>
          <Grid container direction="column" alignItems="center" justify="center" className={classes.drawerGrid}>
            <img width={"80%"} src={logo} alt="Logo" />
            <div className={classes.width80}>
              <h2 className={classes.textCenter}>Rejoignez-nous et vivez des aventures épiques !</h2>
              <form onSubmit={handleSubmit}>
                <TextField variant="outlined" margin="dense" type="text" label="Prénom" value={first_name} onChange={e => setFirst_name(e.target.value)} fullWidth />
                <TextField variant="outlined" margin="dense" type="text" label="Nom" value={last_name} onChange={e => setLast_name(e.target.value)} fullWidth />
                <TextField variant="outlined" margin="dense" type="text" label="Pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} fullWidth />
                <TextField variant="outlined" margin="dense" type="text" label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                <TextField variant="outlined" margin="dense" type="password" label="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                <Button type="submit" size="small" variant="contained" color="primary" className={ `${classes.margin10vertical} ${classes.colorPrimary}` } fullWidth>S'inscrire</Button>
                { message ? <p>{message}</p> : null }
              </form>
            </div>
            <div className={ `${classes.textCenter} ${classes.margin10vertical}` }><p >Déjà un compte ? <Button onClick={() => {closeDrawer(); setOpenLogin(true)}} size="small" variant="contained" color="primary" className={classes.colorPrimary} style={{textTransform: 'none'}}>Connecter vous</Button></p></div>
          </Grid>
        </div>
      </Drawer>
    </div>
  );
}

export default SignupDrawer;
