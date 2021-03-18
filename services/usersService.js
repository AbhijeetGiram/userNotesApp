const _ = require("lodash");
const User = require("../dataAccess/lib/entities/user");
const usermodule = require("../dataAccess/lib/services/entityservices/user");
const BEGINSTR = "BEGIN";
const ENDSTR = "END";

async function createUser(req, res) {
    const METHODNAME = "createUser():: ";
    console.log(METHODNAME + BEGINSTR);
    try {
        let newUser = new User(req.body);

        await usermodule.findOne({ name: newUser.name }).then(async (userProfile) => {
            if (!userProfile) {
                await usermodule.insert(newUser).then(async (result) => {
                    console.log("New user created: ", result);
                    const token = await newUser.generateAuthToken();
                    res.status(201).send({ result, token });
                })
            } else {
                res.status(200).send({ message: "User already exists" });
            }
        }).catch((ex) => {
            res.status(400).send(ex.message);
        });
    } catch (ex) {
        console.log("Error ocurred while creating a user", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}

async function loginUser(req, res) {
    const METHODNAME = "loginUser():: "
    console.log(METHODNAME + BEGINSTR);
    try {
        const user = await User.findUserByCreds(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (ex) {
        console.log("Error ocurred while user login", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}

async function logoutUser(req, res) {
    const METHODNAME = "logoutUser():: "
    console.log(METHODNAME + BEGINSTR);
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.status(200).send();
    } catch (ex) {
        console.log("Error ocurred while user logout", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
