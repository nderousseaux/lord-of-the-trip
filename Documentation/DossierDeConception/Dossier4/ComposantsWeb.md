# Données des composants (props et state) pour le client web, Sprint 4

- Ce fichier détail les données par composants, pour une vision globale des composants ainsi qu'une brève explication, [hierarchie des composants](https://git.unistra.fr/acrobatt-1/lord-of-the-trips/-/blob/master/Documentation/DocumentationTechnique/WEB%20Documentation.md#architecture-des-fichiers-et-des-composants).
- API Doc pour les routes : [Documentation API](https://hephaistos.nathanaelderousseaux.fr/apidoc/), séléctionnez la version 0.3 pour avoir toutes les dernières routes.
- La librairie [ReactQuery](https://react-query.tanstack.com/) est utilisé, quand les données stockés sont celles renvoyées par l'API, je mettrai le lien de la route dans la documentation API.
- ReactQuery permet d'avoir des données sur le statut des requêtes comme :
  - isLoading : Permet de savoir si la requête est terminée.
  - isError : Une fois la requête terminée, permet de savoir si la réponse est une erreur.
  - error : Si c'est une erreur et qu'il y a une réponse de l'API, les données de l'erreur, souvent un message.
  - data : le JSON de réponse de la requête en cas de succès.
isLoading, isError et error fonctionne toujours de la même façon, je mettrai juste le lien vers le json stocké dans data

**NB : les liens vers la documentation des routes de l'API ne fonctionne que pour les routes présentent à la v1 de la doc API, donc certains fonctionnent et d'autres non. Quand je n'ai pas mis le JSON c'est que le lien est bon, quand j'ai mis le JSON c'est que le lien ne redirige pas au bon endroit de la doc API.**

## Dossier authentication

#### Composant AuthProvider (Fichier auth.js) :

state :
  - user : Les données de l'utilisateur, objet user de la [route User's Authentication](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Authentication-Login)
  ```json
  {
    "user": {
      "first_name": "Missy",
      "last_name": "Of Gallifrey",
      "pseudo": "LeMaitre",
      "email": "lemaitre@gmail.com",
      "is_admin": false
    }
  }
  ```
  - userCheck : Loading de la requête de login.


#### Composant LoginDrawer :

props :
  - openState, setOpenState : pour dire si le drawer de connexion est ouvert ou non
  - setOpenSignup : pour ouvrir ou fermer le drawer d'inscription

state :
  - email, password : les champs email et password du formulaire
  - message : Le message d'erreur en cas d'erreur de la requête de connexion


#### Composant SignupDrawer :

props :
  - openState, setOpenState : pour dire si le drawer de d'inscription est ouvert ou non
  - setOpenLogin : pour ouvrir ou fermer le drawer de connexion

state :
  - first_name, last_name, pseudo, email, password : les champs du formulaire
  - message : Le message d'erreur en cas d'erreur de la requête d'inscription


## Dossier home

#### Composant Header :

state :
  - openLogin, openSignup : Pour ouvrir et fermer les drawers login et signup
  - user : Les données de l'utilisateur, objet user de la [route User's Authentication](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Authentication-Login)
  ```json
  {
    "user": {
      "first_name": "Missy",
      "last_name": "Of Gallifrey",
      "pseudo": "LeMaitre",
      "email": "lemaitre@gmail.com",
      "is_admin": false
    }
  }
  ```


#### Composant Home :

- Rien de spécial si ce n'est les données user, toujours les mêmes : [route User's Authentication](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Authentication-Login)
```json
  {
    "user": {
      "first_name": "Missy",
      "last_name": "Of Gallifrey",
      "pseudo": "LeMaitre",
      "email": "lemaitre@gmail.com",
      "is_admin": false
    }
  }
  ```


#### Composant Route :

- Pas de state, gère le routage dans l'application


## Dossier user

#### Composant SubscribedChallenges (fichier dashboard.js) :

