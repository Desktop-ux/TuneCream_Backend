require("dotenv").config()
const app = require('./src/app')
const connectDb = require("./src/db/db")


connectDb()

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:5000")
})