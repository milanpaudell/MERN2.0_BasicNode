const express = require('express')
const app = express()

//Alternative 
// Const app = require('express')()

const fs = require('fs')

const connectToDatabase = require('./database')
const Book = require('./model/bookModel')

// multerconfig imports
const {multer,storage} = require("./middleware/multerConfig")
const upload = multer({storage : storage})




app.use(express.json())
// app.use(express.urlencoded({ extended : true }))


connectToDatabase()



app.get("/", (req,res)=>{

    res.status(200).json({
        "message": "Success",
    })
})

// create book
app.post("/book", upload.single("image"), async(req,res)=>{
    
    let fileName ;
    if(!req.file){
        fileName = "https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
    }else{
       fileName = "http://localhost:3000/" + req.file.filename
    }

    const { bookName, bookPrice, isbnNumber, authorName, publishedAt, publication } = req.body
    // console.log(bookName, bookPrice, isbnNumber, authorName, publishedAt)

   await Book.create({
        // bookName : bookName,
        // bookPrice: bookPrice,
        // isbnNumber : isbnNumber,
        // authorName : authorName,
        // publishedAt : publishedAt,
        // publication : publication,
        // imageUrl : fileName
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : fileName
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

app.patch("/book/:id", upload.single('image'), async(req,res)=>{
    const id = req.params.id  //kun book update garney id ho yo 
    const { bookName, bookPrice, isbnNumber, authorName, publishedAt, publication } = req.body
    // console.log(bookName, bookPrice, isbnNumber, authorName, publishedAt)

    const oldDatas = await Book.findById(id)
    let fileName;
    if(req.file){

        const oldImagePath = oldDatas.imageUrl
        console.log(oldImagePath)
        const localHostUrlLength = "http://localhost:3000/".length
        const newOldImagePath = oldImagePath.slice(localHostUrlLength)
        console.log(newOldImagePath)
        fs.unlink(`storage/${newOldImagePath}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File Deleted Successfully")
            }
        })
        fileName = "http://localhost:3000/" + req.file.filename
    }

   await Book.findByIdAndUpdate(id, {
        // bookName : bookName,
        // bookPrice: bookPrice,
        // isbnNumber : isbnNumber,
        // authorName : authorName,
        // publishedAt : publishedAt,
        // publication : publication,
        // imageUrl : fileName
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : fileName
    })



    res.status(200).json({
        message: "Book updated Successfully"
    })
})




app.use(express.static("./storage/"))



app.listen(3000,() => {
    console.log('NodeJS listening on port 3000')
})
