const mongoose = require('mongoose')

function connectDb(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch((err)=>{
        console.log("Error connecting to DB")
    })
}

module.exports = connectDb