const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const appUtils = require("../service/utils");
const { body, param } = require("express-validator");
const { deleteUser } = require("../service/users");


router.get("/", userController.getAll);

router.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  userController.postUser
);

router.get(
  "/:id",
  param("id").isNumeric({ no_symbols: true }),
  appUtils.authenticateToken,
  userController.getOne
);

router.put(
  "/:id",
  param("id").isNumeric({ no_symbols: true }),
  body("userName").isLength({ min: 4 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  appUtils.authenticateToken,
  userController.putUser
);

router.delete(
  "/id",
  deleteUser,
  param("id").isNumeric({ no_symbols: true }),
  appUtils.authenticateToken
);

router.post(
  "/auth/login",
  body("email").isLength(),
  body("password").isLength({ min: 4 }),
  userController.postLogin
);

module.exports = router;
