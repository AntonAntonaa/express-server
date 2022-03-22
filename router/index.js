const express = require('express');

const router = express.Router();
const usersRoutes = require('./users.routes')

router.use('/users', usersRoutes)
//router.use('/auth', authRoutes)

module.exports = router