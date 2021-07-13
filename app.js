const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 列出不重複分類
const categories = new Set()
Restaurant.find().lean().then((restaurants) => {
  restaurants.forEach(restaurant =>
    categories.add(restaurant.category))
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, category: categories }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  Restaurant.find()
    .lean()
    .then((restaurants) => {
      restaurantSearch = restaurants.filter((restaurant) => {
        return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      })
      recRestaurants = restaurants.filter((restaurant) => {
        return restaurant.rating > 4.5
      })
      if (restaurantSearch.length === 0) {
        res.render('find_no_result', { keyword, category: categories, recommends: recRestaurants })
      } else {
        res.render('index', { restaurants: restaurantSearch, keyword, category: categories })
      }
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new', { category: categories })
})

app.post('/restaurants', (req, res) => {
  const inputData = req.body
  let google_map = inputData.google_map
  if (google_map === '') {
    google_map = `https://www.google.com.tw/maps/search/${inputData.name}`
  }
  let image = inputData.image
  if (image === '') {
    image = 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*'
  }
  return Restaurant.create({
    name: inputData.name,
    name_en: inputData.name_en,
    category: inputData.category,
    image: image,
    location: inputData.location,
    phone: inputData.phone,
    google_map: google_map,
    rating: inputData.rating,
    description: inputData.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant, category: categories }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:restaurant_id', (req, res) => {
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

app.delete('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})