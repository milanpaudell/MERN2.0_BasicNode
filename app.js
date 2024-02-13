const express = require('express')
const app = express()


const connectToDatabase = require('./database')
const Book = require('./model/bookModel')

//Alternative 
// Const app = require('express')()



app.use(express.json())
// app.use(express.urlencoded({ extended : true }))


connectToDatabase()



app.get("/", (req,res)=>{

    res.status(200).json({
        "message": "Success",
    })
})


app.post("/book", async(req,res)=>{
    const { bookName, bookPrice, isbnNumber, authorName, publishedAt, publication } = req.body
    // console.log(bookName, bookPrice, isbnNumber, authorName, publishedAt)

   await Book.create({
        // bookName : bookName,
        // bookPrice: bookPrice,
        // isbnNumber : isbnNumber,
        // authorName : authorName,
        // publishedAt : publishedAt,
        // publication : publication
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication
    })



    res.status(201).json({
        message: "Book created Successfully"
    })
})


// all read
app.get("/book", async(req,res)=>{
    const books = await Book.find()     //return array ma garxa
    console.log(books)
    res.status(200).json({
        message : "Book fetched Successfully",
        data : books
    })
})


// single read
app.get("/book/:id", async(req,res)=>{
    const id = req.params.id
    const books = await Book.findById(id)   //return onject garxa
    // console.log(books)

    if(!books){
        return res.status(404).json({
            message : "Book not found"
        })

    }else{
        res.status(200).json({
            message : "Book fetched Successfully",
            data : books
        })

    }
})



// single read
// app.get("/book/:id", async(req,res)=>{
//     try{
//         const id = req.params.id
//     const books = await Book.findById(id)   //return onject garxa
//     // console.log(books)

//     if(!books){
//         return res.status(404).json({
//             message : "Book not found"
//         })

//     }else{
//         res.status(200).json({
//             message : "Book fetched Successfully",
//             data : books
//         })

//     }

//     }

//     catch(error){
//         res.status(500).json({
//             message : error.message
//         })
//     }
    
// })





// delete operation 

app.delete("/book/:id", async(req,res)=>{
    const id = req.params.id
    await Book.findByIdAndDelete(id)
    res.status(200).json({
        message : "Book deleted Successfully"
    })
})

// app.delete("/book/:id", (req, res) =>{
//     const id = req.params.id
//     Book.findByIdAndDelete(id, (err, book) =>{
//         if(err){
//             res.status(500).json({
//                 message : err.message
//             })
//         }else{
//             res.status(200).json({
//                 message : "Book deleted Successfully",
//                 data : book
//             })
//         }
//     })
// })





// Update operation

app.patch("/book/:id", async(req,res)=>{
    const id = req.params.id  //kun book update garney id ho yo 
    const { bookName, bookPrice, isbnNumber, authorName, publishedAt, publication } = req.body
    // console.log(bookName, bookPrice, isbnNumber, authorName, publishedAt)

   await Book.findByIdAndUpdate(id, {
        // bookName : bookName,
        // bookPrice: bookPrice,
        // isbnNumber : isbnNumber,
        // authorName : authorName,
        // publishedAt : publishedAt,
        // publication : publication
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication
    })



    res.status(200).json({
        message: "Book updated Successfully"
    })
})







app.listen(3000,() => {
    console.log('NodeJS listening on port 3000')
})
