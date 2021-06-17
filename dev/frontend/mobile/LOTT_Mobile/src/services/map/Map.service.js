import api from 'services/General.service.js';

let mapServices = {
    getMapBackgroundImage(idChallenge) {
        return api.get('/challenges/'+ idChallenge +'/image-mobile');
    }
}

export default mapServices;
