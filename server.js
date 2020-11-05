require('dotenv').config()
const express = require('express')
const {join} = require('path')
const app = express()


//middlewares
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
 
app.listen(process.env.PORT || 3001)
