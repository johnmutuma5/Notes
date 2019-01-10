# Table of Contents
- [Fundamentals of Docker](#fundamentals-of-docker)
  - [Docker networking](#docker-networking)

# What is docker
Docker is a containerisation tool.

# Fundamentals of Docker
Docker packages the needed applications into a single unit called an image.
- When images are run via Docker, they are called containers.
- It is possible to run many containers based on an image

An image is an immutable file, essentially a template for containers.

Images are created with the build command:
> docker build -t my-sample-app

Images create containers when started with the `run` command:
> docker run -p 8080:8080 sample-web-app

Images can be stored in a docker registry, DockerHub:
> docker push my-repo/my-image:latest

> docker pull my-repo/my-image:latest

## Docker networking
On installing Docker, it creates three networks by default. To view the available networks, use the command:
> docker network ls

By default, Docker containers connect to the `bridge` network. You can pass the `--network` flag to the `run` command to specify a network which the running instance of the container should connect to.

We can see various information about a network by running:
> docker network inspect <network_name>

Docker containers' shells can communicate with each others network. e.g. if we run an ubuntu container and use our localhost terminal to ping the IPV4 address of the container as it can be read from the inspect command above, the connection fails. But if we can run two ubuntu containers and use one to ping the other, the connection is successful. We can do that by;

- pulling the ubuntu image
  > docker pull ubuntu:latest

- running the containers in interactive mode with telnet flag
  > docker run -it --detach --name=<container_name> ubuntu

- accessing the bash shell of a container
  > docker attach <container_name>

- running ping
  > apt-get update && apt-get install iputils-ping

## The Dockerfile
Docker looks for a Dockerfile for instructions of how to build an image. This is a plain text file that is stored in the application's directory.

Dockefile lines are either comments or instructions; comments a preceded with a `#` sign and ignored by docker. By convention, an instruction should be in uppercase although docker doesn't require that.


## Commands in the Dockerfile
### FROM
The `FROM` command specifies the base image for the docker containers. Helps use an image for a base Operating system as the basis as opposed to building a host OS for the containers. The base image includes just enough items of the OS to enable containers to run on top of.

> FROM ubuntu:latest

### RUN
Executes specified commands while building the image. Runs exactly as if you typed it on a SHELL in the guest OS.

It can be run in two ways;
- SHELL form - it's more dynamic
  > RUN apt-get update -y

- EXEC form
  > RUN ["apt-get", "update", "-y"]

### ENTRYPOINT
This is the Shell executable to be run by the container. e.g. `python`, `mongod`, `redis` etc. It also supports the Shell and Exec forms as the `RUN` command above. There can only be one `ENTRYPOINT` instruction per Dockerfile. If there are additional arguments that you'd like to have always included after the executable, you can use the Exec form of the command.

> ENTRYPOINT ["python3"]

### CMD
The holds a list of arguments that gets passed to the executable in the `ENTRYPOINT`. If no `ENTRYPOINT` has been set, the first item in this array is treated as the `ENTRYPOINT`. We can only have one CMD instruction per Dockerfile.

> CMD ["app.py"]

Running the docker container with additional arguments overwrites the options specified in this command.

> docker run -p 8080:8080 <image_name> alternate.py

The above command would replace `app.py` with `alternate.py` in the docker instructions. This also has a Shell form in which the command is run in `/bin/sh` Shell.

> CMD echo "Hello, world!"

### WORKDIR
Specifies a new default directory within the images file system. Any `RUN`, `ADD` or `COPY` command executed after this commmand will be executed in the specified directory.

> WORKDIR /app

When the container lauches, the command specified by the `ENTRYPOINT` and `CMD` commands will be run in the `WORKDIR` directory.


### COPY
This copies files from the local file system relative to the `Dockerfile`'s path and copies them to the images file system relative to the WORKDIR; unless preceded with a `/` which copies as an absolute path i.e. relative to the root directory of the image's file system.

> COPY path/relative/to/Dokerfile/file.ext path/relative/to/WORKDIR/file.ext

### ADD
Does everything that COPY can do in addition to being able to download files from a URL and even unzip compressed ones.

### EXPOSE
Containers' networks are not accessible to the world but are accessible by other containers. `EXPOSE` makes it possible for the containers' networks to be accessed by the rest of the world.

> EXPOSE 8080

### ENV
Used for setting environment variables for the container.

> ENV ENV=development messages="Hello, world" appDir=/app

You can have multiple ENV command in the same file or have space-delimited settings on the same command as illustrated above.

Once you've set an ENV variable you can access it later in the Dockerfile using the syntax;

> WORKDIR $appDir

To use a variable name where it may not be surrounded by spaces, use `{}`;

e.g. This won't work
> COPY test_file.text $appDir/subfolder/test_file.txt

but this will work
> COPY test_file.text ${appDir}/subfolder/test_file.txt

### USER
Docker containers run by default as the root user on the container. They have full administrative privileges on the container. We can use `USER` to set the desired user.

```
RUN useradd lazuli
USER lazuli
CMD whoami
```

The new user will not have write access to the image file system. We can grant full file privileges to the user.

This would fail:
```
RUN useradd lazuli
USER lazuli
CMD whoami > /app/whoami.txt
```
This would work:
```
RUN useradd lazuli
WORKDIR /app
RUN chown lazuli /app
USER lazuli
CMD whoami > /app/whoami.txt
```

We can check the file owneship
> docker build -t lazuli .

> docker run lazuli ls -l

## Managing Images and Containers
When a container is running in detached mode, we can run additional commands on the container with `docker exec`;

> docker exec -it <my_image> <executable_>

e.g.
> docker exec -it lazuli /bin/bash





## Appendix
- Getting an image's configuration
  > docker inspect <image_name>

- Getting all images on a docker host
  > docker images

- Getting all containers in a docker host
  > docker ps -a

- Removing an image from a docker host
  > docker rmi <image_tag>

- Getting container logs
  > docker logs <container_hash/name>

- Create a container from an image
  > docker run -p <port_to_publish>:<exposed_port> <image_to_use>

  We can add `--detach` flag to have the container run in the background releasing the terminal.
  We can also give a name to our container `--name=<container_name>`.

- Get a list of all running containers
  > docker ps

  `ps` stands for process status.

- Stopping a docker container
  > docker stop <container_hash>

- Access the bash shell of a container
  > docker attach <container_name>
