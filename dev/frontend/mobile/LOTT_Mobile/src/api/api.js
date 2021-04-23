const axios = require('axios');

const api = axios.create()

const apiFonctions = {

    init(server){
        api.defaults.baseURL = server;
        api.headers = {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
        };
        return api
    },

    getChallenges(){
        
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges");

        return axios.get(api.defaults.baseURL + '/challenges')
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });
    },

    getChallenge(id){
        
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges/" + id);

        return axios.get(api.defaults.baseURL + '/challenges/' + id)
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });
    },

    getChallengesNoRequest() {
        return JSON.parse('{ '+
            '"challenges": [ '+
                '{ '+
                    '"id": 1, '+
                    '"name": "A la recherche d\'Aslan", '+
                    '"description": "Fille d\'Eve et Fils d\'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous", '+
                    '"end_date": "2020-03-18T00:00:00", '+
                    '"alone_only": null, '+
                    '"level": "1", '+
                    '"scalling": 4, '+
                    '"draft": false, '+
                    '"start_crossing_point": { '+
                        '"id": 1, '+
                        '"name": "L\'armoire", '+
                        '"position_x": 0.187826, '+
                        '"position_y": 0.106112 '+
                    '}, '+
                    '"end_crossing_point": { '+
                        '"id": 8, '+
                        '"name": "La table de pierre", '+
                        '"position_x": 0.201739, '+
                        '"position_y": 0.4022 '+
                    '}, '+
                    '"segments": [ '+
                        '{ '+
                            '"id": 1, '+
                            '"name": "A travers le bois d\'entre les mondes", '+
                            '"start_crossing_point": { '+
                                '"id": 1, '+
                                '"name": "L\'armoire", '+
                                '"position_x": 0.187826, '+
                                '"position_y": 0.106112 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 2, '+
                                '"name": "La passe du faune", '+
                                '"position_x": 0.0947826, '+
                                '"position_y": 0.249145 '+
                            '}, '+
                            '"coordinates": [] '+
                        '}, '+
                        '{ '+
                            '"id": 2, '+
                            '"name": "La route d\'Ettinsmoor", '+
                            '"start_crossing_point": { '+
                                '"id": 2, '+
                                '"name": "La passe du faune", '+
                                '"position_x": 0.0947826, '+
                                '"position_y": 0.249145 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 3, '+
                                '"name": "La passe du magicien", '+
                                '"position_x": 0.417391, '+
                                '"position_y": 0.281418 '+
                            '}, '+
                            '"coordinates": [] '+
                        '}, '+
                        '{ '+
                            '"id": 3, '+
                            '"name": "La traversée du grand désert", '+
                            '"start_crossing_point": { '+
                                '"id": 2, '+
                                '"name": "La passe du faune", '+
                                '"position_x": 0.0947826, '+
                                '"position_y": 0.249145 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 3, '+
                                '"name": "La passe du magicien", '+
                                '"position_x": 0.417391, '+
                                '"position_y": 0.281418 '+
                            '}, '+
                            '"coordinates": [] '+
                        '}, '+
                        '{ '+
                            '"id": 4, '+
                            '"name": "La traversée du Grand Océan Oriental", '+
                            '"start_crossing_point": { '+
                                '"id": 5, '+
                                '"name": "Le pont des centaures", '+
                                '"position_x": 0.35913, '+
                                '"position_y": 0.580685 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 8, '+
                                '"name": "La table de pierre", '+
                                '"position_x": 0.201739, '+
                                '"position_y": 0.4022 '+
                            '}, '+
                            '"coordinates": [] '+
                        '}, '+
                        '{ '+
                            '"id": 10, '+
                            '"name": "seg 1", '+
                            '"start_crossing_point": { '+
                                '"id": 3, '+
                                '"name": "La passe du magicien", '+
                                '"position_x": 0.417391, '+
                                '"position_y": 0.281418 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 4, '+
                                '"name": "Le carrousel des ours", '+
                                '"position_x": 0.3, '+
                                '"position_y": 0.4 '+
                            '}, '+
                            '"coordinates": [ '+
                                '{ '+
                                    '"position_x": 0.40695652173913044, '+
                                    '"position_y": 0.3920385085574572 '+
                                '} '+
                            '] '+
                        '}, '+
                        '{ '+
                            '"id": 11, '+
                            '"name": "seg 2", '+
                            '"start_crossing_point": { '+
                                '"id": 4, '+
                                '"name": "Le carrousel des ours", '+
                                '"position_x": 0.3, '+
                                '"position_y": 0.4 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 5, '+
                                '"name": "Le pont des centaures", '+
                                '"position_x": 0.35913, '+
                                '"position_y": 0.580685 '+
                            '}, '+
                            '"coordinates": [] '+
                        '}, '+
                        '{ '+
                            '"id": 12, '+
                            '"name": "seg 3", '+
                            '"start_crossing_point": { '+
                                '"id": 3, '+
                                '"name": "La passe du magicien", '+
                                '"position_x": 0.417391, '+
                                '"position_y": 0.281418 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 5, '+
                                '"name": "Le pont des centaures", '+
                                '"position_x": 0.35913, '+
                                '"position_y": 0.580685 '+
                            '}, '+
                            '"coordinates": [ '+
                                '{ '+
                                    '"position_x": 0.6086956521739131, '+
                                    '"position_y": 0.3150213936430318 '+
                                '}, '+
                                '{ '+
                                    '"position_x": 0.6269565217391304, '+
                                    '"position_y": 0.5020629584352079 '+
                                '}, '+
                                '{ '+
                                    '"position_x": 0.5669565217391305, '+
                                    '"position_y": 0.6059749388753056 '+
                                '}, '+
                                '{ '+
                                    '"position_x": 0.4756521739130435, '+
                                    '"position_y": 0.6181998777506112 '+
                                '} '+
                            '] '+
                        '}, '+
                        '{ '+
                            '"id": 13, '+
                            '"name": "seg 4", '+
                            '"start_crossing_point": { '+
                                '"id": 5, '+
                                '"name": "Le pont des centaures", '+
                                '"position_x": 0.35913, '+
                                '"position_y": 0.580685 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 9, '+
                                '"name": "Cair Paravel", '+
                                '"position_x": 0.185217, '+
                                '"position_y": 0.562347 '+
                            '}, '+
                            '"coordinates": [ '+
                                '{ '+
                                    '"position_x": 0.31043478260869567, '+
                                    '"position_y": 0.6377597799511002 '+
                                '}, '+
                                '{ '+
                                    '"position_x": 0.25130434782608696, '+
                                    '"position_y": 0.6353147921760391 '+
                                '} '+
                            '] '+
                        '}, '+
                        '{ '+
                            '"id": 14, '+
                            '"name": "seg 5", '+
                            '"start_crossing_point": { '+
                                '"id": 3, '+
                                '"name": "La passe du magicien", '+
                                '"position_x": 0.417391, '+
                                '"position_y": 0.281418 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 7, '+
                                '"name": "Le nid des griffons", '+
                                '"position_x": 0.728696, '+
                                '"position_y": 0.267726 '+
                            '}, '+
                            '"coordinates": [ '+
                                '{ '+
                                    '"position_x": 0.5252173913043479, '+
                                    '"position_y": 0.2294468215158924 '+
                                '}, '+
                                '{ '+
                                    '"position_x": 0.6130434782608696, '+
                                    '"position_y": 0.2074419315403423 '+
                                '}, '+
                                '{ '+
                                    '"position_x": 0.671304347826087, '+
                                    '"position_y": 0.22211185819070906 '+
                                '} '+
                            '] '+
                        '}, '+
                        '{ '+
                            '"id": 15, '+
                            '"name": "seg 6", '+
                            '"start_crossing_point": { '+
                                '"id": 5, '+
                                '"name": "Le pont des centaures", '+
                                '"position_x": 0.35913, '+
                                '"position_y": 0.580685 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 6, '+
                                '"name": "Le pont de la sorcière", '+
                                '"position_x": 0.506957, '+
                                '"position_y": 0.722494 '+
                            '}, '+
                            '"coordinates": [ '+
                                '{ '+
                                    '"position_x": 0.3826086956521739, '+
                                    '"position_y": 0.6756570904645477 '+
                                '}, '+
                                '{ '+
                                    '"position_x": 0.4252173913043478, '+
                                    '"position_y": 0.722111858190709 '+
                                '} '+
                            '] '+
                        '} '+
                    '], '+
                    '"admin": { '+
                        '"id": 1, '+
                        '"first_name": "Missy", '+
                        '"last_name": "Of Gallifrey", '+
                        '"pseudo": "Le maitre", '+
                        '"mail": "lemaitre@gmail.com" '+
                    '}, '+
                    '"event_sum": 0 '+
                '}, '+
                '{ '+
                    '"id": 2, '+
                    '"name": "Oops, on a perdu Han Solo", '+
                    '"description": "Leia Organa, Lando Calrissian et le reste de l\'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n\'attends pas", '+
                    '"end_date": "2020-03-18T00:00:00", '+
                    '"alone_only": null, '+
                    '"level": "2", '+
                    '"scalling": 4, '+
                    '"draft": false, '+
                    '"start_crossing_point": null, '+
                    '"end_crossing_point": null, '+
                    '"segments": [], '+
                    '"admin": { '+
                        '"id": 1, '+
                        '"first_name": "Missy", '+
                        '"last_name": "Of Gallifrey", '+
                        '"pseudo": "Le maitre", '+
                        '"mail": "lemaitre@gmail.com" '+
                    '}, '+
                    '"event_sum": 0 '+
                '}, '+
                '{ '+
                    '"id": 10, '+
                    '"name": "azfg", '+
                    '"description": null, '+
                    '"end_date": null, '+
                    '"alone_only": null, '+
                    '"level": null, '+
                    '"scalling": null, '+
                    '"draft": false, '+
                    '"start_crossing_point": null, '+
                    '"end_crossing_point": null, '+
                    '"segments": [ '+
                        '{ '+
                            '"id": 5, '+
                            '"name": "seg 1", '+
                            '"start_crossing_point": { '+
                                '"id": 12, '+
                                '"name": "cr 3", '+
                                '"position_x": 0.5, '+
                                '"position_y": 0.20647 '+
                            '}, '+
                            '"end_crossing_point": { '+
                                '"id": 13, '+
                                '"name": "cr 4", '+
                                '"position_x": 0.6475, '+
                                '"position_y": 0.367873 '+
                            '}, '+
                            '"coordinates": [] '+
                        '} '+
                    '], '+
                    '"admin": { '+
                        '"id": 1, '+
                        '"first_name": "Missy", '+
                        '"last_name": "Of Gallifrey", '+
                        '"pseudo": "Le maitre", '+
                        '"mail": "lemaitre@gmail.com" '+
                    '}, '+
                    '"event_sum": 0 '+
                '} '+
            '] '+
        '}');
    },

    addEvent(idChallenge, moveType, dateDepart, distance, duree){
        let codeMove;
        switch(moveType){
            case 'marche':
                codeMove = 0;
                break;
            case 'velo':
                codeMove = 2;
                break;
            default: //Course
                codeMove = 1;
        }

        console.log("requete event : " + api.defaults.baseURL + "/challenges/1/events");

        return axios.post(api.defaults.baseURL + '/challenges/' + idChallenge + '/events', {
            "move_type": codeMove,
            "event_date":dateDepart.toISOString().slice(0,19),
            "distance":distance,
            "duration": duree
        })
        .catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

        });
    }
}

export default apiFonctions;