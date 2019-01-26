# Table of Contents
- [Why Use Docker](#why-use-docker)
- [Using the Docker Client](#using-the-docker-client)
- [What is an Image](#what-is-an-image)
- [Manipulating Containers with the Docker Client](#manipulating-containers-with-the-docker-client)
  - [Overwriting default command](#overwriting-default-command)
  - [Listing containers](#listing-containers)
  - [Restarting stopped containers](#restarting-stopped-containers)
  - [Removing stopped containers](#removing-stopped-containers)
  - [Stopping running containers](#stopping-running-containers)
  - [Executing commands in running containers](#executing-commands-in-running-containers)
    - [The purpose of the -it flag](#the-purpose-of-the--it-flag)
- [Creating docker images](#creating-docker-images)
  - [Tagging an image](#tagging-an-image)
- [Running a real app in a docker container](#running-a-real-app-in-a-docker-container)
  - [Creating the Dockerfile](#creating-the-dockerfile)
    - [Noting the steps required to run the application](#noting-the-steps-required-to-run-the-application)
    - [The initial Dockerfile](#the-initial-dockerfile)
    - [The improved Dockerfile](#the-improved-dockerfile)
      - [Dealing with the files missing in the container](#dealing-with-the-files-missing-in-the-container)
    - [Sending a request](#sending-a-request)
      - [Container PORT mapping](#container-port-mapping)
  - [Specifying a working directory](#specifying-a-working-directory)
- [Docker compose](#docker-compose)
  - [Assembling a docker file](#assembling-a-docker-file)
  - [Introducing Docker Compose](#introducing-docker-compose)
    - [Docker compose files](#docker-compose-files)
    - [Networking with docker compose](#networking-with-docker-compose)
    - [Docker compose commands](#docker-compose-commands)
- [Appendix](#Appendix)

# Why Use Docker
Docker makes it very easy to install and run software without worrying about errors and dependencies.

# Using the Docker Client
To run a command with docker, we use `docker <command> [options]`
e.g. `docker run hello-world`. When this command is run, a series of steps occurs as follows:

- The docker client contacts the docker server
- The docker server attempts to locate the image `hello-world` from the image cache on the local computer
- The docker server on finding no such image locally contacts the docker hub to look for a container with that name and downloads it
- The docker server then runs the image creating as container with the image

## What is an Image
A docker image is basically a File System snapshot that is run to create containers. It includes installed software and dependencies and needed files. It also includes a start up command for the container.

## Manipulating Containers with the Docker Client
### Overwriting default command
With `docker run`, we can supply our custom command to overwrite the defalut command for the container e.g. `docker run <image> <custom command>`. `docker run` is identical to running the following two commands separately; `docker create` and `docker start`.

If the custom command is defined in the image, it will be run instead of the default image start up command for containers.

### Listing containers
We can use the process status command on docker to see a list of all running containers e.g. `docker ps`. To show a list of all containers including those that are not running, we can use `docker ps --all`.

### Restarting stopped containers
Containers that have exited for some reason can be restarted with `docker start <container_name/hash >`.

### Removing stopped containers
We can use the command `docker system prune` to remove all stopped containers.

### Stopping running containers
We can use one of two commands to achieve this;
- `docker stop <container_id>`
- `docker kill <container_id>`

Both of these will terminate a running container. `stop` issues a `SIGTERM` signal to the container whereas `kill` issues a `SIGKILL` signal to the container.

### Executing commands in running containers
Sometimes we may want to execute a second command inside a running container. e.g. consider a client-server setup for a database like `Redis`. `Redis` has the database server started by `redis-server` and a client started by `redis-cli` to interact with the server. By running a `Redis` container with docker, we get the server. We may want to run a second command inside the container to get the client interface.

To achieve the above, we use `docker exec -it <container_id> <command>`. i.e. `docker exec -it <container_id> redis-cli`.

#### The purpose of the -it flag
The `-i` flag or `--interactive` keeps the `STDIN` of the container open. The `-t` or `--tty` flag allocates a pseudo-TTY to the container and attaches it to the local terminal entry point.

### Getting terminal access to a running container
We can open up a shell for a container e.g. whenever we want to run commands in the container without the need to run the `docker exec` command multiple times. To open a shell for a container, we can use the following command;

`docker exec -it <container-id> sh`

`sh` is the name of a program being executed inside the container. It is the shell.

## Creating docker images
We begin by creating a Dockerfile;

![](notes-images/creating-docker-file.png)
*[img:] The basic steps in creating a Dockerfile*

A simple Dockerfile for a redis container can look like this:

```
FROM alpine
RUN apk add --update redis
CMD ["redis-server"]
```

### Rebuilding from cache
Docker checks through its cache when building images and ensures that for as long as the order of operations has not changed in the Dockerfile, no new images will be rebuilt but instead, the cached images will be used.

### Tagging an image
It is sometimes more convenient to refer to an image with a name and also to store versions of an image. Tagging becomes very instrumental in this. To tag an image, we build it with the `-t` flag and the convention is to specify the docker user, name of the image and version in the tag;

> docker build -t <docker_user>/<image_name>:<image_version_tag> <dir_scope>

e.g.

> docker build -t johnmutuma5/redis:latest .

NB: Note the `.` at the end of the command above specifying the Dockerfile for the build lives in the current directory whey the command is being executed.


# Running a real app in a docker container
Let us set up a Node.js web application with docker and use a web app client to interact with it. This is going to be a step by step guide whereby we're going to intentionally do some things wrong as is common and gradually improve the mistakes as we go on.

Begin by setting up a basic Node/express application. Once we have an app that can run, we're ready to create a Dockerfile.

## Creating the Dockerfile
### Noting the steps required to run the application
For a node.js application;
- the first thing we need to do is to install the dependencies.
  Command: `npm install`
  This will require npm to be installed
- we then run the server with `npm start`

### The initial Dockerfile
```
# specify a base image
FROM alpine

# install dependencies
RUN npm install

# specify default command
CMD ["npm", "start"]
```

With the Dockerfile above in the project, we can try to build the image with;

> docker build .

We are immediately slapped by an error of this sort `/bin/sh: npm: not found`

#### The base image issue
We are getting the error above since the base image does not have the command `npm`; it has not installed `Node Package Manager` to be able to use the command `npm`. We have two options;

- Find a different base image that will pre-include `Node` and `npm`
- Run an additional command with the RUN rule in the Dockerfile to install `Node` and `npm`

For this simple example, we'll opt for the first option and in future, we're going to see how we can create such images for ourselves.

For a start, a node image exists on dockerhub that we can make use of. A peek into the description of the node image, we can see that we have the option of even supplying a version number to the image e.g. `node:8.14` or even a tag for the image e.g. `node:alpine`. Usually, the alpine tag is used to load images that are their own smallest version as possible. In this case, the most stripped down node image available.

### The improved Dockerfile
```
# specify a base image
FROM node:alpine

# install dependencies
RUN npm install

# specify default command
CMD ["npm", "start"]
```

Now that we're guaranteed that the `node:alpine` image is going to include `npm`, we can try to build the image. If we now try to build the image, we're going to get some error messages from `npm` with regards to missing `package.json` - a file that `npm` uses to determine how to handle commands like `npm start` which is the base command of our container. This implies that even though the file may be in our project directory as it surely is, it is not available to the container; remember that a container has its own file system which has no out-of-the-box direct access to the files on our file system.

#### Dealing with the files missing in the container
The goal is to make the files required to run the application available in the container. One way to do this is to copy the needed files into the container using the `COPY` rule in the Dockerfile.

We copy the build files; we need to use the COPY instruction

> COPY <source> <destination>

In the command, `source` refers to the path of the file/dir on the local file system and `destination` refers to the path where the file should be copied to in the container's file system.

The `source` is relative to the location of the Dockerfile i.e. the Build context as specified `docker build <build_context>`. More about the relativity of the `destination` later.

```
# specify a base image
FROM node:alpine

# copy build files to the container
COPY ./ ./

# install dependencies
RUN npm install

# specify default command
CMD ["npm", "start"]
```

We can now try building the image with this file. Optional: Let us also add a tag to our image once built;

> docker build -t johnmutuma5/example-node-app .

And we can try running the application:

> docker run johnmutuma5/example-node-app

We should get a successful behaviour with a message for successful listening if one is printed out e.g. 'listenning on PORT 8080'.

### Sending a request
Now that we have that, we can try using the browser to send a request to `http://locahost:3000`. Use the correct port for the app; it's 3000 for this example.

On sending the request, the client can't reach the site!

#### Container PORT mapping
By default, no network request coming into the local computer is routed into the container's network. This is the reason the client can't access the application since it's running inside the container's network which doesn't receive the host's network requests out of the box.

We need to set up explicit PORT mapping in order to ensure that requests coming through a specified PORT on the host are directed to a specified PORT in the container.

**NB:** *This is a limitation for incoming traffic and not outgoing requests from the container as we already saw that the container can send requests successfully e.g. when installing dependencies.*

PORT forwarding is a runtime constraint i.e. it is determined when running the container and not when building the snapshot/image. We therefore don't set it up in the Dockerfile.

We publish the PORT with the `-p` flag in the `docker run` command;

> docker run -p 3000:3000 johnmutuma5/example-node-app

The to and fro ports do not have to be identical; you can for instance redirect 8080 on localhost to 3000 on the container such that requests coming through PORT 8080 will be redirected to PORT 3000 in the container;

> docker run -p 8080:3000 johnmutuma5/example-node-app

### Specifying a working directory
A working directory is specifies the directory in the container in which the commands will be run including COPY, RUN and CMD. On running COPY, the destination path is set relative to the specified working directory.

Right now, as we have already copied the node app build files without specifying a working directory, the path becomes relative to the root directorty of the container. Issuing an `ls` in the container's shell, we can see these files lying there amongst other files of the container's file system.

We can fireup the container's shell by overwriting the default container command in the run command for an image as seen [earlier](#overwriting-default-command);

> docker run -it johnmutuma5/example-node-app sh

After running the above, we get into the container's shell and we can run shell commands for the container. Running the `ls`  command to see the list of files and directories, this is what we may get;

![](notes-images/container-files.png)

Note how our project files are scattered in the the root directory! This is definitely not the best practice as we may accidentally overwrite the key filesysystem files in the container.

To solve this, we can pass declare the `WORKDIR` instruction specifying the working directory. All subsequent commands will be executed in the container relative to the directory!

NB: We don't have to pre-create the folder in the container. If the specified path does not exist, it'll be automatically created during the build by that instruction.

```
# specify a base image
FROM node:alpine

# specify a working directory
WORKDIR /usr/app

# copy build files to the container
COPY ./ ./

# install dependencies
RUN npm install

# specify default command
CMD ["npm", "start"]
```

The `WORKDIR` not only affects the commands run in the Dockerfile, but also the commands executed in future with `docker exec` and custom commands with `docker run`. For instance, running `docker exec -it <container_id> sh` will fireup the shell in the `WORKDIR`.


# Docker compose
We are going to illustrate by how to use multiple containers with Docker compose by running a Node application container and a Redis container together.

The code for the Node application can be found [here](example-multi-containers).

## Assembling a docker file
We can have a Dockerfile for the Node application part of the equation. i.e. this will have nothing to do with the setup for Redis.

```
FROM node:alpine

WORKDIR /app


COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]
```

With this, we can build an image with `docker build -t johnmutuma5/visits.`. We get an image tagged `johnmutuma5/visits:latest`.

## Introducing Docker Compose
We can try running the image, we will immediately get an error with regards to Redis not being installed. This is because our application is attempting to run with a Redis client while none exists in the container. To illustrate Docker Compose, we are going to focus on setting up a separate container running a Redis server.

We can just run `docker run redis` to download and run a Redis container from dockerhub. Once that is done, running the Node application container throws the same initial redis error. This is because, even though, we have a Redis container running, there is no communication infrastructure setup between the Node application container and the Redis container.

We have two options:

- We can make use of the Docker CLI to run commands that set up the networking infrastructure. This is impractical as it will involve a handful of commands that we'll have to run every time we want to start up a container.

- Using Docker Compose;
  - This is a **separate** CLI tool that gets installed along with Docker
  - It is used to start up multiple containers at a go
  - Automates some of the long-winded commands that we're passing to  `docker run`

  You can try running `docker-compose` on your terminal and you should see a bunch of commands that we can run.


### Docker compose files
This is a `.yml` file in which we can put the same commands that we have been running in the terminal; but we write these commands in the file with a special `.yml` syntax. We then pass this file to the `Docker Compose ` CLI for processing.

![](notes-images/docker-compose-psuedo-code.png)
*[img] illustrates the pseudo-code for creating a Docker Compose file for our Node and Redis containers*

### Some elements of the docker compose file

|element      |isRequired|purpose| type  |
|:------------|:--------:|:------|:------|
|version      | True     | Specifies the version of docker-compose that we are intending to use e.g. '3'| String |
|services     | True     | Ideally, this spells out the containers that we're going to run. In this element, we specify the containers to run and their appropriate; images or build context(if building locally) and PORT mappings. These also act as hostnames for the container| Mapping |

### Networking with docker compose
By running containers with docker compose, they are run as services on the same network and they can be able to exchange information without bounds and without us having to manually specify with PORTS an infrastructure for allowing two containers to communicate; docker-compose does that for us.

The only PORT mapping we have defined in the file below is to allow the local machine to have access to the service by making requests on PORT 4001; which, according to our PORT mapping, will be handled by whichever application is running on PORT 8081 in the container.

```
# docker-compose.yml
version: '3'
services:
  redis-server:
    image: 'redis'
  node-app:
    build: .
    ports:
      - "4001:8081"
```

As mentioned in the table above, the services act as hostnames for the containers; this means that we can use them in places where hostname is required. e.g. DATABASE_URLs like `postgres://postgres:postgress@<hostname>/<database-name>`; if we had a service called 'the-database' running a Postgres container with a database called 'dev-db', the URL would become `postgres://postgres:postgress@the-database/dev-db`.

In our Node application, we need to configure the Redis client to point it to the correct host for the Redis server.

```js
import redis from 'redis';

const client = redis.createClient({
  host: 'redis-server'
})
```
### Docker compose commands
- `docker-compose up` - attempts to run all the services in the `docker-compose.yml` file. It is the multi-container equivalent of `docker run` for a single container

- `docker-compose up --build` - runs all the containers but ensures to try and rebuild them before running. This is useful to ensure that we get the latest changes in files


# Appendix
## Commands
- `docker create <image> [<custom command>]` - create a container from an image
- `docker start <container_id>` - start a container
- `docker run <image> [<custom command>]` - create and run a container
- `docker system prune` - remove all stopped containers
- `docker logs [OPTIONS] <container_id>` - get the log outputs of a container
- `docker stop <container_id>` - stop a container `SIGTERM`
- `docker kill <container_id>` - kill a container `SIGKILL`
- `docker exec -it <container_id> <command>` - execute another command on a running container
- `docker exec -it <container-id> sh` - get full terminal access for a container. Very useful for debugging
