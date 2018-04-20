FROM node:alpine

ADD . /app

WORKDIR /app

RUN npm install && \
    npm run build

EXPOSE 8080

ENTRYPOINT ["npm", "run", "serve", "dist"]