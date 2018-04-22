# PYTHON DJANGO WEB FRAMEWORK

**NB**:
- In these notes, the command line commands are applicable to UNIX-based operating systems
- These notes don't focus on UI pretty styling, expect little `CSS` and `JavaScript`

# TABLE OF CONTENTS
- [Preparing to start the project](#preparing-to-start-the-project)
- [Passing dynamic data](#passing-dynamic-data)


## Preparing to start the project
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
| *`DEBUG`*           |Boolean   | This setting is important for development and testing. This Should not be turned on in production|
| *`ALLOWED_HOSTS`*   | Array    | An array of domain names allowed for the applciation  |
| *`INSTALLED APPS`*  | Array    | An array of apps created in the project. This defaults to an array containing some apps which include *`admin`*, *`auth`*, *`sessions`*  etc.               |
| *`MIDDLEWARE`*      | Array    | An array of *`wsgi`*  MIDDLEWARE                      |
| *`DATABASES`*       | Dict     | Databases set up for the Application                  |
| *`TEMPLATES`*       | Array    | This holds templating options in a dict item among which include, the `DIRS` and the `APP_DIRS` opitons. The `DIRS` option is a array of directories that will contain `html` templates. The `APP_DIRS` option holds a boolean value indicating whether the `INSTALLED_APPS` directories should serve templates from a `templates` directory to be created inside of them. More details on this later in these notes.       |

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
# projectname/settings.py

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
# urls.py

from django.urls import path, include

urlpatterns = [
  path(r'posts/', include('posts.urls'))
]
```
The *`include`*  method called above with *`posts.urls`*  is going to expect the module *`urls.py`*  to be present in the *`posts`*  package. At this point, we do not have this module and we will create in the next section.

Besides the *`path`*  function, URL patterns can also be created using the *`url`*  or the *`re_path`*  functions also imported from *`django.urls`*. The difference between these is that *`path`*  takes url templates e.g. *`r'posts/<id>/'`*, whereas *`re_path`*  and *`url`*  take *`regex`*  patterns e.g. *`r'^posts/(?P<id>\d+)$/'`*.

According to [this documentation](https://docs.djangoproject.com/en/2.0/ref/urls/#url), *`url`*  is alias to *`re_path`*  and is bound for deprecation, and is best avoided.

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
# posts/urls.py

from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^$', views.index, name='posts_index')
]

```

Using *`path`*:
```Py
# posts/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.index, name='posts_index')
]

```

We will, thereafter, need to define a function *`index`* inside *`views.py`* to be used as the endpoint handler as in the code snippets above.

##### Endpoint handlers
All the endpoint handlers will be *`callables`* that take *`request`* as the first arguments.

They will also need to return a *`response`*. A *`response`* in Django can be created using *`render`* method from *`django.shortcuts`* or *`HttpResponse`* from *`django.http`*.

The following code snippet demonstrates how to make the index handler that returns a *`json`* response for our 'posts' *`app`*:

```Py
# posts/views.py
from django.http import HttpResponse
import json

# Create your views here.
def index(request):
    msg = json.dumps({"msg": "Hello"})
    response = HttpResponse(msg)
    response['content-type'] = 'applciation/json'
    return response
```
This is the approach to keep in mind when building a `REST` API.


##### Using *`render`* to render `html` templates
This is made easy by using the *`render`* method imported from *`django.shortcuts`*. There are different approaches to accomplishing this with *`Django`*. *`render`* takes the request object as the first argument, and a relative path to the template as the second argument, and context dict `ctx` that includes dynamic data to be loaded inside the `html` template, more on this later in these notes.

```Py
# posts/views.py

def posts_index(request):
  ctx = None
  return render(request, 'posts/index.html', ctx)
```

1. **Templates inside the `app`s' packages:**

    Inside of 'posts', we will need to create a template for our *`index_html`* view to render. It is best that we create this in a templates folder inside our 'posts' *`app`*. Let's do that:

    >*`mkdir ./posts/templates && mkdir ./posts/templates/posts`*

    Then
    >*`touch ./posts/templates/posts/index.html`*

    Or however else you may.

    Put your message in the `body` of the `html` file created.

    Finally, it is important to ensure that the *`Django`* application is configured to search for templates inside of *`apps`*. In *`settings.py`*, find `TEMPLATES` setting and set the `APP_DIRS` option to `True`.

2. **Creating a global `templates` directory**

    At the base directory, create a `templates` directory and in it, create another directory *`posts`* to contain templates related to *`posts`*.

    > *`mkdir templates && mkdir templates/posts`*

    Then
    > *`touch templates/posts/index.html`*

    In *`settings.py`*, find `TEMPLATES` setting and find the `DIRS` option. This is an `array` of directories from which the template loader should find templates.

    You can do this by including:
    ```python
    os.path.join(BASE_DIR, 'templates')
    ```
    as an item of the `DIRS` array. Django declares `BASE_DIR` in `settings.py`. It refers to the base directory of the project.

With either approaches, the endpoint handler above, `index_html`, should be able to locate the templates. The template loader loads templates from directories in `settings.py` `DIRS` item of `TEMPLATES` setting and also from `templates` directories in the apps in that order. The first template to be matched is loaded and rendered.

### Making use of the templating engine
This is a brief overview of using Django Templating Language, `DTL`, to generate `html` templates on the backend. `DTL` is very similar to `Jinja2` Templating Language.

From `Django1.8`, it is possible to use `Jinja2` as a templating engine. This would require a `pip` install of `Jinja2`, tweaking the `TEMPLATES` setting in `settings.py` and a little adjustment of `Jinja2` environment to dump some python functions for use inside of templates e.g. `path`, `static`, `filter`, etc. But these are beyond the scope of these notes. Most of the notes on `DTL` are going to be applicable to `Jinja2`.

#### Using `DTL`
`DTL` allows us to create a `base.html` or `layout.html` in the templates directory which is then extended by other templates, this is along the principle of `DRY` in computer programming.

Essentially, each `app` could have it's own templates and `base.html`. But depending on how the front-end application will desirably look, it can be necessary to have at least a global `base.html` and `index.html` in the base templates directory.

To do this we can create these `html` files in our templates directory:

`base.html`:
>*`touch ./templates/base.html`*

`index.html`:
>*`touch ./templates/index.html`*

If necessary, we can then create a `base.html` in our 'posts' `app` to hold `html` that is common across all the templates in the 'posts' `app`:

>*`touch ./posts/templates/posts/base.html`*

#### Adding to the `base.html` file
In the base templates folder, we will include `html` text that is common globally.

```html
<!-- templates/base.html -->

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Django Notes</title>
  </head>
  <body>
    <div class="main">
      <h3>Any globally common content can go here in root base template; these are the kinds that persist across all pages</h3>

      {% block main %}
      {% endblock %}

      <h3>Globally common content can also come here in root base template after loading content from extending blocks</h3>
    </div>
  </body>
</html>
```

Here,
```html
  {% block main %}
  {% endblock %}

```
creates space for other templates to populate their specific contents for display.

#### Extending `base.html`
Other templates can now be able to extend `base.html` and put content in the space availed by `block main` in the template.

Let us extend the `index.html` in our base templates folder. The first thing we want to do here is to point the file to the appropriate template to extend. We can do this as follows:

```html
<!-- templates/index.html -->

{% extends 'base.html' %}
```
This
Then add something to the `block main`. As follows:

```html
<!-- templates/index.html -->

{% extends 'posts/base.html' %}

{% block main %}
<p>This is a lovely comment in the base index</p>
{% endblock %}
```

##### Extending with `app` templates
We created a global `base.html` and this should ideally be extensible by the templates of each `app` as we have done with the base index.

Let's try this.

We will use the `base.html` template inside `posts/templates/posts` to extend the global `base.html`. Let us add the `extends` directive to the 'posts' base `html` template, by adding:

```html
<!-- posts/templates/posts/base.html -->
{% extends 'base.html' %}
```

If you are a command line maniac, try:
> *`echo "{% extends 'base.html' %}" > ./posts/templates/posts/base.html`*

After extending `base.html`, `posts/base.html` now has access to the `block main` in the root `base.html` and we can put some content there:

```html
<!-- posts/templates/posts/base.html -->

{% extends 'base.html' %}

{% block main %}
<section class="">
  <h4>This is a nice heading in posts base</h4>
  <p>We can also throw in some general posts related controls and components here in posts base </p>

  {% block posts %}
  {% endblock %}

</section>
{% endblock %}
```

After successfully extending root `base.html`, we can go ahead and extend `posts/base.html` with `posts/index.html`. `posts/index.html` shall be expecting to populate the extended template's block with content. The block in this case is `block posts`.

Let us fill `block posts` with some posts:

```html
<!-- posts/templates/posts/index.html -->
{% extends 'posts/base.html' %}

{% block posts %}
<article class="posts">
  <p>This is a lovely post in posts index</p>
  <p>This is a lovely post in posts index</p>
  <p>This is a lovely post in posts index</p>
</article>
{% endblock %}
```

Now activate the virtual environment and then run the server.

Activating venv:
>*`. ../venv/bin/activate`*

or
>*`source ../venv/bin/activae`*

Run Server:
>*`./manage.py runserver`*

Access [posts index](http://localhost:8000/posts/ "Index page of posts") and you should see that `posts/index.html` extended the contents of `posts/base.html` which further extended contents of root `base.html`.

That's a quick overview of rendering and extending templates.

#### Passing dynamic data
As mentioned earlier, the `render` function takes a third argument which includes key:pair values of data to be passed on to the template engine. It is usually passed as a `Python` `dict` and the values are accessible inside of the template by putting the key inside double curly braces `{{ <key> }}`. This loads the `value` passed.

Let's try this.

In our root `base.html`, let us load the page title dynamically by letting the endpoint handlers pass the title to be placed in the `title` `html` tags. We're going to replace the hard coded title with a dynamic title that is going to be passed by each endpoint handler in the context `dict`.

This is what the title tag shall look like:
```html
<!-- templates/base.html -->

...

  <head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
  </head>

...
```
The template engine is going to expect that the endpoint handlers pass on this information in the context `dict`. Heading over to `posts/views.py`, we're going to create the `contx` `dict`. At this point, the only information we require to pass is the `title`:

```Py
# posts/views.py

def posts_index(request):
  ctx = {'title': 'Django Learning - A quick guide'}
  return render(request, 'posts/index.html', ctx)
```

Reloading our page, posts view, [here](http://localhost:8000/posts/ "posts view"), we should see the `title` set above show as the page title on the page's `Tab`.

Any dynamic data can be passed and accessed like that anywhere in the template.
