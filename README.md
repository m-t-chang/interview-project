
## Backend

To start the backend, open the `backend` folder and run
```
$ docker-compose build && docker-compose up
```

To stop the backend
```
$ docker-compose down
```
Add `--volumes` to delete the persisted volumes. 

Notes:
- You can use adminer to manage the SQL database by visiting http://localhost:8082 in your browser. The hostname should be `mariadb` (as specified in the docker-compose.yml) and the root password is `password`
- The flask DEBUG flag is set to true, which enables hot-reloading of the flask application.
- The OpenAI API key is stored in `config/config.py`. Make sure you do not commit the API key. 

## Frontend

To start the frontend, open the `frontend` folder and run `yarn install` and then
```
$ yarn start
```
Your browser should open to http://localhost:3000


