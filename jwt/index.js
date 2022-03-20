const http    = require('http')
const express = require('express')
const jwt     = require('jsonwebtoken')
const app     = express()
const SECRET  = 'leo'

app.use(express.json())
app.use(express.urlencoded({extended:true}))

function verifyJwt(req, res, next) {
    const token = req.headers['x-access-token']
    const index = blacklist.findIndex(item => item === token)
    if(index !== -1) return res.status(401).end()

    jwt.verify(token, SECRET, (err, decoded)=>{
        if(err) return res.status(401).end()

        req.userId = decoded.userId
        next()
    })
}

app.get('/',(req,res)=>{
    res.json({ message: 'i am online' })
})

app.get('/clientes',verifyJwt,(req,res)=>{
    res.json({ id:1 , 
               nome:'Leonardo Mendes',
               info:'revisão node.js'})
})

app.post('/login',(req,res)=>{
    if(req.body.user === 'leo' && req.body.password === '1234') {
        const token  = jwt.sign({userId: 1}, SECRET, { expiresIn: 300 })
        return res.json({ auth: true, token})
    }

    res.status(401).end()
})

const blacklist = []

app.post('/logout',function (req,res) {
    blacklist.push(req.headers['x-access-token'])
    res.end()
})

const server = http.createServer(app)
server.listen(8081)
