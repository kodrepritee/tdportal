# version - 1.00<clusterurl>.0

user can create, delete and update the to-do list using this repository.

## prerequisites
you must have following : 

* [node] (https://nodejs.org/docs/latest/api/) - v16.13.2
* [npm] (https://www.npmjs.com) - v8.1.2 - package manager
* [mongoDb] - 
  - https://www.mongodb.com/cloud/atlas/register
  - create account and login
  - create a project once successful go to project and create a database [you can choose 'Free Tier']
  - create and run cluster
  - connecting via driver ex url - [ mongodb=mongodb+srv://<username>:<pssword>@cluster-01.pbr7skn.mongodb.net/<dbname>?retryWrites=true&w=majority ]



### development and installtion setup

* go to .env file under server folder and change <UserName>, <Passwrod>,  <clusterurl> and <dbname>

* Need to treminal to run frontend and backend

For local developmet for backend server
```
  cd server
  npm install
  npm run start

```

For local developmet for frontend
```
  cd tdportalinterface
  npm install
  npm start

```