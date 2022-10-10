const express = require('express');
const app = express()
app.use(express.json())

const {getCategories} = require('./controller/controller')

app.get('/api/categories', getCategories)

app.all('/*', (req, res) => {
    res.status(404).send({message: "url not found"})
})

app.use((err, req, res, next)=>{
    res.status(500).send({message: "internal error"})
})

module.exports = app;