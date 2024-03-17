const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Shayanisagoodb$oy";
// ROUTE:1 Create a User using POST endpoint = /api/auth. Does not require login. New user is created and stored in the database.
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    // body("description").isLength(100),
    // body("tag").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      let success = false;

      // Validate input data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      // Check if user with email exists already or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry, user already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Save the user to the database
      await user.save();

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
    }
  }
);

// ROUTE:2 Endpoint of login  or authenticate a user

// Endpoint for login or authenticate a user
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ROUTE:3 GET THE DETAILS OF LOGIN USER LOGIN REQUIRED

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
