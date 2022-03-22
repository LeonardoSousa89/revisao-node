const db        = require('../db/db')
const methods   = require('../methods/index')
const SECRET    = require('../token/index')
const bcrypt    = require('bcrypt')
const jwt       = require('jsonwebtoken')
const express   = require('express')
const server    = express.Router()

function validToken(req, res, next){
    const token = req.headers['x-access-token']

    jwt.verify(token,SECRET,(err, decoded)=>{
        if(err) return res.status(401).send('User not authorized.')

        req.id = decoded.id
        next()
    })
}

server.route('/data').get(validToken,(req, res)=>{
    db.select(['id_client','username','email','datauser'])
      .from('client')
      .innerJoin('client_data','id_client','id_strange')
      .then(client => res.status(200).json(client))
      .catch(err   => res.status(500).send(err))
})

server.route('/signup').post((req, res)=>{
   const USER = { ...req.body }

   function crypto(password){
       const salt = bcrypt.genSaltSync(10)
       return bcrypt.hashSync(password, salt)
   }

  try{
    methods(USER.username, 'User not inserted.')
    methods(USER.email, 'Email not inserted.')
    methods(USER.pass, 'Password not inserted.')
  }catch(err){
      res.status(400).send(err)
  }

  USER.pass = crypto(USER.pass)

  db.insert(USER)
    .from('client')
    .then(_ => res.status(201).json())
    .catch(err => res.status(400).send(err))
})

server.route('/login').post(async(req, res)=>{
    const USER = {  ...req.body  }

    if(!USER.email || !USER.pass) return res.status(400)
                                            .send('Email and Password not passed.')

    const searchUser = await db.where({ email: USER.email })
                               .table('client')
                               .first()

    if(!searchUser) return res.status(401).send('User not found.')

    if(searchUser) {
        const passwordCompare = bcrypt.compareSync(USER.pass,searchUser.pass)

        if(!passwordCompare) return res.status(401).send('Email/Password invalid.')

        if(passwordCompare) {
               const token = jwt.sign({ 
                          id: USER.id },
                          SECRET,
                          { expiresIn: 60 })

                db.where({email: USER.email})
                        .first()
                        .table('client')
                        .then(_ => {
                            res.status(200).json({
                                auth: true,
                                token
                            })
                        })
                        .catch(err => res.status(400).json(err))
     }
 }
 })

module.exports = server