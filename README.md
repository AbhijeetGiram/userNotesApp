# User Notes App Project
User Notes App
  
## Table of Contents
* [How to Run the App](#How-to-run-the-server-locally)
* [Setting up swagger document to make requests locally](#Setting-swagger-app)


## How To Run The server locally

### Running the local server (make network requests)

1. Install the npm modules (By running the below command):

    ```
    npm install
    ```
2. Start the app

    ```
    npm run start
    ```

3. View app in your browser at: http://localhost:4000/


## Setting swagger app

### Running the swagger locally (does not make network requests)

1. Run swagger locally (By running the below command in the broswer):

    ```
    http://localhost:4000/apidocs
    ```

# URLs / APIs

## POST `/users/signup`

Signup api for the user (Creates the user)

For signup API:

- Example body:
```json5
{
    "name": "test1 user",
    "email": "test1@gamil.com",
    "password": "12345678"
}
```
URL: http://localhost:4000/users/signup

Example output:
```json5
{
    "result": {
        "_id": "605397395129c359adaf0876",
        "name": "test1 user",
        "email": "test1@gamil.com",
        "createdAt": "2021-03-18T18:08:57.468Z",
        "updatedAt": "2021-03-18T18:08:57.540Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUzOTczOTUxMjljMzU5YWRhZjA4NzYiLCJpYXQiOjE2MTYwOTA5Mzd9.74e73Y3a9Oyh_pmqEB51cx2xZgt2u4sFto2EloB2Di0"
}
```

## POST `/users/login`

Login api for the user (login the user)

For login API:

- Example body:
```json5
{
    "email": "test1@gamil.com",
    "password": "12345678"
}
```
URL: http://localhost:4000/users/login

Example output:
```json5
{
    "user": {
        "_id": "605397395129c359adaf0876",
        "name": "test1 user",
        "email": "test1@gamil.com",
        "createdAt": "2021-03-18T18:08:57.468Z",
        "updatedAt": "2021-03-18T18:10:47.991Z",
        "__v": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUzOTczOTUxMjljMzU5YWRhZjA4NzYiLCJpYXQiOjE2MTYwOTEwNDd9.7PPkNG5t4lAmNhMbq2_fYCpaOELevpZcdb_BYeFf68Q"
}
```

## POST `/users/logout`

Logout api for the user (logout the user)

For logout API:

URL: http://localhost:4000/users/logout

Header:
    - Authorization: Bearer token

Example output:
```json5
statusCode 200
```

## POST `/notes`

API to create a note for logged in user (note for the user)

For notes API:

Header:
    - Authorization: Bearer token

- Example body:
```json5
{
    "title": "test note1",
    "description": "My test note"
}
```
URL: http://localhost:4000/notes

Example output:
```json5
{
    "_id": "60539aa578b36c59e8352c7a",
    "title": "test note1",
    "description": "My test note",
    "owner": "605397395129c359adaf0876",
    "createdAt": "2021-03-18T18:23:33.798Z",
    "updatedAt": "2021-03-18T18:23:33.798Z",
    "__v": 0
}
```

## GET `/notes`

API to get the notes for the logged in user (notes for the user)

For notes API:

Header:
    - Authorization: Bearer token

Query Params:
    - `<limit>`: limit the notes for page
    - `<skip>`: skip the notes for page

URL: http://localhost:4000/notes

Example output:
```json5
[
  {
    "_id": "60539aa578b36c59e8352c7a",
    "title": "test note1",
    "description": "My test note",
    "owner": "605397395129c359adaf0876",
    "createdAt": "2021-03-18T18:23:33.798Z",
    "updatedAt": "2021-03-18T18:23:33.798Z",
    "__v": 0
  },
  {
    "_id": "60539c3878b36c59e8352c7c",
    "title": "test note2",
    "description": "My 2nd test note",
    "owner": "605397395129c359adaf0876",
    "createdAt": "2021-03-18T18:30:16.577Z",
    "updatedAt": "2021-03-18T18:30:16.577Z",
    "__v": 0
  }
]
```

## GET `/notes/{title}`

API to get notes for the logged in user by note title (note by title for the user)

For getting note by title API:

Header:
    - Authorization: Bearer token

URL: http://localhost:4000/notes/{title}

Example output:
```json5
[
  {
    "_id": "60539c3878b36c59e8352c7c",
    "title": "test note2",
    "description": "My 2nd test note",
    "owner": "605397395129c359adaf0876",
    "createdAt": "2021-03-18T18:30:16.577Z",
    "updatedAt": "2021-03-18T18:30:16.577Z",
    "__v": 0
  }
]
```

## PUT `/notes/{title}`

API to update a note for the logged in user by note title (update the note for the user)

For note update API:

Header:
    - Authorization: Bearer token

- Example body:
```json5
{
  "title": "test note22",
  "description": "updated value from test note2 to test note22"
}
```
URL: http://localhost:4000/notes/{title}

Example output:
```json5
{
  "_id": "60539c3878b36c59e8352c7c",
  "title": "test note22",
  "description": "updated value from test note2 to test note22",
  "owner": "605397395129c359adaf0876",
  "createdAt": "2021-03-18T18:30:16.577Z",
  "updatedAt": "2021-03-18T18:45:09.906Z",
  "__v": 0
}
```

## DELETE `/notes/{title}`

API to delete note for the logged in user (delete note for the user)

For Delete API:

URL: http://localhost:4000/notes/{title}

Example output:
```json5
{
  "_id": "60539c3878b36c59e8352c7c",
  "title": "test note22",
  "description": "updated value from test note2 to test note22",
  "owner": "605397395129c359adaf0876",
  "createdAt": "2021-03-18T18:30:16.577Z",
  "updatedAt": "2021-03-18T18:45:09.906Z",
  "__v": 0
}
```
