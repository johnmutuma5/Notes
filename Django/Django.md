# Django Framework

- Open a project and make a virtual enviroment inside.
- Install Django *`pip install django`*

## Starting the project
Run:
>*`django-admin startproject <projectname>`*

in the commandline inside the project folder
This will create a project folder named *`projectname`*  as above. It will also contain a settings.py file with project settings.


### Inside settings.py

| Setting             |Type      | Description                                           |
|:-------------------:|:--------:|:------------------------------------------------------|
| *`DEBUG`*              |Boolean   | This setting is important for development and testing. This Should not be turned on in production|
| *`ALLOWED_HOSTS`*      | Array    | An array of domain names allowed for the applciation  |
| *`INSTALLED APPS`*     | Array    | An array of apps created in the project. This defaults to an array containing some apps which include *`admin`*, *`auth`*, *`sessions`*  etc.                |
| *`MIDDLEWARE`*         | Array    | An array of *`wsgi`*  MIDDLEWARE                         |
| *`DATABASES`*          | Dict     | Databases set up for the Application                  |


### Inside urls.py
This is for routing and setting up the routes and urls.

It contains a *`urlpatterns`*  *`array`*  that uses *`regex`*  to define url patterns.


### Inside wsgi.py
`wsgi`*  is the standard for Python web applications.

This file creates the Django application and exports the settings in settings.py to the *`environment`*.

### Running the application
The application is triggered using *`manage.py`*  with the option *`runserver`*.

You may get a notification in the commandline for unapplied migrations.

### Setting up the database
Inside *`settings.py`*, find the *`DATABASES`*  setting and change it to fit your specifications.

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
Engine options include *`mysql`*, *`oracle`*, *`postgresql`*, *`sqlite3`*.

`NAME`*  refers to the databse name.


#### Migrations
This keeps track of changes within code affecting models that may require database tables schema changes to be applied to the tables and by executing *`manage.py`*  with the option *`migrate`*, we're able to apply the changes to the database. Ensure that the correct database configuration is made in *`settings.py`*.

### The admin page
Django creates an admin route by default and can be accessed using *`/admin`*. Here you'll be prompted to login. But first, you have to create at least one admin account using *`createsuperuser`*  option on *`manage.py`*.

>*`./manage.py createsuperuser --username=<username> --email=<email>`*

Then use the credentials to login at *`localhost:8000/admin`*


## Django *`Apps`*
Django works with the concept of *`apps`*. *`apps`*  organize related endpoints together. For instance, in a blogs related project, an *`app`*  could be a package organizing all *`posts`*  related endpoints.

### Our first an app
We will create an *`app`*  called "posts" in our project.

To create an *`app`*, we run *`manage.py`*  with the *`startapp`*  option in the terminal. i.e.

>*`./manage.py startapp posts`*

This creates a package named "posts" with necessary files and directories populated. Among these include *`/migrations`*, *`admin.py`*, *`apps.py`*, *`models.py`*, *`tests.py`*  and *`views.py`*.

#### Registering the *`app`*  in settings.py
Once an app is created, we ought to include it as an *`array`*  member in the *`INSTALLED_APPS`*  setting inside of *`settings.py`*. This is very important.


#### Registering the *`app`*'s URLs
The next thing to do is to include the *`app`*  as part of the URLs in *`/path/to/projectname/urls.py`*. To do this, we need to have the *`app`*  "posts" in the *`urlpatterns`*  *`array`*. The following *`code`*  snippet illustrates this;

```Python
from django.urls import path, include

urlpatterns = [
  path(r'posts/', include('posts.urls'))
]
```
The *`include`*  method called above with *`posts.urls`*  is going to expect the module *`urls.py`*  to be present in the *`posts`*  package. At this point, we do not have this module and we will create in the next section.

Besides the *`path`*  function, URL patterns can also be created using the *`url`*  or the *`re_path`*  functions also imported from *`django.urls`*. The difference between these is that *`path`*  takes url templates e.g. *`r'posts/<id>/'`*, whereas *`re_path`*  and *`url`*  take *`regex`*  patterns e.g. *`r'^posts/(?P<id>\d+)$/'`*.

According to [this](https://docs.djangoproject.com/en/2.0/ref/urls/#url), *`url`*  is alias to *`re_path`*  and is bound for deprecation, and is best avoided.

##### URLs in the *`app`*  'posts'
Inside of *`app`*  'posts', we need to create a new file called *`urls.py`*. I like the command line, so quickly, in the project root directory, run:
>*`touch ./posts/urls.py`*

But you can achieve this whichever way!

Inside the the *`urls.py`*  file created, we want to register the endpoints related to or that extend *`/posts/`*.

We will need to create a *`urlpatterns`*  *`array`*  for this file. This is what will be shipped to *`include('posts.urls')`*  in the base *`urls.py`*  module.

In these notes, we'll be writing versions of both.

The arguments of these functions besides the patterns, are:
- The endpoint handler - usually imported from *`views.py`* module in the app
- The name of the endpoint - this can be used to refer to the endpoint by name in the code

The following code snippet illustrates creating *`urlpatterns`* for 'posts' *`app`*

Using *`re_path`*:
```Py
from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^$', views.index, name='posts_index')
]

```

Using *`path`*:
```Py
from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.index, name='posts_index')
]

```

We will, thereafter, need to define a function *`index`* inside *`views.py`* to be used as the endpoint handler as in the code snippets above.
