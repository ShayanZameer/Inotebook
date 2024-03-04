const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE:1 GET ALL THE NOTES

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ROUTE:2 ADD  THE NOTES using post

router.post(
  "/addnote",
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength(5),
    body("tag").isLength({ min: 1 }),
  ],
  fetchuser,
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ROUTE:3 Update THE NOTES using put and the only logged in user upddate his notes only

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
try {
    

  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(404).send("Unauthorized Access");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  res.json(note);
} catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ROUTE:4 Delete THE NOTES using Delete and the only logged in user delete his notes only

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  
try {
    

  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(404).send("Unauthorized Access");
  }
  note = await Note.findByIdAndDelete(
    req.params.id
  );

  res.json({"Success":"Successfully Deleted"});

} catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
