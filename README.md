## Objective

https://user-images.githubusercontent.com/336681/228005227-2c89ff64-96ba-4ebd-b405-bb1c75937e2b.mp4

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

You will need to:
1. Add your OpenAI API key to `backend/config/config.py`
2. Implement the API endpoints in `backend/flask_docker/api.py`

Notes:
- To make database queries, use `get_db().fetch("SELECT ... WHERE foo=%s", ("bar",))` or `get_db().insert(...)` or `get_db().execute(...)`. 
- You can use adminer to manage the SQL database by visiting http://localhost:8082 in your browser. The hostname should be `mariadb` (as specified in the docker-compose.yml) and the root password is `password`
    <img width="1070" alt="Screenshot 2023-03-28 at 12 13 06 AM" src="https://user-images.githubusercontent.com/336681/228006282-3c2ddf3b-072e-461d-8b7b-61c01fb5c431.png">
- The flask DEBUG flag is set to true, which enables hot-reloading of the flask application, so you won't need to re-build the docker-compose stack when you make changes. 

## Frontend

To start the frontend, open the `frontend` folder and run `yarn install` and then
```
$ yarn start
```
Your browser should open to http://localhost:3000

The front-end code should be fully-functional if the backend endpoints are implemented correctly. 

Feel free to improve the UI/UX. It's not part of the evaluation criteria, though. 
