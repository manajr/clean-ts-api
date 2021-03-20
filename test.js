const { MongoClient } = require('mongodb')
const express = require('express')

const app = express()

MongoClient.connect('mongodb://localhost:27017/clean-node-api',{ useUnifiedTopology: true } )
app.listen(5050, () => console.log('conectado'))
