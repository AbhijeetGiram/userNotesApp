const _ = require("lodash");
const User = require("../../entities/user");

const insert = async (userObj) => {
    try {
        return userObj.save({runValidators: true});
    } catch (ex) {
        throw new Error(ex);
    }
}

const remove = async (query) => {
    return await User.deleteOne(query);
}

const findOne = async (query) => {
    return await User.findOne(query);
}

module.exports.insert = insert;
module.exports.remove = remove;
module.exports.findOne = findOne;
