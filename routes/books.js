const express = require('express')
const {ensureAuth } = require('../middleware/auth')
const router = express.Router()
var multer = require('multer')
const Book = require('../models/Book')
var fs = require('fs')
const path = require('path')

router.get('/add', ensureAuth, (req, res) => {
    res.render('add', {
        layout: 'add'
    })
})


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.post('/', ensureAuth, upload.single('image'), async (req, res, next) => {
    try {
        req.body.user = req.user.id
        var obj = {
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            user:req.user.id,
            bookcover: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }// },
            // avatar: {
            //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            //     contentType: 'image/png'
            // }
        }
        await Book.create(obj)
        console.log('Book Added')
    } catch (err) {
        console.log(err)
        res.render('error/500')
        
    }
 
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});
 
module.exports = router