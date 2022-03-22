const express = require('express');

const router = express.Router();
const usersRoutes = require('./users.routes')
//const authRoutes = require('./auth.routes')

router.use('/users', usersRoutes)
//router.use('/auth', authRoutes)

module.exports = router