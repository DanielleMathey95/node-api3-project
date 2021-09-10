const User = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`${timestamp} ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      req.user = user;
      next();
    }
  } catch {
    res.status(500).json({
      message: "Issue finding user",
    });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    req.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log("validatePost middleware");
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
