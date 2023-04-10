const express = require('express')
const { ensureGuest, ensureAuth } = require('../middleware/auth')
const Book = require('../models/Book')
const router = express.Router()

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const books = await Book.find({user: req.user.id}).lean()
        res.render('dashboard', {
            img: req.user.image,
            name: req.user.firstName,
            books
        })
        
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router