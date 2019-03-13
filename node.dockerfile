FROM node:latest
MAINTAINER Paulo da Luz
COPY . /var/www
WORKDIR /var/www
RUN npm config set strict-ssl false
RUN npm install
ENTRYPOINT ["npm" , "start"]
EXPOSE 3000