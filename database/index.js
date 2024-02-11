const mongoose = require('mongoose')

const ConnectionString =  "mongodb+srv://admin:admin@cluster0.glb70qq.mongodb.net/?retryWrites=true&w=majority"


async function connectToDatabase(){
    await mongoose.connect(ConnectionString)
    console.log("Connected to database successfully")
}

module.exports = connectToDatabase