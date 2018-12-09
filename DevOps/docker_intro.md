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
  > docker attach <container_name

- running ping
  > apt-get update && apt-get install iputils-ping 




## Appendix
- Getting an image's configuration
  > docker inspect <image_name>

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
