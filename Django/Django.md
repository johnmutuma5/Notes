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


### Inside wsgi.py
`wsgi` is the standard for Python web applications.

This file creates the Django application and exports the settings in settings.py to the `environment`.

### Running the application
The application is triggered using `manage.py` with the option `runserver`.

You may get a notification in the commandline for unapplied migrations.

### Setting up the database
Inside `settings.py`, find the `DATABASES` setting and change it to fit your specifications.

e.g.

```Python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'djangotest',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': ''
    }
}
```
Engine options include `mysql`, `oracle`, `postgresql`, `sqlite3`.

`NAME` refers to the databse name.


#### Migrations
This keeps tracks of changes within code that may require database schema changes to be applied to the tables and by executing `manage.py` with the option `migrate`, we're able to apply the changes to the database. Ensure that the correct database configuration is made in `settings.py`.

### The admin page
Django creates an admin route by default and can be accessed using `/admin`. Here you'll be prompted to login. But first, you have to create at least one admin account using `createsuperuser` option on `manage.py`.

run `./manage.py createsuperuser --username=<username> --email=<email>`.

Then use the credentials to login at `localhost:8000/admin`
