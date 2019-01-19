# Heroku
- A general introduction to Heroku
## Technical Overview
Heroku is language-agnostic. It supports deployment of applications written in a variety of languages most commonly:
- Python
- Javascript (Node.js)
- Java
- Ruby
- Php

> Virtually, any other language is supported by community buildpacks and if there is not one for a particular language, it is fairly simple API to build one.


Heroku is developer-oriented, hence the main approach to deployment is through version control.

### Continuous Deployment
Develop Locally -> Deploy code to Heroku -> Get Feedback

### Heroku Developer Workflow
Heroku commands should be run in a git managed directory.

- `heroku create`
  - Heroku repo -> app-name.herokuapp.commands
- `git push heroku master`
  - Heroku manager -> Language environment -> New application slug -> Configuration Variables -> Addons -> New Release
- `heroku config:set name `
  - Heroku manager -> Update Config Variables -> New Release
- `heroku addon:add name`
  - Heroku manager -> Update Addons -> New Release

Heroku apps are deployed through releases and it is always possible to go back to a previous release whenever necessary.

## Add-ons Marktetplace
Developer-focused add-ons enable developers to quickly provision and scale data stores and services on demand. e.g.

- Heroku Postgres - SQL Database service for developers
- New Relic  - Monitor troubleshoot and tune your apps
- Postmark - Email delivery for web apps. Also twilio
- Heroku Connect - Seamless Heroku and Salesforce data sync

## Configuration Variables
Setting and getting environment variables on Heroku is fairly simple.
- `heroku config: set NAME=VALUE`
- `heroku config: get NAME`

## Heroku releases
Heroku deployments are build upon releases. Version pushes and changes in Configuration variables occasion new releases. Releases can be logged by running `heroku releases`

You can always rollback to a previous version with `heroku rollback v<n>` where `<n>` refers to the version number. This actually creates a new version which is a copy of the referenced version and that is what is deployed.
