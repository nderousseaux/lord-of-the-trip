import api from 'services/General.service.js';

const Auth = {
    signin(email, password){
        return api.post('login', {email, password});
    },

    signup(first_name, last_name, pseudo, email, password){
        return api.post('signup', {first_name, last_name, pseudo, email, password});
    },
}

export default Auth;