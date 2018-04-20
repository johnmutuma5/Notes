# Django Framework

- Open a project and make a virtual enviroment inside.
- pip install django

## Starting the project
Run `django-admin startproject <projectname>` in the commandline inside the project folder
This will create a project folder named `projectname` as above. It will also contain a settings.py file with project settings.


### Inside settings.py

| Setting             |Type      | Description                                           |
|:-------------------:|:--------:|:------------------------------------------------------|
| `DEBUG`             |Boolean   | This setting is important for development and testing. This Should not be turned on in production|
| `ALLOWED_HOSTS`     | Array    | An array of domain names allowed for the applciation  |
| `INSTALLED APPS`    | Array    | An array of apps created in the project. This defaults to an array containing some apps which include `admin`, `auth`, `sessions` etc.                |
| `MIDDLEWARE`        | Array    | An array of `wsgi` MIDDLEWARE                         |
| `DATABASES`         | Dict     | Databases set up for the Application                  |


### Inside urls.py
This is for routing and setting up the routes and urls.

It contains a `urlpatterns` `array` that uses `regex` to define url patterns.
