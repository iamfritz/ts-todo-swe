# Typescript Nodejs Mongodb CRUD
# Modules
User with User Role
Post with Category

# Authentication
API Key
Login Authentication

# env
```bash
DATABASE_URL=mongodb://127.0.0.1:27017/todoapp
PORT=3030
JWT_SECRET=DOREMIFASO 
```

## SETTING UP 
- Clone the repositury to your machine
- Open up a terminal
- Navigate into the project directory
- Run <code>npm install</code> to install all needed dependencies
- Run <code>npm run build</code>
- Run <code>npm run start</code>
- The server runs on port 3000 <code>http://localhost:3030/</code>

# Migration
- add Api Keys
- add default roles
```
npm run migrateApiRoles
```

## RUN Test
- Register User
- Login User and get the Token and add to env

npm run test

### TODO

* Tasks
* Category
* User
* Role 
* authJWT
* authKey


## Postman
https://documenter.getpostman.com/view/780774/2s9YC1WEAp