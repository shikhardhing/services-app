# services-app

services-app is a simple stateless microservice app in Nodejs, with three major functionalities -
- Authentication
- JSON patching
- Image Thumbnail Generation

 To know more, check out [docs](https://shikhardhing.github.io/services-app/) and [Code Coverage report](https://shikhardhing.github.io/services-app/test-coverage)

### Installation

##### Using npm
 Clone the repository, install npm dependencies, build and run

   ```
   $ git clone https://github.com/shikhardhing/services-app
   $ npm install
   $ npm run build
   $ npm start
   ```

##### Using docker

 Clone the repository, build docker image and run

   ```sh
   $ git clone https://github.com/shikhardhing/services-app
   $ cd services-app
   $ docker build -t <username>/services-app
   $ docker run -p 3000:3000 -d <username>/services-app
   ```


### Usage

  - POST /login:

    Provide an arbitrary username/password pair to obtain a JWT token
    ```sh
    $ curl -XPOST -H "Content-Type: application/json" localhost:3000/login -d '{"username": "user", "password": "password"}'
    ```

  - POST /api/thumbnail:

    Provide a public image URL in query, with a valid JWT token obtained from /login to get 50*50 pixel thumbnail as response
    ```sh
    curl -XPOST -H "Authorization: JWT <token>" http://localhost:3000/api/thumbnail\?url\=https://cdn.pixabay.com/photo/2017/09/03/17/26/woman-2711279_960_720.jpg
    ```

  - POST /api/patch:

    Provide a JSON document and patch object, with a valid JWT token obtained from /login to get a patched json object
    ```sh
    curl -XPOST -H "Authorization: JWT <token>" -H "Content-Type: application/json" http://localhost:3000/api/patch -d '{"document": { "firstName": "Albert", "contactDetails": { "phoneNumbers": [] } },"operation": [{ "op": "replace", "path": "/firstName", "value": "Joachim" },{ "op": "add", "path": "/lastName", "value": "Wester" },{ "op": "add", "path": "/contactDetails/phoneNumbers/0", "value": { "number": "555-123" } }]}'
    ```

### Testing

 - Run the tests using npm:
 ```sh
 $ npm run test
 ```

 - For linting (using standard-js)
 ```sh
 $ npm run lint
 ```

 - Get code coverage
 ```sh
 $ cd dist
 $ istanbul cover ./node_modules/.bin/_mocha
 ```
