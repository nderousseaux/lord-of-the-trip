# Comment calculer les points ?

## Règles générales

Les points sont définis par segments et par obstacles. Pour chaque segment, l'administrateur attribut
- Un nombre de points fixe lié au à la longueur du segment. Le nombre de points est fixé par un barème globale.
- Un nombre de point fixe pour chaque obstacle en fonction de sa difficulté.

La longueur et le nombre de points d'un challenge permettront de lui donner un niveau => Barème.

Le temps mis à faire le parcours augmente ou réduit les points. Un temps moyen de parcours est défini. 
Lorsqu'un utilisateur réalise son parcours dans un temps inférieur à la moyenne, il reçoit un bonus de point et inversement il perds un points. => Mettre régle de bonification/perte.

Pour les défis, un nombre de points est acquis selon le classement => A définir

Pour les défis à Date limite (Quels parcours sont autorisé au défi ?)

Les points sont acquis à chaque points de passage validé. 
A date de fin du parcours, le calcul des points pour le défi sont clos. Les points déja acquis sont gardés. 
Les utilisateurs ayant fini le parcours dans temps percoivent une bonification de points. Et les 1o premiers en temps et les 10 premiers en nombre de points recoivent aussi une bonifications.

Un classement par points sera réalisé à la fin de la course, en plus du classement au temps.

## Les points par équipe

A définir
??? Rajout un nombre de point par équipe et les nombres de points est divisé entre les membres de l'équipe
On peut considérer que certains challenge ne sont pas ouvert aux équipes


## Règles générales MSA

La longueur et le niveau des obstacle d'un challenge permettront de lui donner un niveau
Niveau des parcours selon la distance :
| Niveau | Distance du parcours |
| ------ | -------------------- |
| 1      | 10 à 20 km           |
| 2      | 21 à 40 km           |
| 3      | 41 à 60 km           |
| 4      | 61 à 80 km           |
| 5      | 81 à 100 km          |
| 6      | > à 100 km           |

Peut être majoré selon la difficulté des questions
| Nb de questions difficile | Augmentation du niveau |
| ------  | -------------------- |
| 2       | + 1           |
| 3 à 4   | + 2           |
| 5 à 6   | + 3           |
| 7 à 9   | + 4           |
| + de 10 | + 5           |

- Barème longueur segment : 1Km = 10 point
- Un nombre de point par obstacle est défini par l'administrateur mais il doivent respecter la règle suivante, à même niveau de difficulté : une énigme vaut 2 fois les points d'une question simple et un défi les vaut 3 fois. => définir un barème selon la difficulté des questions.

2 type de challenges pour un même parcours

- Un challenge avec une date de fin définie : les participants ayant fini le parcours dans les temps se verront attribués des points de réalisation selon la règle suivante :

| Ordre d'arrivée| Points en plus       |
| ------         | -------------------- |
| 1er            | 300 points          |
| 2nd            | 250 points          |
| 3ème           | 200 points          |
| 4éme           | 150  points         |
| 5ème           | 125 points          |
| 7ème           | 100 points          |
| 8ème           | 75 points           |
| 9ème           | 50 points           |
| 10ème          | 25 points           |
| > 10           | 10 points           |

REM : pour deux personnes ayant le même temps d'arrivée, la différence se fera selon le nombre de points acquis, si il y a quand même ex aequo, il auront chacun les points correspondant à leur niveau. 
Pour tous ceux qui ne sont pas dans les temps => soit juste points déjà acquis, soit peuvent continuer mais perdent un pourcentage de points????? A date de fin du parcours, le calcul des points pour le défi sont clos. Les points déjà acquis sont gardés. 

- Un challenge sans date de fin 
Le temps mis à faire le parcours augmente ou réduit les points. Un temps moyen de parcours est défini. Lorsqu'un utilisateur réalise son parcours dans un temps inférieur à la moyenne, il reçoit un bonus de point et inversement il perds un points. => Mettre règle de bonification/perte. ??????

Les points sont acquis à chaque points de passage validé. 


Un classement par points sera réalisé à la fin de la course, en plus du classement au temps.

### Les points par équipe

Certaines challenges ne sont réalisable qu'individuellement, les autres peuvent être réaliser seul ou en équipe. Pour un challenge en équipe, les points acquis par chaque membre de l'équipe est fait selon les règles suivantes :
- Segment : 60% des points obtenue pour un challenge en individuel, ex pour un segment de 10km soit 100 points, chaque membre de l'équipe aura 60 points
- Obstacle : les points sont acquis par l'utilisateur qui répond à la question/défi/challenge
- Pour ce qui concerne les challenges avec une date de fin, les nombres de points de réalisation est divisé par le nombre de personnes dans l'équipe et les points acquis seront le résultat de la division entier.

On peut considérer que certains challenge ne sont pas ouvert aux équipes

### Classements

3 classements :
- Un classement par temps
- Un classement par nombre de points
- Un classement par temps & nombre de points

Pour chacun des trois, il y aura une version par équipe et une en individuel
