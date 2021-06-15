import { useState } from "react";
import { useHistory } from 'react-router-dom';
import LoginDrawer from '../authentication/LoginDrawer';
import SignupDrawer from '../authentication/SignupDrawer';
import Button from '@material-ui/core/Button';
import { useStyles } from '../CustomCSS';
import { useAuth } from '../authentication/auth';
import logo from '../logo.png';

const Header = () => {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  let { user, logout} = useAuth();
  const history = useHistory();
  return (
    <>
      <div className={ `${classes.header} ${classes.contentCenterVertical}` }>
        <img onClick={() => history.push(`/`)} className={classes.clickable} height={"100%"} src={logo} alt="Logo" /> &nbsp;
        <b>Lord of the trips</b> &nbsp; &nbsp; &nbsp;
        {!user ? <> <Button onClick={() => setOpenLogin(true)} size="large" variant="contained" color="primary" className={ `${classes.button} ${classes.colorPrimary}` }>Connexion</Button> &nbsp;
                    <Button onClick={() => setOpenSignup(true)} size="large" variant="contained" color="primary" className={ `${classes.button} ${classes.colorPrimary}` }>Inscription</Button> </>
               : null}
        {user ? <>
          Salut {user.first_name} {user.last_name}, ou {user.pseudo} pour t'appeler avec ton pseudo. {user.is_admin ? "Vous êtes un administrateur !" : null} &nbsp;
          <Button onClick={() => history.push(`/dashboard`)} size="large" variant="contained" color="primary" className={ `${classes.button} ${classes.colorPrimary}` }>Dashboard utilisateur</Button> &nbsp;
          {user?.is_admin ? <>
            <Button onClick={() => history.push(`/admindashboard`)} size="large" variant="contained" color="primary" className={ `${classes.button} ${classes.colorPrimary}` }>Dashboard administrateur</Button> &nbsp;
          </> : null}
          <Button onClick={logout} size="large" variant="contained" color="secondary" className={ `${classes.button} ${classes.colorSecondary}` }>DÉCONNEXION</Button>
        </> : null}
      </div>
      <LoginDrawer openState={openLogin} setOpenState={setOpenLogin} setOpenSignup={setOpenSignup} />
      <SignupDrawer openState={openSignup} setOpenState={setOpenSignup} setOpenLogin={setOpenLogin} />
    </>
  );
};

export default Header;
