const express = require('express');
const app = express()
app.use(express.json())

const {getCategories, getReviews, getUsers} = require('./controller/controller')

app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReviews)

app.get('/api/users', getUsers)


app.all('/*', (req, res) => {
    res.status(404).send({msg: "url not found"})
})

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send(err)
    } else next(err)
})

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
    res.status(400).send({msg: 'invalid data type'})
    } else next(err)
})
app.use((err, req, res, next)=>{
    console.log(err, 'in 500 error block')
    res.status(500).send({message: "internal error"})
})

module.exports = app;