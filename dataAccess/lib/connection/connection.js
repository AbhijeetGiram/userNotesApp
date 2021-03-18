const mongoose = require("mongoose");
const DB_NAME  = process.env.DB_NAME || "usernotesdb";
const createConnection = async () => {
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }

    let mongo_url = `mongodb://localhost/${DB_NAME}`;
    try {
        await mongoose.connect(mongo_url, options);
        console.log("Connected successfully to mongo server..!!");
    } catch (ex) {
        console.log(`Could not connect to mongo server..!!`);
        throw ex;
    }
}

const closeConnection = async () => {
    mongoose.connection.close();
}

module.exports.createConnection = createConnection;
module.exports.closeConnection  = closeConnection;