state :
  - subscribedChallenge : Liste des challenges où l'utilisateur est inscrit : [route all challenges where user is subscribed or not subscribed to](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-UserChallenges)
  ```json
  {
    "challenges": [
      {
        "id": 1,
        "name": "A la recherche d'Aslan",
        "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2021-03-18T12:00:00",
        "level": "1",
        "scalling": 2,
        "step_length": 0.7,
        "draft": true,
        "start_crossing_point_id": 1,
        "end_crossing_point_id": 1,
        "nb_subscribers": 12
      },
      {
        "id": 2,
        "name": "Oops, on a perdu Han Solo",
        "description": "Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2022-03-18T18:30:00",
        "level": "2",
        "scalling": 4200,
        "step_length": 0.8,
        "draft": true,
        "start_crossing_point_id": 4,
        "end_crossing_point_id": 5,
        "nb_subscribers": 12
      }
    ]
  }
  ```


#### Composant FinishChallenges (fichier dashboard.js) :

state :
  - subscribedChallenge : Liste des challenges où l'utilisateur est inscrit : [route all challenges where user is subscribed or not subscribed to](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-UserChallenges)
  ```json
  {
    "challenges": [
      {
        "id": 1,
        "name": "A la recherche d'Aslan",
        "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2021-03-18T12:00:00",
        "level": "1",
        "scalling": 2,
        "step_length": 0.7,
        "draft": true,
        "start_crossing_point_id": 1,
        "end_crossing_point_id": 1,
        "nb_subscribers": 12
      },
      {
        "id": 2,
        "name": "Oops, on a perdu Han Solo",
        "description": "Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2022-03-18T18:30:00",
        "level": "2",
        "scalling": 4200,
        "step_length": 0.8,
        "draft": true,
        "start_crossing_point_id": 4,
        "end_crossing_point_id": 5,
        "nb_subscribers": 12
      }
    ]
  }
  ```


#### Composant ChallengeCard :

"Carte" d'un challenge où l'utilisateur est inscrit

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)

state :
  - image : L'image du challenge


#### Composant ChallengeCardAvailable :

"Carte" d'un challenge où l'utilisateur peut s'inscrire

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)


#### Composant ChallengesAvailable / ChallengesAvailableList :

state :
  - notSubscribedChallenges : Liste des challenges où l'utilisateur peut s'inscrire : [route all challenges where user is subscribed or not subscribed to](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-UserChallenges)
  ```json
  {
    "challenges": [
      {
        "id": 1,
        "name": "A la recherche d'Aslan",
        "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2021-03-18T12:00:00",
        "level": "1",
        "scalling": 2,
        "step_length": 0.7,
        "draft": true,
        "start_crossing_point_id": 1,
        "end_crossing_point_id": 1,
        "nb_subscribers": 12
      },
      {
        "id": 2,
        "name": "Oops, on a perdu Han Solo",
        "description": "Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2022-03-18T18:30:00",
        "level": "2",
        "scalling": 4200,
        "step_length": 0.8,
        "draft": true,
        "start_crossing_point_id": 4,
        "end_crossing_point_id": 5,
        "nb_subscribers": 12
      }
    ]
  }
  ```


#### Composant ChallengeInfo :

Affichage des informations d'un challenge

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)


#### Composant ChallengeMap :

Affichage de la carte et du parcours du challenge

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)
  - isAdmin : permet l'affichage d'une modals pour les informations de l'obstacle si isAdmin = true

state : les states sont communs avec le composant EditMap, je vais détailler ces states dans l'explication de ce composant


#### Composants modal CrossingPoint / Segment / Obstacle :

props :
  - openState, setOpenState : pour dire si la modale est ouverte ou non
  - crossingPointObject / segmentObject / obstacleObject : un objet [Crossing Point](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-CrossingPoint-GetCrossingPoints) / [Segment](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Segment-GetSegments) / [Obstacle](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Obstacle-GetObstaclesByChallenge)

  ```json
  //Crossing gPoint
  {
    "id": 1,
    "name": "L'armoire",
    "position_x": 0.1,
    "position_y": 0.1
  }
  ```

  ```json
  //Segment
  {
    "id": 1,
    "name": "A travers le bois d'entre les mondes",
    "start_crossing_point": {
      "id": 1,
      "name": "L'armoire",
      "position_x": 0.1,
      "position_y": 0.1
    },
    "end_crossing_point": {
      "id": 2,
      "name": "La passe du faune",
      "position_x": 0.2,
      "position_y": 0.2
    },
    "coordinates": []
  }
  ```

  ```json
  //Obstacle
  {
    "id": 1,
    "label": "Quelle est le vrai nom de la sorcière blanche ?",
    "progress": 50.0,
    "description": null,
    "question_type": 0,
    "result": "Jadis",
    "segment_id": 1
  }
  ```


