const port = 8080

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const pin_router = require('./routes/pin_router')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/pins')
    .then(console.log(`MongoDB Connected`))
    .catch(err => console.log(`MongoDB Connection failed : ${err}`))

app.use('/', pin_router)



app.listen(port, console.log(`Server running on : ${port}`))