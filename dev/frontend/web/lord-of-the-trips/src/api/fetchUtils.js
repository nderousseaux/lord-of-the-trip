export const urlPrefix = 'https://hephaistos.nathanaelderousseaux.fr/api';

export const checkStatus = res => {
  if (res.ok) {
    return res;
  }
  else {
    return res.json()
    .then(res => { throw new Error(res.error.message); });
  }
};
