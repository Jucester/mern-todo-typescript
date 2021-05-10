# TO-DO MERN APP

Simple app with auth and crud to add, edit and delete tasks.

## Stack

* Node.js 15.9.0
* Nestjs 7.5.5
* MongoDB 4.4.0

# How to run it?

## Prerequisites

* Just NodeJS installing in your system and MongoDB (But you can use Atlas) 
 
## Installing


### 1. Clone the repo

```
git clone https://github.com/Jucester/mern-todo-typescript.git
```

### 2. Configuring backend

```
Run npm install and then make an .env file to store your sensitive data
In this file you need to provide this variables:

PORT={Your choice}
MONGO_URL={Mongo url to production}
MONGO_DEV={Mongo url to dev}
MONGO_TEST={Mongo url to testing}
SECRET_KEY={your json web tokens key}
```



### 3. Configuring frontend:

```
Run npm install and then make an .env file to store your backend url:

REACT_APP_BACKEND_URL={backend url, example: http://localhost:4000/api/1.0}
```

### 4. Run the apps

```
You can run in dev mode with npm run dev or in production with npm start

You can also execute automated test in backend with npm test
```

The app will be running in the frontend in [http://localhost:3000](http://localhost:3000), and the API will be at [http://localhost:4000](http://localhost:4000).

You can change the ports and test the api with postman

