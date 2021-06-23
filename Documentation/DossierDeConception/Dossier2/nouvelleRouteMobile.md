Le projet utilise `axios-react-native` pour communiquer avec l'api. Toute la configuration de axios se trouve dans le fichier `src/api/api.js`.

## Ajouter la variable d'environnement

A la racine du projet mobile, se trouve un fichier `.env.example`. Il faut le copier et le renommer `.env`. Remplir ensuite la valeur de `API_URL` par l'URL de l'api.

## Ajouter de nouvelles routes

Dans le fichier `src/api/api.js`, se trouve une variable `apiFunctions`, elle recense toutes les fonctions d'appel à l'api. 

Pour en créer une, il suffit de l'ajouter, puis de faire appel à l'objet `api`.

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

## Utiliser les ressources axios

Pour utiliser les ressources axios, on importe `api` de `/src/api/api.js` et on utilise simplement la fonction comme un fetch.

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