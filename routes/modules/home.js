const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 列出不重複分類
const categories = new Set()
Restaurant.find().lean().then((restaurants) => {
  restaurants.forEach(restaurant =>
    categories.add(restaurant.category))
})

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, category: categories }))
    .catch(error => console.error(error))
})

module.exports = router