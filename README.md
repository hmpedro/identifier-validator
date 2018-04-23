# Identifier Validator

**Identifier Validator** is a proof of knowledge that a full stack developer need.

#### Requirements

- Node.js 
- Mongodb
- Docker(For production mode)
- docker-compose(For production mode)

#### Development setup

- Download or clone identifier-validator latest release
- Both frontend and backend are in the same repository, so you need to enter each folder to install the dependencies
- Run `$ npm install` in each folder
- Go to the backend folder and set the Mongo URL that you want to use in the .env file based on .env.sample
  - Ps: I suggest to use Mongo Lab
- Run `$ npm start` in the backend folder
- Run `$ npm run serve` in the frontend folder
- Open the browser at localhost:8080

#### Production

- You will need Docker and docker-compose
- At root folder of the project
- Run `$ docker-compose build `
- Run `$ docker-compose up `
- Open the browser at localhost:8080

Ps: If you're using docker-tools that use a VM be careful with the ports.

### License
[Licence](https://github.com/rodrigogs/debuggler/blob/master/LICENSE) © Pedro Henrique Mognon
