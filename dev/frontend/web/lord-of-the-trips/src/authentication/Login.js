import { useState } from 'react';
import { useAuth } from './auth';

let Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');
  let { login } = useAuth();

  let handleSubmit = e => {
    e.preventDefault();
    login(email, password)
    .catch(error => {
      setMessage(error.message);
    });
  };

  return <div>
    <h1>Connexion</h1>
    <form onSubmit={handleSubmit}>
      <label>Email : </label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} size="50" autoFocus /> <br />
      <label>Mot de passe : </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
      <button>Se connecter</button>
    </form>
    { message ? <p>{message}</p> : null}
  </div>;
}

export default Login;
