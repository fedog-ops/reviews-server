const {fetchCategories} = require('../model/model')

exports.getCategories = (req, res, next) => {
   fetchCategories().then((categories) => {
    res.status(200).send(categories)
   }).catch((err) => {
    next(err)
   })
 
}