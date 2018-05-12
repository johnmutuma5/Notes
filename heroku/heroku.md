# Heroku
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
- `heroku config: set name `
  - Heroku manager -> Update Config Variables -> New Release
- `heroku addon: set name`
  - Heroku manager -> Update Addons -> New Release

Heroku apps are deployed through releases and it is always possible to go back to a previous release whenever necessary. 
