const express = require("express");
const router = express.Router({mergeParams: true});
const usersModule = require("../services/usersService");
const notesModule = require("../services/notesService");
const auth = require("../middleware/authentication");

router.post("/users/signup", usersModule.createUser);
router.post("/users/login", usersModule.loginUser);
router.post("/users/logout", auth, usersModule.logoutUser);
router.post("/notes", auth, notesModule.createNote);
router.get("/notes", auth, notesModule.getNotes);
router.get("/notes/:title", auth, notesModule.getSingleNote);
router.put("/notes/:title", auth, notesModule.updateNote);
router.delete("/notes/:title", auth, notesModule.deleteNote);

module.exports = router;
