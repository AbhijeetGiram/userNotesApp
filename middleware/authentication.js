const User = require("../dataAccess/lib/entities/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "testsecret";
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decodedToken._id, "tokens.token": token });
        
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (ex) {
        res.status(401).send({ error: ex.message });
    }
}

module.exports = auth;