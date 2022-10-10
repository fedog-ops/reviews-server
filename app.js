const express = require('express');
const app = express()
app.use(express.json())

const {getCatagories} = require('./controller/controller')

app.get('/api/catagories', getCatagories)

module.exports = app;