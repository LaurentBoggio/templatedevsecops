# Template DevSecOps - Zéro Vulnérabilité

Ce dépôt est un template GitHub pour démarrer un projet avec un pipeline DevSecOps sécurisé et automatisé.

## Objectif

- Automatiser la validation de code à chaque `push` ou `pull_request`
- Détecter les secrets, failles de code, vulnérabilités de dépendances, et problèmes de qualité
- Fournir un pipeline prêt à l’emploi pour un dépôt template GitHub

## Inclut

- Détection de secrets avec `gitleaks`
- Analyse statique avec `GitHub CodeQL`
- Audit des dépendances avec `npm audit` / `pip audit`
- Linting multi-langages avec `GitHub Super-Linter`
- Notification Slack en cas d’échec critique

## Configuration

1. Créez un dépôt GitHub à partir de ce template.
2. Ajoutez un secret GitHub Actions dans le dépôt :
   - `SLACK_WEBHOOK_URL`
3. Adaptez le workflow si votre projet utilise un autre gestionnaire de dépendances.

## Architecture du pipeline

Le workflow `.github/workflows/devsecops-zero-vulnerabilite.yml` exécute les étapes suivantes :

1. `secret-scan` : recherche les secrets exposés dans le dépôt avec `gitleaks`
2. `code-scan` : exécute CodeQL pour rechercher des vulnérabilités dans le code
3. `dependency-audit` : détecte les fichiers `package.json`, `package-lock.json` et `requirements.txt`, installe les dépendances et exécute l’audit
4. `lint` : vérifie la qualité du code avec `GitHub Super-Linter`
5. `notify` : envoie une alerte Slack si une étape critique échoue

## Bonnes pratiques

- Activez GitHub Dependabot pour garder vos dépendances à jour
- Ajoutez `SECURITY.md` pour expliquer la gestion des vulnérabilités
- Personnalisez `.gitleaks.toml` pour refléter les secrets et patterns de votre stack
- Ajoutez un badge de statut de workflow dans le README pour valoriser le pipeline
