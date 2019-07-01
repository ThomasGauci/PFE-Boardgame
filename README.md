# PFE-Boardgame

## Informations sur l'équipe
   * [François Martin]
   * [Hugo Beranger]
   * [Thomas Gauci]
    
## Dépot original
* Membres :
    * [Pierre Bonny](pbonny63@free.fr)
    * [Gregory Merlet](gregory.merlet@outlook.fr)
    * [Ken Roulamellah](ken.roulamellah@gmail.com)

## Description
Réalisation du jeu 7Wonders avec une interface répartie sur différents supports à savoir une table interactive, et plusieurs tablettes individuelles.

Ce projet se décompose en trois sous-projets : un [serveur](./backend) réalisé à l'aide d'Express.js, un [client web](./pfe_table) pour la table interactive réalisé à l'aide de React.js et TUIO et un [client web](./pfe_tablet) pour les tablettes également réalisé à l'aide de React.js.

## Exécution
Afin de lancer ce projet, il faut tout d'abord lancer le serveur à l'aide des commandes :

```
cd backend
node index.js
```

Il faut ensuite lancer le client web de la table :

```
cd pfe_table
npm start
```

Et enfin le client web des tablettes :

```
cd pfe_tablet
npm start
```
