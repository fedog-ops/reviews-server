const express = require('express');
const app = express()
app.use(express.json())

const {getCategories} = require('./controller/controller')

app.get('/api/categories', getCategories)

module.exports = app;