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
