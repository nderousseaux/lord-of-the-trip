import { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { checkStatus, urlPrefix, getToken } from '../api/fetchUtils';

let AuthContext = createContext();

export let AuthProvider = ({children}) => {
  let [user, setUser] = useState(null);
  let [userCheck, setUserCheck] = useState(false);

  const history = useHistory();

  let login = (email, password) => {
    return fetch(`${urlPrefix}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(data => {
      setUser(data.user);
      window.localStorage.setItem('token', data.token);
      history.push("/");
    });
  };

  let logout = () => {
    setUser(null);
    window.localStorage.removeItem('token');
    history.push("/");
  }

  let signup = (first_name, last_name, pseudo, email, password) => {
    return fetch(`${urlPrefix}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, pseudo, email, password })
    })
    .then(checkStatus)
    .then(() => {
      history.push("/login");
    });
  };

  useEffect(() => {
    fetch(`${urlPrefix}/whoami`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(user => {
      setUser(user);
      setUserCheck(true);
    })
    .catch(() => {
      setUser(null);
      setUserCheck(true);
    });
  }, []);

  return !userCheck ? "Checking authentication..." :
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
};

export let useAuth = () => useContext(AuthContext);
