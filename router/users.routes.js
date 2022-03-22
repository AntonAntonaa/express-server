const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const appUtils = require("../service/utils");
const { body, param } = require("express-validator");
const { deleteUser } = require("../service/users");


router.get("/", userController.getAll);

router.post(
  "/",
  appUtils.authenticateToken,
  body("userName").isLength({ min: 5 }),
  body("email").isEmail(),
  body("dob").isDate(),
  body("password").isLength({ min: 8 }),
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
  body("userName").isLength({ min: 5 }),
  body("email").isEmail(),
  body("dob").isDate(),
  body("password").isLength({ min: 8 }),
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
  body("userName").isLength({ min: 5 }),
  body("password").isLength({ min: 8 }),
  userController.postLogin
);

module.exports = router;
