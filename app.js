const express = require('express')
const app = express()

//Alternative 
// Const app = require('express')()



app.get("/", (req,res)=>{
    res.send("Hello, world!")
})




app.listen(3000,() => {
    console.log('NodeJS listening on port 3000')
})