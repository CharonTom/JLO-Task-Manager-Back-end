# Réaliser une API de gestion de tâche

Vous pouvez directement tester l'application : [ ici](https://ubiquitous-meringue-e3582c.netlify.app/)

<p align="center">
<img src="https://github.com/CharonTom/my-website/blob/main/src/assets/img/task.png" alt="application sur pc et mobile" width="400"/>
</p>

Cette API permet de créer et de gérer des tâches (création, modification, suppression et récupération).

Une tâche comporte les informations suivantes :

- une description
- une date de création
- un statut : complété ou en cours
- un identifiant unique

  Une tâche peut être associée à un ou plusieurs groupes de tâches aussi appelés “tag”.
  Un groupe de tâche comporte les informations suivantes :

- un nom
- un code couleur
- un identifiant unique

### Critères de l'application :

1. Implémenter un système CRUD pour les tâches ( Create, Read, Update, Delete )
2. Implémenter un système de groupe de tâche statique (tag) associer une tâche

### Technologies utilisées:

- Node.js
- Express
- Graphql
- Typescript
- MongoDB Atlas

---

### Installation

- Cloner ou télécharger le repo
- Ouvrir le terminal de commande à la racine du dossier et entrer "yarn" pour installer les dépendances.
- Créer un fichier .env et compléter le comme ceci :
  MONGO_SRV = **code pour se connecter à la base de données que je vous fournirai personnellement.**
- Entrer 'yarn dev' pour lancer le server
- Rendez-vous sur http://localhost:5000/graphql? pour tester l'API