#### Composant UserchallengeEvents :

Affichage des évènements de l'utilisateur

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)

state :
  - events : Liste des évènemens de l'utilisateur sur le challenge. [Request events informations of challenge's id](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Event-GetEvents)
  ```json
  {
    "events": [
        {
        "id": 1013,
        "segment_id": 195,
        "duration": 11864,
        "move_type": 1,
        "event_type_id": 3,
        "event_type_info": {
            "id": 3,
            "code": "MOVE",
            "label": "Déplacement"
        },
        "event_date": "2021-06-18T18:58:11",
        "distance": 8,
        "footstep": null,
        "obstacle_id": null,
        "response": null
        },
        {
        "id": 1010,
        "segment_id": 195,
        "duration": 1234748,
        "move_type": 1,
        "event_type_id": 3,
        "event_type_info": {
            "id": 3,
            "code": "MOVE",
            "label": "Déplacement"
        },
        "event_date": "2021-06-18T15:46:36",
        "distance": 6154,
        "footstep": null,
        "obstacle_id": null,
        "response": null
        },
        {
        "id": 981,
        "segment_id": 195,
        "duration": null,
        "move_type": null,
        "event_type_id": 1,
        "event_type_info": {
            "id": 1,
            "code": "START",
            "label": "Départ du parcours"
        },
        "event_date": "2021-06-18T15:25:59",
        "distance": null,
        "footstep": null,
        "obstacle_id": null,
        "response": null
        }
    ]
  }
  ```


#### Composant UserchallengeStatisticals :

Affichage des évènements de l'utilisateur

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)

state :
  - statisticals : Liste des statistiques de l'utilisateur sur le challenge. [Request statistics for challenge id where user is subsribed to](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Statistic-StatisticsChallengeId)
  ```json
  {
    "statistics": {
      "distance": 6162,
      "time": 371582.691999,
      "average_move_type": 1,
      "results": {
        "1": {
          "distance": 6162,
          "time": 1246612
        }
      },
      "subscribe_date": "18/06/2021",
      "date_finished_challenge": null
    }
  }
  ```


#### Composants ViewFinishChallenge / ViewNotSubscribedChallenge / ViewSubscribedChallenge :

Affichage du challenge à l'utilisateur selon son état sur celui ci (non inscrit, inscrit, fini)

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)


## Dossier admin

#### Composant AdminDashboard

state :
  - value : permet de changer entre l'onglet dashboard et l'onglet validation manuel des obstacles


#### Composant CreateChallengeForm (fichier dashboard.js) :

Formulaire pour créer un challenge

state :
  - name : le nom du challenge à créer
  - error : le résultat de la requête en cas d'erreur pour créer le challenge : [Create a new Challenge](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-PostChallenge)


#### Composant EditableChallenges (fichier dashboard.js) :

Affiche la liste des challenges modifiables par l'admin

state :
  - editableChallenges : Liste des challenges modifiables [route Request all challenges that were created by user](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-AdminChallenges) (?draft=true)
  ```json
  {
    "challenges": [
      {
        "id": 1,
        "name": "A la recherche d'Aslan",
        "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2021-03-18T12:00:00",
        "level": "1",
        "scalling": 2,
        "step_length": 0.7,
        "draft": true,
        "start_crossing_point_id": 1,
        "end_crossing_point_id": 1,
        "nb_subscribers": 0
      },
      ...
    ]
  }
  ```


#### Composant PublishedChallenges (fichier dashboard.js) :

Affiche la liste des challenges publiés par l'admin

state :
  - publishedChallenges : Liste des challenges publiés [route Request all challenges that were created by user](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-AdminChallenges) (?draft=false)
  ```json
  {
    "challenges": [
      {
        "id": 2,
        "name": "Oops, on a perdu Han Solo",
        "description": "Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
        "start_date": "2021-05-27T10:12:52",
        "end_date": "2022-03-18T18:30:00",
        "level": "2",
        "scalling": 4200,
        "step_length": 0.8,
        "draft": false,
        "start_crossing_point_id": 4,
        "end_crossing_point_id": 5,
        "nb_subscribers": 12
      },
      ...
    ]
  }
  ```


