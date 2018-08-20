const router = require('express').Router()
const Item = require('../models/modelItem')
const jwt = require('jsonwebtoken')

router.get(`/`, function(req, res) {
    Item.find({
        $or: [
            { name: req.query.name },
            { price: req.query.price },
            { tags: req.query.tags },
        ] 
    })
    .then(items => {
        res.status(200).json({
            data: items
        })
    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
    })
})

router.post('/', function(req, res) {
    let token = req.body.token.slice(6)
    if(!token) {
        res.status(404).json({
            err: "You are not authorized to access this API"
        })
    } else {
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        let newItem = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            tags: req.body.tags,
            user: decoded.id
        }
        Item.create(newItem)
    
        .then(item => {
            res.status(201).json({
                item: item
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err.message
            })
        })
    }
})


module.exports = router