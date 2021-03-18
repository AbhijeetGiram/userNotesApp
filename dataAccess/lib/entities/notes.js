const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Note = mongoose.model("Note", noteSchema);


module.exports = Note;