#### Composant ValidateObstacles :

Affiche la liste des obstacles à valider manuellement par l'admin

props :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)

state :
  - events : Liste des propositions d'obstacles : [route All responses sent by users to be verified by user](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Event-GetEvents)
  ```json
  {
    "events": [
      {
        "id": 44,
        "response": image en base64,
        "challenge": {
          "id": 13,
          "name": "Narnia"
        },
        "obstacle": {
          "label": "Photo",
          "description": "Une photo"
        }
      },
      ...
    ]
  }
  ```


#### Composant ObstacleValidCard :

"Carte" d'un obstacle à valider

props :
  - event : une proposition d'obstacle


#### Composant AdminViewChallenge :

Affichage d'un challenge publié à un admin

state :
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)
  - user : La liste des utilisateurs inscrits au challenge : [Request all subscribers of a challenge](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-User-GetSubscribers)
  ```json
  {
    "subscribers": [
      {
        "first_name": "Bilbo",
        "last_name": "Baggins",
        "pseudo": "ring_bearer",
        "email": "littlehobbit@yahoo.com",
        "is_admin": false
      },
      {
        "first_name": "Daenerys",
        "last_name": "Targaryen",
        "pseudo": "motherOfDragons",
        "email": "d.targaryen@gmail.com",
        "is_admin": true
      }
    ]
  }
  ```


#### Composant EditChallenge

Modifier les informations du challenge (nom, description, ...) et choisir son image pour le parcours.

state :
  - id : int -> id du challenge récupéré dans la route de la page.
  - name, description, limitTime, start_date, end_date, scalling, level, step_length : données du formulaire de modification d'un challenge
  - errorUpdate : le résultat de la requête en cas d'erreur pour modifier le challenge : [Update a challenge](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-PutChallenge)
  - publishResponse : les données de la requête pour publier un challenge : [Publication of challenge](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-PublishChallenge) (réponse http 204 = OK, sinon réponse http 4XX avec message d'erreur)
  ```json
  {
    "error": {
      "status": "FORBIDDEN",
      "message": "You do not have permission to publish a challenge that has no description."

      //other messages exemple
      "message": "You do not have permission to publish a challenge whose start date has already passed (10-05-2021, 19:04)."
      "message": "You do not have permission to publish a challenge whose end date has already passed (10-05-2021, 19:04)."
    }
  }
  ```
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)
  - image : L'image du challenge


#### Composant UploadMap :

- errorUploadClient : true ou false -> Affiche un message d'erreur "Invalid file uploaded" géré coté client quand l'utilisateur choisit un fichier qui n'est pas une image.
- errorUploadServer : Le résultat de la requête en cas d'erreur pour upload l'image : [Upload a challenge's map](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-PostChallengeImage)


#### Composant EditMap :

Dessiner le parcours du challenge sur la carte (points de passages, segments, départ, arrivé, obstacles)

- id : int -> id du challenge récupéré dans la route de la page.

- challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)

- crossingPointsRequest : Points de passages du challenge renvoyé par l'API : [Request all crossing points informations of challenge's id](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-CrossingPoint-GetCrossingPoints)

- segmentsRequest: Segments du challenge renvoyé par l'API : [Request all segments informations of challenge's id](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Segment-GetSegments)

- obstaclesRequest: Obstacles du challenge renvoyé par l'API : [Request all obstacles informations of challenge's id](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Obstacle-GetObstaclesByChallenge)

- errorDownload : Le résultat de la requête en cas d'erreur pour download l'image : `GET /api/challenges/:id/image`
- successDownload : true ou false si l'image s'est bien télécharger.
- image : L'image déjà chargé pour l'afficher avec Konva.
- baseWidth : 800 -> Longueur original de l'image en pixels.
- baseHeight : 570 -> Hauteur original de l'image en pixels.
- width : Longueur d'affichage de l'image à l'utilisateur en fonction du zoom.
- height : Hauteur d'affichage de l'image à l'utilisateur en fonction du zoom.
- radioButtonValue : "valeur" : La valeur du bouton radio sélectionné dans le menuDrawer (Placer un point, choisir le départ, ...).
- zoom : zoom de la carte (entre 30% et 400% environ)
- minZoom et maxZoom : Bornes pour limité le zoom, change en fonction de la taille de base de la carte en pixels, exemple : minZoom = 30, maxZoom = 400
- responseVerify : Données de la requête de vérification du graphe du parcours : [Verification of graph integrity](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-VerifyChallenge)

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

