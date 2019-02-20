# begin build phase
#
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
#
# begin the run phase
#
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
#


