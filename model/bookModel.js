const mongoose = require('mongoose')

// const bookSchema = new mongoose.Schema({

const Schema = mongoose.Schema
const bookSchema = new Schema({

    bookName :{
        type : String,
        unique : true
    },
    bookPrice :{
        type : String
    },
    isbnNumber :{
        type : Number
    },
    authorName :{
        type : String
    },
    publishedAt :{
        type : String
    },
    publication :{
        type : String
    },
    imageUrl : {
        type : String
    }

})

// class Schema{
//     Schema(title){
//         console.log(title)
//     }
// }

// const schema = new Schema("Hello")


const Book = mongoose.model('Book', bookSchema)
module.exports = Book