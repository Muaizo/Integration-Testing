const express = require('express')
const bookData = require('../appointment.json')

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(bookData);

}).post('/', (req, res) => {
    const data = req.body;
    bookData.push(data)
    res.status(201).send(data)
})

module.exports = router;