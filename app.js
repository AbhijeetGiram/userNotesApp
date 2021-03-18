const _ = require("lodash");
const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const connection = require("./dataAccess/lib/connection/connection");
const usernoteAPIController = require("./controllers/usernote-api-controller");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/api/user_notes_app_swagger.json');
const initializeApp = async () => {
    try {
        app.use(express.json());
        
        app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
        app.use('/', usernoteAPIController);

        if (PORT != undefined) {
            await connection.createConnection();
            app.listen(PORT, (errorMsg) => {
                if (errorMsg) throw new Error(errorMsg);
            });
        } else {
            throw new Error("Port number shouldn't be undefined..!!");
        }
        return "Success";
    } catch (ex) {
        await connection.closeConnection();
        return Promise.reject(ex);
    }
}

initializeApp().then((response) => {
    console.log(`App is listening on port: ${PORT}`);
}).catch((ex) => {
    console.log(`Error in initializing the app: ${ex}`);
});
