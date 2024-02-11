const express = require('express')
const app = express()


const connectToDatabase = require('./database')

//Alternative 
// Const app = require('express')()





connectToDatabase()



app.get("/", (req,res)=>{

    res.status(200).json({
        "message": "Success",
    })
})




app.listen(3000,() => {
    console.log('NodeJS listening on port 3000')
})