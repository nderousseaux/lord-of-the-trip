import { useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../CustomCSS';
import { useAuth } from '../authentication/auth';
import logo from '../logo.png';

const LoginDrawer = ({ openState, setOpenState, setOpenSignup }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('lemaitre@gmail.com');
  const [password, setPassword] = useState('Conquérantdelunivers');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  let handleSubmit = e => {
    e.preventDefault();
    login(email, password)
    .then( () => {
      closeDrawer();
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
              <h2 className={classes.textCenter}>Connectez-vous pour vivre des aventures épiques</h2>
              <form onSubmit={handleSubmit}>
                <TextField variant="outlined" margin="dense" type="text" label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                <TextField variant="outlined" margin="dense" type="password" label="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                <Button type="submit" size="small" variant="contained" color="primary" className={ `${classes.margin10vertical} ${classes.colorPrimary}` } fullWidth>Se connecter</Button>
                { message ? <p>{message}</p> : null }
              </form>
            </div>
            <div className={ `${classes.textCenter} ${classes.margin10vertical}` }><p >Nouveau ? <Button onClick={() => {closeDrawer(); setOpenSignup(true)}} size="small" variant="contained" color="primary" className={classes.colorPrimary} style={{textTransform: 'none'}}>Créer un compte</Button></p></div>
          </Grid>
        </div>
      </Drawer>
    </div>
  );
}

export default LoginDrawer;
