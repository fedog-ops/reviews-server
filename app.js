const express = require('express');
const app = express()
app.use(express.json())

const {getCategories} = require('./controller/controller')

app.get('/api/categories', getCategories)

app.use((err, req, res, next)=>{
    res.status(500).send({message: "internal error"})
})

module.exports = app;