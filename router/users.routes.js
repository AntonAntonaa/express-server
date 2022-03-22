const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const appUtils = require("../service/utils");
const { body, param } = require("express-validator");

router.get("/", userController.getAll);

router.post(
  "/",
  appUtils.authenticateToken,
  body("userName").isLength({ min: 5 }),
  body("email").isEmail(),
  body("dob").isDate(),
  body("password").isLength({ min: 8 })
);

router.get(
  "/:id",
  appUtils.authenticateToken,
  param("id").isNumeric({ no_symbols: true })
);

router.put(
  "/:id",
  appUtils.authenticateToken,
  param("id").isNumeric({ no_symbols: true }),
  body("userName").isLength({ min: 5 }),
  body("email").isEmail(),
  body("dob").isDate(),
  body("password").isLength({ min: 8 })
);

router.delete(
  "/id",
  appUtils.authenticateToken,
  param("id").isNumeric({ no_symbols: true })
);

router.post(
  "/auth/login",
  body("userName").isLength({ min: 5 }),
  body("password").isLength({ min: 8 })
);

module.exports = router;
