# Lord of the Trips - Mise en production de l'application Mobile

## Publier le projet

Assurez-vous dans d'avoir un compte Expo, si des identifiants Expo vous sont demandés dans les manipulations suivantes utilisez les identifiants de votre compte Expo.

### Android

- Ouvrir une console et naviguer dans le dossier `/dev/frontend/mobile/LOTT_Mobile`
- Saisir la commande `expo build:android`
- Choisir le type de publication que vous souhaitez faire (fichier apk / bundle préparé pour le store android)

### Ios

- Ouvrir une console et naviguer dans le dossier `/dev/frontend/mobile/LOTT_Mobile`
- Saisir la commande `expo build:ios`
- Choisir le type de publication que vous souhaitez faire (archive pour tourner sur des appareils physiques ou le store ios / simulator pour faire tourner le projet sur simulateur)

#### Si vous avez choisi "Archive"

- Préciser si on a accès à un compte Apple

  - Y => Renseigner son compte

- Choisir si vous voulez laisser Expo gérer les fichiers de publication ou si vous voulez le faire vous-même

- Renseigner un compte Apple Developper pour la publication sur le store

<div style="page-break-after: always; break-after: page;"></div>

## Télécharger la publication sur son téléphone

Rendez-vous sur le site [Expo](https://expo.io/) et connectez-vous à votre compte si ce n'est pas déjà fait. 2 options pour récupérer la publication s'offrent à vous :

### Télecharger les fichiers

Rendez-vous sur la page d'accueil de votre compte en cliquant sur la bouton **Expo** en haut à gauche de la page (1), puis cliquez sur le nom de votre projet dans la section **Projects** (2).

![1](uploads/34789c13e7ea966cd906bfb523d40953/1.png)

Cliquez sur **Builds** dans le menu de gauche (1) puis sur le build que vous voulez télécharger (2)

![2](uploads/d96348b1198afb5cedac0bc063911d31/2.png)

Cliquez ensuite sur le bouton **Download** afin de télécharger les fichiers.

### Scanner le QR Code

Déroulez le menu de votre profil en cliquant sur votre image de profil en haut à droite de l'écran (1), puis cliquez sur l'option **Projects** (2)

![3](uploads/9f3c34189adb13b80a1db46c40497af0/3.png)

Cliquez ensuite sur le nom du projet que vous voulez récupérer et scannez ensuite le QR Code sur votre téléphone avec [l'application Expo Go](https://expo.io/client)
