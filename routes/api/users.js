const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
// Routes
// all requests hitting this file will already be prefixed with a /api/users endpoint

// CREATE
// Endpoint: /api/users
// Endpoint in routes file: /
// POST /api/users (create a user-sign up)
router.post('/login', usersCtrl.login)
// POST /api/users/login 
router.post('/', usersCtrl.create)
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

router.get('/:id', usersCtrl.getUserDetails)

// Export router
module.exports = router