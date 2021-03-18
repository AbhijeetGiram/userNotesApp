const _ = require("lodash");
const Note = require("../../entities/notes");
const insert = async (noteObj) => {
    try {
        return noteObj.save({runValidators: true});
    } catch (ex) {
        throw new Error(ex);
    }
}

const find = async (query, paginate) => {
    try {
        const result = await Note.find(query, null, paginate);
        if (_.isEmpty(result)) {
            return new Error(`Unable to find any note with query ${query}`);
        } else {
            return result;
        }
    } catch (ex) {
        throw new Error(ex);
    }
}
const upsert = async function (data) {
    return new Promise((resolve, reject) => {
      Note.findOneAndUpdate(
        { title: data.title },
        data,
        { upsert: true, runValidators: true, returnNewDocument: true, new: true },
        function (err, rawResponse) {
          if (err) {
            reject(new Error('Error in creating/updating system configurations'));
          }
          resolve(rawResponse);
        });
    });
}

const remove = async (query) => {
    return await Note.findOneAndDelete(query);
}

module.exports.insert = insert;
module.exports.find = find;
module.exports.upsert = upsert;
module.exports.remove = remove;
