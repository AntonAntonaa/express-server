const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const appUtils = require("../service/utils");
const { body, param } = require("express-validator");
const { deleteUser } = require("../service/users");

router.get("/", userController.getAll);

router.post(
  "/",
  body("userName").isLength({ min: 5 }),
  body("email").isEmail(),
  body("dob").isDate(),
  body("password").isLength({ min: 8 }),
  userController.postUser,
  appUtils.authenticateToken
);

router.get(
  "/:id",
  param("id").isNumeric({ no_symbols: true }),
  userController.getOne,
  appUtils.authenticateToken
);

router.put(
  "/:id",
  param("id").isNumeric({ no_symbols: true }),
  body("userName").isLength({ min: 5 }),
  body("email").isEmail(),
  body("dob").isDate(),
  body("password").isLength({ min: 8 }),
  userController.putUser,
  appUtils.authenticateToken
);

router.delete(
  "/id",
  deleteUser,
  param("id").isNumeric({ no_symbols: true }),
  appUtils.authenticateToken
);

router.post(
  "/auth/login",
  body("userName").isLength({ min: 5 }),
  body("password").isLength({ min: 8 }),
  userController.postLogin
);

module.exports = router;
