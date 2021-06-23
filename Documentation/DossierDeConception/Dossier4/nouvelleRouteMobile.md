Le projet utilise `axios-react-native` pour communiquer avec l'api. Toute la configuration de axios se trouve dans le fichier `src/services/General.service.js`.

## Ajouter la variable d'environnement

A la racine du projet mobile, se trouve un fichier `.env.example`. Il faut le copier et le renommer `.env`. Remplir ensuite la valeur de `API_URL` par l'URL de l'api.

## Ajouter de nouvelles routes

Dans le dossier services se trouve plusieurs autres fichiers rangeants les appels à l'api de manière choérente (authentification, map, events...). Pour ajouter une route à l'un de ces fichiers, il suffit d'ajouter une fonction à ces dossiers

**Exemples :**

```javascript
//GET
getChallenges(){
        return api.get('/challenges')
},

//POST
postChallenges(id, data){
        return api.post("/challenges/"+id, data)
}
```

### Créer un nouveau service

Si votre appel ne peut être rangé dans une des catégorie déjà existante, il convient de créer une nouvelle catégorie. Pour cela, il suffit de créer un fichier dans le dossier `/src/services`. Et de lui donner la structure suivante.

```javascript
import api from 'services/General.service.js';

let nouveauService = {
    getAllItems(){
        return api.get('nouveauService');
    },

        ...

}

export default nouveauService;
```

## Utiliser les ressources axios

Pour utiliser les ressources axios, on importe le bon fichier de `/src/services` et on utilise simplement la fonction comme un fetch.

**Exemple :**

```javascript
api.getChallenges()
        .then((response) => response.data)
        .then((json) => setChallenges(json.challenges))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
```

## Documentation axios

La documentation axios se trouve [ici](https://axios-http.com/docs/intro/)
