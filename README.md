# Réaliser une API de gestion de tâche

Cette API permet de créer et gérer des tâches (création, modification, suppression et récupération)

Une tâche comporte les informations suivantes :

- une description
- une date de création
- un statut : complété ou en cours
- un identifiant unique

  Une tâche peut être associée à un ou plusieurs groupes de tâches aussi appelé “tag”.
  Un groupe de tâche comporte les informations suivantes :

- un nom
- un code couleur
- un identifiant unique

### Critères d’acceptance par ordre de priorité :

1. Créer une tâche
2. Récupérer la liste des tâches
3. Mettre à jour le statut d’une tâche
4. Modifier la description d’une tâche
5. Supprimer une tâche
6. Créer de nouveaux groupes de tâches
7. Associer une tâche à un groupe de tâche (les groupes de tâches peuvent être statiques)

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
