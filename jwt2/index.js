const _Port    = 8081
const server   = require('./server/index')
const log      = require('morgan')
const express  = require('express')

const app      = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(log('dev'))

app.use('/', server)

app.listen(_Port)