- segmentsLoaded : true ou false, si les segments sont chargés dans le state, pour lancer le placement des obstacles.

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

- obstacles formatés côté client pour l'affichage sur la carte. Les données sont les mêmes que ceux renvoyées par l'API, sauf que j'y ajoute une position en pixels sur la carte (calcul avec les données du segment et le progress)

- dataForModal : Les données à transmettre aux modales de points / segments / obstacles. C'est un objet CrossingPoint, Segment ou Obstacle.
- openCrossingPointModal / openSegmentModal / openObstacleModal : Booléen qui dit si les modales sont ouvertes ou non


#### Composant VerifyChallenge (fichier editMap.js) :

Analyse les données de la requête de vérification pour dire si le parcours est valide ou non.

props :
  - response, setResponse : State responseVerify du composant EditMap (réponse de la requête de vérification du graphe du parcours)
  - challenge : les données d'un challenge : [route Request a challenge informations](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Challenge-GetChallenge)(réponse http 200 = OK, sinon réponse http 4XX avec message d'erreur)
  ```json
  //possible response
  {
    "error": {
      "status": "BAD REQUEST",
      "message": "Start crossing point is missing.",
      "details": {
        "start_crossing_point_id": null
        //or "end_crossing_point_id": null
      }
    }
  }

  //possible response
  {
    "error": {
      "status": "BAD REQUEST",
      "message": "Errors in challenge routing.",
      "details": {
        "loop": [
            [
                {
                    "id": 1,
                    "name": "L'armoire",
                    "position_x": 0.142,
                    "position_y": 0.324511
                },
                {
                    "id": 2,
                    "name": "La passe du faune",
                    "position_x": 0.524667,
                    "position_y": 0.335221
                },
                {
                    "id": 14,
                    "name": "Crossing point",
                    "position_x": 0.586207,
                    "position_y": 0.0824353
                }
            ]
        ],
        "deadend": [
            {
                "id": 14,
                "name": "Crossing point",
                "position_x": 0.586207,
                "position_y": 0.0824353
            }
        ],
        "orphans": [
            {
                "id": 14,
                "name": "Crossing point",
                "position_x": 0.586207,
                "position_y": 0.0824353
            }
        ]
      }
    }
  }
  ```


#### Composant MenuDrawer :

Menu de droite qui permet de gérer les options pour tracer sur la carte

props :
  - radioButtonValue, setRadioButtonValue : l'option séléctionné dans le menu


#### Composants modal CrossingPoint / Segment / Obstacle :

props :
  - openState, setOpenState : pour dire si la modale est ouverte ou non
  - crossingPointObject / segmentObject / obstacleObject : un objet [Crossing Point](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-CrossingPoint-GetCrossingPoints) / [Segment](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Segment-GetSegments) / [Obstacle](https://hephaistos.nathanaelderousseaux.fr/apidoc/#api-Obstacle-GetObstaclesByChallenge)
  ```json
  //Crossing gPoint
  {
    "id": 1,
    "name": "L'armoire",
    "position_x": 0.1,
    "position_y": 0.1
  }
  ```

  ```json
  //Segment
  {
    "id": 1,
    "name": "A travers le bois d'entre les mondes",
    "start_crossing_point": {
      "id": 1,
      "name": "L'armoire",
      "position_x": 0.1,
      "position_y": 0.1
    },
    "end_crossing_point": {
      "id": 2,
      "name": "La passe du faune",
      "position_x": 0.2,
      "position_y": 0.2
    },
    "coordinates": []
  }
  ```

  ```json
  //Obstacle
  {
    "id": 1,
    "label": "Quelle est le vrai nom de la sorcière blanche ?",
    "progress": 50.0,
    "description": null,
    "question_type": 0,
    "result": "Jadis",
    "segment_id": 1
  }
  ```

state : 
  - Les states sont les données des formulaires de mise à jour
