const client   = require('../Mock/index')
const SECRET   = require('../Mock/secret')
const jwt      = require('jsonwebtoken')
const express  = require('express')
const server   = express.Router()

function validationUser(req,res, next){
    const token = req.headers['x-access-token']

    jwt.verify(token,SECRET,(err, decoded)=>{
        if(err) return res.status(401).send('Usuário não autorizado.')

        req.id = decoded.id
        next()
    })
}

server.route('/data').get(validationUser,(req,res)=>{
    let clientData = {
            info:'revisão para teste técnico remoto node.js'
        }

    res.status(200).send(clientData)
})

server.route('/login').post((req,res)=>{
    let USER = { ...req.body }
    
    let clientData = {
            user: client.user, 
            password: client.password
        }

    if(USER.user != clientData.user  || USER.password != clientData.password ) {
        return res.status(401).send('Usuário não autorizado!')
    }

    const token = jwt.sign({id: client.id},SECRET,{expiresIn: 3600})
    return res.status(200).json({
            auth: true,
            token,
            message: `Seja bem vindo ${clientData.user}`})
})

module.exports = server