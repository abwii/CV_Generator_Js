Générateur de CV
Auteurs :
Wassim Bacha
Gina Palesch
Jimmy

Ce projet a été réalisé par Wassim, Gina et Jimmy dans le cadre d'un projet de groupe à l'issue d'un cours couvrant Node.js, Express, MongoDB et React.
Description du projet

L'application Générateur de CV permet aux utilisateurs de créer, gérer et consulter des CV en ligne. Les utilisateurs peuvent également laisser des recommandations sur les CV d'autres utilisateurs authentifiés. L'application est sécurisée grâce à un système d'authentification via JWT.
Fonctionnalités principales

    Authentification des utilisateurs
    Les utilisateurs peuvent :
        S'inscrire et se connecter.
        Accéder aux fonctionnalités de création et gestion de CV une fois authentifiés.
        La gestion de l'authentification se fait avec des JSON Web Tokens (JWT) pour plus de sécurité.

    Création et gestion de CV
    Les utilisateurs connectés peuvent :
        Créer et modifier leur CV avec les champs suivants :
            Nom, Prénom
            Description
            Expériences pédagogiques (diplômes, certifications, formations)
            Expériences professionnelles
        Choisir de rendre leur CV visible ou non.

    Consultation des CV
        Les utilisateurs peuvent consulter les CV visibles.
        Une page liste tous les CV visibles avec une fonctionnalité de recherche par nom et prénom.

    Recommandations
        Les utilisateurs connectés peuvent laisser des recommandations sur les CV d'autres utilisateurs.
        Les recommandations sont visibles par tous.

Technologies utilisées

    Back-end : Node.js avec Express.
        Base de données MongoDB pour la gestion des utilisateurs, CV et recommandations.
        API REST pour gérer les opérations CRUD.

    Front-end : React avec Hooks.
        Interface utilisateur pour la création, modification, et consultation des CV.

    Authentification : JSON Web Token (JWT) pour sécuriser l'accès aux fonctionnalités.

Installation et lancement en local
Prérequis

    Node.js installé sur votre machine.
    MongoDB configuré localement ou accessible via une instance distante.

Installation

    Clonez les repositories du back-end et du front-end :

    bash

git clone https://github.com/nom-utilisateur/back-end-repo.git
git clone https://github.com/nom-utilisateur/front-end-repo.git

Naviguez dans le dossier du back-end et installez les dépendances :

bash

cd back-end-repo
npm install

Naviguez dans le dossier du front-end et installez les dépendances :

bash

    cd front-end-repo
    npm install

Configuration

    Créez un fichier .env dans le dossier du back-end et configurez les variables d'environnement suivantes :

    makefile

    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000

    Si nécessaire, créez également un fichier .env.local dans le dossier du front-end pour toute configuration spécifique.

Lancement

    Lancez le back-end :

    bash

npm start

Lancez le front-end dans un autre terminal :

bash

    npm start

L'application sera accessible localement à l'adresse suivante :

    Front-end : http://localhost:3000
    Back-end : http://localhost:5000

Déploiement

L'application est déployée sur les plateformes suivantes :

    Back-end : [Lien du back-end déployé]
    Front-end : [Lien du front-end déployé]

Documentation de l'API

L'API comprend les endpoints suivants :

    POST /api/auth/register : Créer un nouveau compte utilisateur.
    POST /api/auth/login : Connexion et récupération du token JWT.
    GET /api/cv : Liste tous les CV visibles.
    POST /api/cv : Créer un CV (authentification requise).
    PUT /api/cv/
    : Modifier un CV existant (authentification requise).
    POST /api/cv/
    /recommendation : Ajouter une recommandation à un CV (authentification requise).

Contributions

Chacun des membres du groupe a contribué de manière équilibrée au développement du projet, aussi bien sur la partie back-end que front-end.
Licence

Ce projet est sous licence MIT. Veuillez vous référer au fichier LICENSE pour plus d'informations.
