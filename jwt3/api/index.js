const express   = require('express')
const server    = express.Router()

server.route('/test').get((req, res)=>{
    return res.send('OK')
})

module.exports = server