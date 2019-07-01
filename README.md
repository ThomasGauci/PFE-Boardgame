# PFE-Boardgame

![7Wonders](https://image.noelshack.com/fichiers/2019/06/1/1549316565-7-wonders.jpg)

## Informations sur l'équipe
* Professeur encadrant : 
   * [M. Philippe RENEVIER GONIN](https://github.com/PhilippeRenevierGonin)
* Membres :
   * [François Martin](https://github.com/artania06)
   * [Hugo Beranger](https://github.com/HugoBrg)
   * [Thomas Gauci](https://github.com/ThomasGauci)
    
## Dépot original
* Membres :
    * [Pierre Bonny](pbonny63@free.fr)
    * [Gregory Merlet](gregory.merlet@outlook.fr)
    * [Ken Roulamellah](ken.roulamellah@gmail.com)

## Description
Réalisation du jeu 7Wonders avec une interface répartie sur différents supports à savoir une table interactive, et plusieurs tablettes individuelles.

Ce projet se décompose en trois sous-projets : un [serveur](./backend) réalisé à l'aide d'Express.js, un [client web](./pfe_table) pour la table interactive réalisé à l'aide de React.js et TUIO et un [client web](./pfe_tablet) pour les tablettes également réalisé à l'aide de React.js.

## Description et règles du jeu
*Chacun des 3 à 7 joueurs prend la tête d’une ville légendaire (Babylone, Éphèse, Rhodes…), et va disposer de trois Âges pour la faire prospérer et même bâtir la légendaire Merveille du monde qui y est associée. Le but du jeu est d’embellir sa cité et de la rendre plus influente que celle de ses adversaires.*

En d'autres termes, le but de ce jeu est d'accumuler le maximum de points durant les 3 âges du jeu (au cours desquels nous pouvons collecter un certain nombre de cartes), le gagnant est celui qui en accumulent le plus. Pour ce faire, le joueur a la possibilités d'adopter plusieurs stratégies ...

La documentation complète concernant les règles du jeu est disponibles [ici](http://www.7wonders.net/wp-content/uploads/2017/06/7WONDERS_RULES_FR.pdf)

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

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, MARTIN François - BERANGER Hugo - GAUCI Thomas
