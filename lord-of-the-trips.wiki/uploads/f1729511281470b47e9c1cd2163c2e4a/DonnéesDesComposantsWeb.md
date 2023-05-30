# Données des composants (state) pour le client web, Sprint 2

API Doc pour les routes : [Documentation API](https://hephaistos.nathanaelderousseaux.fr/apidoc/)

## fichier challenges.js :

Page d'accueil, liste des challenges de l'utilisateur admin, formulaire de création d'un challenge.

#### Composant AdminChallenges :

- useQuery `GET /api/challenges`
  - isLoading : true ou false.
  - isError : true ou false.
  - error : réponse erreur de l'API en json.
  - challenges : liste des challenges renvoyés par l'API.

#### Composant CreateChallengeForm :

- name : "le nom"
- error : le résultat de la requête en cas d'erreur pour créer le challenge : `POST /api/challenges`

## Fichier editChallenge.js :

Modifier les informations du challenge (nom, description, ...) et choisir son image pour le parcours.

#### Composant EditChallenge :

- id : 1 -> id du challenge récupéré dans la route de la page.

- useQuery `GET /api/challenges/:id`
  - error : réponse erreur de l'API en json
  - challenge : informations du challenge renvoyé par l'API

- name : "le nom"
- description : "la description"
- scalling : l'échelle -> l'échelle correspond à la longueur horizontale de la carte en mètre.
- errorUpdate : le résultat de la requête en cas d'erreur pour modifier le challenge : `PUT /api/challenges/:id`
- aMapUploaded : true ou false, pour savoir si une carte a été téléchargé pour le challenge.
- newUpload : true ou false, pour savoir si la carte vient d'être changé.

#### Composant UploadMap :

- errorUploadClient : true ou false -> Affiche un message d'erreur "Invalid file uploaded" géré coté client quand l'utilisateur choisit un fichier qui n'est pas une image.
- errorUploadServer : Le résultat de la requête en cas d'erreur pour upload l'image : `POST /api/challenges/:id/image`
- successUpload : true ou false.

#### Composant DownloadMap :

- errorDownload : Le résultat de la requête en cas d'erreur pour download l'image : `GET /api/challenges/:id/image`

- successDownload : true ou false.
- file : Le fichier image en blob renvoyé par l'API.

## Fichier editMap.js :

Dessiner le parcours du challenge sur la carte (points de passages, segments, départ et arrivé)

#### Composant EditMap :

- id : 1 -> id du challenge récupéré dans la route de la page.

- useQuery `GET /api/challenges/:id`
  - errorChallenge : réponse erreur de l'API en json
  - challenge : informations du challenge renvoyé par l'API

- useQuery `GET /api/challenges/:challenge_id/crossing-points`
  - crossingPointsRequest : Points de passages du challenge renvoyé par l'API

- useQuery `GET /api/challenges/:challenge_id/segments`
  - segmentsRequest: Segments du challenge renvoyé par l'API

- errorDownload : Le résultat de la requête en cas d'erreur pour download l'image : `GET /api/challenges/:id/image`

- successDownload : true ou false.
- image : L'image déjà chargé pour l'afficher avec Konva.
- width : 800 -> Longueur de l'image en pixels.
- height : 570 -> Hauteur de l'image en pixels.
- radioButtonValue : "valeur" : La valeur du bouton radio sélectionné dans le menu (Placer un point, choisir le départ, ...).
- crossingPoints : Points de passages formatées côté client pour l'affichage sur la carte :

```json
[
    {
        "id": 10,
        "position_x": 182.00015000000002,
        "position_y": 247.687128,
        "name": "cr 1",
        "isDragging": false,
        "isStartChallenge": true,
        "isEndChallenge": false,
        "onMouseOver": false
    },
    {
        "id": 11,
        "position_x": 421.00005,
        "position_y": 135.687386,
        "name": "cr 2",
        "isDragging": false,
        "isStartChallenge": false,
        "isEndChallenge": false,
        "onMouseOver": false
    },
    ...
]
```

- idCrossingPoints : 1 -> id auto incrémenté pour donné un nom unique a chaque point à leur création : "cr 1", "cr 2", ...

- crossingPointsLoaded : true ou false, si les points sont chargés dans le state, pour lancer le traitement pour dire quelle point est le départ ou l'arrivé.

- segments: Segments formatés côté client pour l'affichage sur la carte :

```json
[
    {
        "id": 6,
        "start_crossing_point_id": 11,
        "end_crossing_point_id": 12,
        "name": "seg 2",
        "coordinates": [
            {
                "position_x": 529,
                "position_y": 203.6875
            },
            {
                "position_x": 586,
                "position_y": 259.6875
            }
        ],
        "onMouseOver": false
    },
    {
        "id": 7,
        "start_crossing_point_id": 11,
        "end_crossing_point_id": 14,
        "name": "seg 3",
        "coordinates": [],
        "onMouseOver": false
    },
    ...
]
```

- idSegments : 1 -> id auto incrémenté pour donné un nom unique a chaque segment à leur création : "seg 1", "seg 2", ...

- drawingSegment : segment en cours de tracé sur la carte qui sera envoyé à l'API quand il sera complet :

```json
{
    "start_crossing_point_id": 12,
    "end_crossing_point_id": null, // -> Ce segment n'a pas encore de point d'arrivé
    "coordinates": [
        {
            "position_x": 582,
            "position_y": 382.6875
        },
        {
            "position_x": 681,
            "position_y": 453.6875
        }
    ],
    "onMouseOver": false
}
```

