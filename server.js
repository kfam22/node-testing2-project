const express = require("express")
const server = express()
const classesRouter =require('./api/classes/classes-router')
const rolesRouter = require('./api/classes/roles-router')

server.use(express.json())
server.use('/api/classes', classesRouter)
server.use('api/classes/roles', rolesRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });
  

// server.use('*', (req, res, next) =>{
//     next({ status: 404, message: 'not found'})
// });





module.exports = server

