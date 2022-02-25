const express = require("express")
const server = express()
const classesRouter =require('./api/classes/classes-router')

server.use(express.json())
server.use('/api/classes', classesRouter)







module.exports = server

