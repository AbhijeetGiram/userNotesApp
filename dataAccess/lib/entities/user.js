const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const Note = require("../entities/notes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password should not be containing any 'password' keyword");
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.virtual("notes", {
    ref: "Note",
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return userObj;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, "testsecret");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.statics.findUserByCreds = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Unable to login with given credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login with given credentials");
    }
    
    return user;
}

// Hash password before saving into the db
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Delete all notes related with user when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this;
    await Note.deleteMany({ owener: user._id });
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
