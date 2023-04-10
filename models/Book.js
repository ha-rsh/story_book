const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    content:{
        type:String,
        required: true
    },
    status:{
        type:String,
        default: 'public',
        enum: ['public', 'private']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookcover:{
        data: Buffer,
        contentType: String
    },
    createdAt:{
        type:Date,
        default: Date
    }
})

module.exports = mongoose.model('Book', BookSchema)