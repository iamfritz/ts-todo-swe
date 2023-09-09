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
API_KEY=abc123
API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZjNzNlZDU1NTRjODE0NTA5YzU4NzgiLCJ1c2VyRW1haWwiOiJWZWxkYS5SZXlub2xkc0B5YWhvby5jb20iLCJpYXQiOjE2OTQyNjYzNjQsImV4cCI6MTY5NDM1Mjc2NH0.4yTqJwMWKtLaUCuGu61Gx6mZvfT6L-dDMPVzZEzsPi8
```

## SETTING UP 
- Clone the repositury to your machine
- Open up a terminal
- Navigate into the project directory
- Run 
```
npm install
```
```
npm run build
```
```
npm run start
```

- The server runs on port 3000 <code>http://localhost:3030/</code>

# Migration
- add API Keys
- add default User Roles
```
npm run migrateApiRoles
```

## RUN Test
- Register User
- Login User to get the Token and add to .env API_TOKEN=token

```
npm run test
```

### TODO

* Tasks
* Category
* User
* Role 
* authJWT
* authKey


## Postman
https://documenter.getpostman.com/view/780774/2s9YC1WEAp