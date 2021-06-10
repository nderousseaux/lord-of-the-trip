import AuthService from "services/auth/Auth.service.js";
import { AlertHelper } from "helpers/AlertHelper.js";
import { getChallenges } from 'helpers/ChallengesHelper.js'


export function signup(setLoading, onSuccess, firstName, lastName, pseudo, login, password) {
    setLoading(true)

    AuthService.signup(firstName, lastName, pseudo, login, password)
    .then(() => onSuccess())
    .catch((err) => {
        console.log(err)
        let msg;

        if (err.response != undefined){
            switch(err.response.status){
            case 400:
                msg = err.response.data.message
                break;
            default:
                msg = "Une erreur inconne c'est produite."
            }
        }
        else{
            console.log(err)
            msg = "Le réseau est indisponible."
        }
        AlertHelper.show("error", "Erreur !", msg)
    })
    .finally(() => {
        setLoading(false)
    })  
}

export function signin(setLoading, onSuccess, login, password, dispatchChallenges){
    setLoading(true)

    AuthService.signin(login, password)
      .then((res) => res.data)
      .then((data) => {
        onSuccess(data)
      })
      .then(() => {
        getChallenges(dispatchChallenges, undefined)
      })
      .catch((err) => {
        console.log(err)
        let msg;

        if (err.response != undefined){
          switch(err.response.status){
            case 401:
              msg = "Le nom d'utilisateur ou le mot de passe saisi est incorrect."
              break;
            default:
              msg = "Une erreur inconne c'est produite."
          }
        }
        else{
          console.log(err)
          msg = "Le réseau est indisponible."
        }
        AlertHelper.show("error", "Erreur !", msg)
      })
      .finally(() => {
        setLoading(false)
      })
}