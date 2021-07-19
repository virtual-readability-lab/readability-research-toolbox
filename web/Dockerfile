# base image
FROM node:16.3.0-alpine3.11 as build-stage

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:1.21-alpine
ARG PORT=8080
ENV PORT=$PORT

COPY nginx.conf /etc/nginx/templates/default.conf.template
# copy static resources
COPY --from=build-stage /app/build /usr/share/nginx/html


