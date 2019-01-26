# specify a base image
FROM node:alpine

# specify a working directory
WORKDIR /usr/app

# copy package.json to install dependencies
COPY package.json .
# install dependencies
RUN npm install

# copy other build files to the container
COPY . .

# specify default command
CMD ["npm", "start"]
