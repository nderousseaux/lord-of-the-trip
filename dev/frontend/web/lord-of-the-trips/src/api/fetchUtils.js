export const urlPrefix = 'https://hephaistos.nathanaelderousseaux.fr/api';
//export const urlPrefix = 'http://172.20.10.2:6543';

export const getToken = () => window.localStorage.getItem('token');

export const checkStatus = res => {
  if (res.ok) {
    return res;
  }
  else {
    return res.json()
    .then(res => { throw new Error(res.error.message); });
  }
};
