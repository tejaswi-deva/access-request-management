require("dotenv").config();
const express = require('express')
const connectDB = require("./config/db")
const userApi = require("./api/userapi")

const app = express()
app.use(express.json())

connectDB()

app.use('/users', userApi)

app.listen(process.env.PORT, () => {
    console.log("Server is running on ", process.env.PORT)
}) 

/*app.listen(, () => {
    console.log("Server is running on port 3000")
}) */