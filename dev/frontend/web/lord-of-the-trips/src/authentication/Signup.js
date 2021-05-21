import { useState } from 'react';
import { useAuth } from './auth';

let Signup = () => {
  let [first_name, setFirst_name] = useState('');
  let [last_name, setLast_name] = useState('');
  let [pseudo, setPseudo] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');
  let { signup } = useAuth();

  let handleSubmit = e => {
    e.preventDefault();
    signup(first_name, last_name, pseudo, email, password)
    .catch(error => {
      setMessage(error.message);
    });
  };

  return <div>
    <h1>Signup</h1>
    <form onSubmit={handleSubmit}>
      <label>First name : </label>
      <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} autoFocus /> <br />
      <label>Last name : </label>
      <input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} /> <br />
      <label>Pseudo : </label>
      <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} /> <br />
      <label>Email : </label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} size="50" /> <br />
      <label>Password : </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
      <button>Submit</button>
    </form>
    { message ? <p>{message}</p> : null}
  </div>;
}

export default Signup;
