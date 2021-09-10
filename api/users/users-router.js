const express = require("express");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
// You will need `users-model.js` and `posts-model.js` both
const User = require("./users-model");
const Post = require("../posts/posts-model");

const router = express.Router();

router.get("/", (req, res) => {
  User.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post("/", validateUser, (req, res) => {
  User.insert({ name: req.name })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  User.update(req.params.id, { name: req.name })
    .then(() => {
      return User.getById(req.params.id);
    })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  try {
    await user.Remove(req.params.id);
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
