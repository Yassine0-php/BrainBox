
#  BrainBox

**BrainBox** est un assistant IA local basé sur un système de **RAG (Retrieval Augmented Generation)**.
Le projet combine une interface Angular, une API Express, une base de connaissances MongoDB et un modèle IA local exécuté avec Ollama.

L'objectif est de créer un assistant capable de répondre aux questions des utilisateurs en s'appuyant sur une base de connaissances personnalisée avant de générer une réponse avec l'IA.

---

##  Fonctionnalités

###  Chat IA

* Interface de discussion moderne développée avec Angular
* Envoi de questions à l'assistant
* Affichage des réponses IA en temps réel
* Indicateur de génération pendant la réflexion de l'IA

###  Intelligence artificielle locale

* Utilisation d'un modèle IA local via Ollama
* Pas de dépendance à une API externe
* Les données restent en local

###  Système RAG

BrainBox utilise une base de connaissances pour améliorer les réponses :

1. L'utilisateur pose une question
2. Le backend recherche les informations pertinentes dans MongoDB
3. Les connaissances trouvées sont envoyées au modèle IA
4. L'IA génère une réponse basée sur ces informations

###  Gestion des connaissances

* Stockage des connaissances dans MongoDB
* Recherche par mots-clés
* Utilisation des titres, contenus et tags

###  Dockerisation

Le projet peut être lancé avec Docker Compose :

* Frontend Angular servi avec Nginx
* Backend Express
* MongoDB
* Ollama pour le modèle IA

---




#  Technologies utilisées

## Frontend

* Angular
* TypeScript
* HTML / SCSS
* Nginx

## Backend

* Node.js
* Express.js
* Axios
# routes 

- POST http://localhost:3000/api/connaissances ajouterConnaissance
- PUT http://localhost:3000/api/connaissances/ modifierConnaissance
- GET http://localhost:3000/api/connaissances  listerConnaissance
- DEL http://localhost:3000/api/connaissances/10 supprimerConnaissancce par id
- GET http://localhost:3000/api/connaissances/1 consulterConnaissance par id
- GET http://localhost:3000/api/connaissances/recherche?mot=ia rechercheConnaissance

## Base de données

* MongoDB ATLAS/compass

## Intelligence artificielle

* Ollama
* Modèle Mistral

## Déploiement

* Docker
* Docker Compose

---

#  Installation en local

## Prérequis

Installer :

* Node.js
* Angular CLI
* Docker Desktop
* Ollama

---

#  Installation du projet

Cloner le repository :

```bash
git clone https://github.com/Yassine0-php/BrainBox.git

cd BrainBox
```

---

#  Lancement avec Docker

Construire et démarrer les conteneurs :

```bash
docker compose up --build
```

Les services seront disponibles :

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

# Installation du modèle IA

Télécharger le modèle utilisé :

```bash
ollama pull mistral
```

Vérifier les modèles disponibles :

```bash
ollama list
```
# choix du modéle IA Mistrall

J'ai choisi Mistral 7B car il représente un bon compromis entre les performances du modèle et les contraintes matérielles. Mon application doit fonctionner localement avec Ollama, sans dépendre d'une API externe. Avec une machine équipée de 16 Go de RAM, Mistral 7B permet d'obtenir des réponses pertinentes tout en conservant des temps de réponse acceptables.




---

#  API Backend

## Poser une question à l'assistant

### Endpoint

```
POST /api/assistant/question
```

### Body

```json
{
  "question": "Explique Angular"
}
```

### Réponse

```json
{
  "reponse": "Angular est un framework..."
}
```

---

#  Fonctionnement du RAG

```
Utilisateur
    |
    v
Question
    |
    v
Angular
    |
    v
API Express
    |
    +----------------+
    |                |
    v                v
MongoDB          Ollama
(Base de         (Mistral)
connaissances)
    |
    v
Réponse IA
```

---

#  Sécurité et données

BrainBox fonctionne localement :

* Les conversations restent sur la machine
* Aucun appel vers une API IA externe
* Les connaissances sont stockées dans MongoDB local

---

#  Améliorations prévues

* [ ] Authentification utilisateur
* [ ] Historique des conversations
* [ ] Gestion des utilisateurs
* [ ] Ajout de documents PDF dans la base RAG
* [ ] Amélioration du système de recherche


---

#  Auteur

Projet réalisé dans le cadre d'un apprentissage en développement IA.

Stack principale :

**Angular + Express + MongoDB + Ollama + Docker**


