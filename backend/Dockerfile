FROM node:alpine

ADD . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "./bin/www"]
