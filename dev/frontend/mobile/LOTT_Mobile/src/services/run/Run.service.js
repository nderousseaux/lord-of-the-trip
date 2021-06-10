import api from 'services/General.service.js';

let runService = {
    getLastEvent(id){
        return api.get('/challenges/'+ id +'/events/last')
    }
}

export default runService;