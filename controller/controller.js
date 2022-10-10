const {fetchCatagories} = require('../model/model')

exports.getCatagories = (req, res, next) => {
   fetchCatagories().then((catagories) => {
    res.status(200).send(catagories)
   })
 
}