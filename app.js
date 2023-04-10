const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const { default: mongoose } = require('mongoose')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const path = require('path')
const passport = require('passport')
const session = require('express-session')
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
const MongoStore = require('connect-mongo')

dotenv.config({path: './config/config.env'})
mongoose.set('strictQuery', false)

require('./config/passport')(passport)

connectDB()

const app = express()

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

/********************************** */

/************************************************/

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.MONGO_URI})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/books', require('./routes/books'))

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
