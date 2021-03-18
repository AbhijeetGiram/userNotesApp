const _ = require("lodash");
const Note = require("../dataAccess/lib/entities/notes");
const notesmodule = require("../dataAccess/lib/services/entityservices/notes");
const BEGINSTR = "BEGIN";
const ENDSTR = "END";

async function createNote(req, res) {
    const METHODNAME = "createNote():: ";
    console.log(METHODNAME + BEGINSTR);
    try {
        let note = new Note({
            ...req.body,
            owner: req.user._id
        });
        await notesmodule.insert(note).then((result) => {
            console.log("Note created: ", result);
            res.status(201).send(result);
        }).catch((ex) => {
            console.log("Error", ex.message);
            res.status(400).send(ex.message);
        });
    } catch (ex) {
        console.log("Error ocurred while creating a note", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}

async function getNotes(req, res) {
    const METHODNAME = "getNotes():: "
    console.log(METHODNAME + BEGINSTR);
    try {
        let query = { owner: req.user._id };
        let skip = req.query.skip ? parseInt(req.query.skip) : 0;
        let limit = req.query.limit ? parseInt(req.query.limit) : 4;
        let paginate = { skip, limit };
        let result = await notesmodule.find(query, paginate);
        if (!result) {
            res.status(404).send();
        }
        res.status(200).send(result);
    } catch (ex) {
        console.log("Error ocurred while getting notes", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}

async function getSingleNote(req, res) {
    const METHODNAME = "getSingleNote():: "
    console.log(METHODNAME + BEGINSTR);
    try {
        let query = {
            title: req.params.title,
            owner: req.user._id
        }
        let result = await notesmodule.find(query);
        if (!result) {
            res.status(404).send();
        }
        res.status(200).send(result);
    } catch (ex) {
        console.log("Error ocurred while getting a note", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}

async function updateNote(req, res) {
    const METHODNAME = "updateNote():: "
    console.log(METHODNAME + BEGINSTR);
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["title", "description"];
        const valid = updates.every((update) => allowedUpdates.includes(update));

        if (!valid) {
            return res.status(400).send({ error: "Not a valid update" });
        }

        const note = await Note.findOne({ title: req.params.title, owner: req.user._id });

        if (!note) {
            return res.status(404).send({ message: "Note with given title not present" });
        }

        updates.forEach((update) => note[update] = req.body[update]);

        await notesmodule.insert(note).then((result) => {
            console.log("Note updated: ", result);
            res.status(200).send(result);
        }).catch((ex) => {
            console.log("Error", ex.message);
            res.status(400).send(ex.message);
        });
    } catch (ex) {
        console.log("Error ocurred while updating a note", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}

async function deleteNote(req, res) {
    const METHODNAME = "deleteNote():: "
    console.log(METHODNAME + BEGINSTR);
    try {
        let query = {
            title: req.params.title,
            owner: req.user._id
        }
        let result = await notesmodule.remove(query);
        res.status(200).send(result);
    } catch (ex) {
        console.log("Error ocurred while deleting a note", ex.message);
        res.status(400).send(ex.message);
    }
    console.log(METHODNAME + ENDSTR);
}

module.exports.createNote = createNote;
module.exports.getNotes = getNotes;
module.exports.getSingleNote = getSingleNote;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote;
