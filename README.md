#  BrainBox

**BrainBox** est un assistant IA local basé sur un système de **RAG (Retrieval Augmented Generation)**.

Le projet combine une interface **Angular**, une API **Express.js**, une base de connaissances **MongoDB** et un modèle d'intelligence artificielle local exécuté avec **Ollama**.

L'objectif est de créer un assistant capable de répondre aux questions des utilisateurs en s'appuyant sur une base de connaissances personnalisée avant de générer une réponse avec l'IA.

---

# Fonctionnalités
Appuyer sur le boutton + pour afficher les discussions précedente qui sont enregistrer dans la bdd et aussi pour créer une nouvelle discussion.

-Conversation avec BrainBox avec seulement les connaissances de la BDD
-pendant la géneration de la réponse de brainbox pas possible de renvoyer une nouvelle requête
-création de nouvelle discussion en appuyant sur le boutton +
-sauvegarde des conversations dans la bdd

##  Chat IA

- Interface de discussion moderne développée avec Angular
- Envoi de questions à l'assistant
- Affichage des réponses de l'IA
- Indicateur de génération pendant la réflexion de l'IA

##  Intelligence artificielle locale

- Utilisation d'un modèle IA local via Ollama
- Aucune dépendance à une API externe
- Les données restent sur la machine de l'utilisateur

##  Système RAG

BrainBox améliore les réponses de l'IA grâce à une base de connaissances.

Fonctionnement :

1. L'utilisateur pose une question.
2. Le backend recherche les connaissances pertinentes dans MongoDB.
3. Les connaissances trouvées sont envoyées au modèle IA.
4. Le modèle Mistral génère une réponse en utilisant ces informations.

## Gestion des connaissances

- Ajout de connaissances
- Modification
- Suppression
- Consultation
- Recherche par mots-clés
- Utilisation des titres, contenus et tags

##  Dockerisation

Le projet peut être exécuté avec Docker Compose.

Les conteneurs lancés sont :

- Frontend Angular (Nginx)
- Backend Express
- MongoDB
- Ollama

---

#  Technologies utilisées

## Frontend

- Angular
- TypeScript
- HTML
- SCSS
- Nginx

## Backend

- Node.js
- Express.js
- Axios
- Mongoose

## Base de données

- MongoDB Atlas
- MongoDB Compass

## Intelligence artificielle

- Ollama
- Modèle Mistral 7B

## Déploiement

- Docker
- Docker Compose

---

#  Prérequis

Avant de lancer le projet, installer :

- Node.js (v20 ou supérieure)
- npm
- Angular CLI
- Docker Desktop
- Git
- Ollama
- Un compte MongoDB Atlas (ou MongoDB Compass)

---

#  Installation

## 1. Cloner le projet

```bash
git clone https://github.com/Yassine0-php/BrainBox.git

cd BrainBox
```

## 2. Installer les dépendances

### Backend

```bash
cd back-express
npm install
```

### Frontend

```bash
cd ../front-angular
npm install
```

---

#  Configuration de MongoDB Atlas

Créer un cluster MongoDB Atlas puis récupérer la chaîne de connexion.

Créer un fichier `.env` dans le dossier **back-express** :

```env
PORT=3000

MONGO_URI=mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/brainbox?retryWrites=true&w=majority
```

Remplacer :

- `utilisateur`
- `motdepasse`
- `cluster`

par vos informations MongoDB Atlas.

Si vous utilisez MongoDB Compass, assurez-vous que votre base de données est accessible avec cette même chaîne de connexion.

---

#  Lancement d'Ollama

Installer Ollama :

https://ollama.com

Télécharger le modèle utilisé :

```bash
ollama pull mistral
```

Vérifier son installation :

```bash
ollama list
```

Lancer Ollama :

```bash
ollama serve
```

Le serveur sera disponible sur :

```
http://localhost:11434
```

---

#  Lancement de l'application

## Avec Docker

Construire puis lancer les conteneurs :

```bash
docker compose up --build
```

Les services seront disponibles sur :

Frontend :

```
http://localhost:4200
```

Backend :

```
http://localhost:3000
```

Ollama :

```
http://localhost:11434
```

---

## Sans Docker

### Backend

```bash
cd back-express
npm start
```

ou

```bash
node index.js
```

### Frontend

```bash
cd front-angular
ng serve
```

---

#  Routes disponibles

## Assistant IA

### Poser une question

```
POST /api/assistant/question
```

Exemple :

```json
{
    "question": "Explique Angular"
}
```

---

## Gestion des connaissances

### Ajouter une connaissance

```
POST /api/connaissances
```

### Modifier une connaissance

```
PUT /api/connaissances/:id
```

### Lister toutes les connaissances

```
GET /api/connaissances
```

### Consulter une connaissance

```
GET /api/connaissances/:id
```

### Supprimer une connaissance

```
DELETE /api/connaissances/:id
```

### Rechercher des connaissances

```
GET /api/connaissances/recherche?mot=ia
```

---

#  Modèle utilisé

Le projet utilise le modèle **Mistral 7B** exécuté localement grâce à **Ollama**.

### Pourquoi Mistral 7B ?

J'ai choisi **Mistral 7B** car il représente un excellent compromis entre les performances et les ressources matérielles nécessaires.

L'application fonctionne entièrement en local, sans dépendre d'une API externe. Avec une machine équipée de **16 Go de RAM**, Mistral 7B fournit des réponses pertinentes tout en conservant des temps de réponse satisfaisants.

---

#  Fonctionnement du système RAG

```text
Utilisateur
      │
      ▼
  Question
      │
      ▼
Frontend Angular
      │
      ▼
 API Express
      │
 ┌────┴───────────┐
 │                │
 ▼                ▼
MongoDB        Ollama
(Base de      (Mistral)
connaissances)
      │
      ▼
Réponse IA
```

---

#  Sécurité et données

BrainBox fonctionne entièrement en local :

- Les conversations restent sur la machine de l'utilisateur.
- Aucun appel n'est effectué vers une API d'IA externe.
- Les connaissances sont stockées dans MongoDB.

---

#  Améliorations prévues

- [ ] Authentification utilisateur
- [ ] Historique des conversations
- [ ] Gestion des utilisateurs
- [ ] Import de documents PDF dans la base RAG
- [ ] Recherche vectorielle avec embeddings
- [ ] Amélioration du système RAG

---



**Stack principale :**

- Angular
- Express.js
- MongoDB
- Ollama
- Docker