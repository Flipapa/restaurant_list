const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const sortList = require('../../config/sortData.json')

// 列出不重複分類
const categories = new Set()
Restaurant.find()
  .lean()
  .then(restaurants => restaurants.forEach(restaurant => {
    categories.add(restaurant.category)
  }))

router.get('/search', (req, res) => {
  const { keyword, sortOption } = req.query
  const sKeyword = new RegExp(keyword.trim(), 'i')
  let recRestaurants

  Restaurant.find({ $or: [{ name: sKeyword }, { name_en: sKeyword }, { category: sKeyword }] })
    .lean()
    .sort(sortOption === "" ? "" : sortList[sortOption].data)
    .then((restaurants) => {
      if (restaurants.length === 0) {
        recRestaurants = restaurants.filter((restaurant) => {
          return restaurant.rating > 4.5
        })
      }
      res.render('index', { restaurants, keyword, sortList, sortOption, category: categories, recommends: recRestaurants })
    })
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  return res.render('new', { category: categories })
})

router.post('/', (req, res) => {
  const { name, name_en, category, location, phone, rating, description } = req.body
  let google_map = req.body.google_map
  if (google_map === '') {
    google_map = `https://www.google.com.tw/maps/search/${name}`
  }
  let image = req.body.image
  if (image === '') {
    image = 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*'
  }
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant, category: categories }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const editData = req.body
  let editGoogle_map = req.body.google_map
  if (editGoogle_map === '') {
    editGoogle_map = `https://www.google.com.tw/maps/search/${editData.name}`
  }
  let image = editData.image
  if (image === '') {
    image = 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*'
  }
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = editData.name
      restaurant.name_en = editData.name_en
      restaurant.category = editData.category
      restaurant.image = image
      restaurant.location = editData.location
      restaurant.phone = editData.phone
      restaurant.google_map = editGoogle_map
      restaurant.rating = editData.rating
      restaurant.description = editData.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router