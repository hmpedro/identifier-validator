# Identifier Validator

**Identifier Validator** is a proof of knowledge that a full stack developer need.

#### Requirements

- Node.js **7.6.0 >** 
- Mongodb
- Docker(For production mode)
- docker-compose(For production mode)

#### Development setup

- Download or clone github-metrics latest release
- Both frontend and backend are part of the same repository, so you need to enter in each folder to install the dependencies
- Install `$ npm install`
- Set the Mongo URL that you want to use in .env file based on .env.sample
- Run `$ npm start` in backend folder
- Run `$ npm start` in frontend folder
- Open the browser at localhost:8080

#### Production

- You will need Docker and docker-compose
- At root folder of the project
- Run `$ docker-compose build `
- Run `$ docker-compose up `
- Open the browser at localhost:8080

### License
[Licence](https://github.com/rodrigogs/debuggler/blob/master/LICENSE) © Pedro Henrique Mognon
