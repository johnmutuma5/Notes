# base image
FROM ubuntu:latest


# working directory
WORKDIR /app

# python project dependencies
COPY requirements.txt requirements.txt

# commands to run to install dependencies
RUN apt-get update -y
RUN apt-get install -y python3 python3-pip
RUN pip3 install -r requirements.txt

# when you pass commands to the container, what should interprete them?
ENTRYPOINT ["python3"]

# command to run when the container starts
CMD ["app.py"]

# copy from the local folder to the docker container
COPY app.py app.py

# make port available
EXPOSE 8080
