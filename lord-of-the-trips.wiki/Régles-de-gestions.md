# Les administrateurs

- Un administrateur ne peut modifier et utiliser que les parcours pour lesquels il est manager. De même, il ne peut valider que les obstacles rattachés à ces parcours.
- Un administrateur peut être un utilisateur, mais il ne peut pas participer à un challenge sur un parcours qu'il gère sauf en **_cas de test_**.
- Un utilisateur peut devenir administrateur et aider un administrateur à gérer ces cartes.
- L’application a un compte super-administrateur qui a pour seule responsabilité de créer les comptes administrateur (non utilisateur). 
- Tout administrateur peut passer un utilisateur en administrateur, mais uniquement sur les parcours dont il a la responsabilité. Par contre, la création d’un compte administrateur(non utilisateur) est faite par le compte super-administrateur.

# Régles de gestion MSA
## Les parcours

Un parcours est constitué :

- D'un point de départ et d'un point d'arrivée
- De segments qui représente un chemin entre le départ et l'arrivée. Plusieurs chemins sont possibles. Entre chaque segment se trouve des points de passage où le joueur peut  être amené à choisir entre plusieurs segments possibles.
- D'une carte qui est rattaché à un univers 

Une carte peut être réutilisable pour plusieurs parcours, mais un tracé parcours ne peut être utilisé pour utiliser pour différents parcours

## Les obstacles

Pour les obstacles, on envisage 2 types :
1. ceux pour lesquels la validation peut être faite automatiquement (question + réponse attendue). Pour cela, dans le cas ou la réponse saisie par l'utilisateur ne correspond pas à la réponse attendue,un message demandera à l'utilisateur de vérifier l'orthographe du mot et si cela ne correspond toujours pas, la réponse sera transmise pour validation aux administrateurs.
2. ceux qui nécessitent une validation par un administrateur du challenge (question ou défi + validation par exemple à partir d'une photo soumise par les joueurs)


