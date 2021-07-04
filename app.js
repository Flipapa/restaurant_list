const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// 列出不重複分類
const categories = new Set()
restaurantList.results.forEach(restaurant =>
  categories.add(restaurant.category))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, category: categories })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  })
  const recRestaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.rating > 4.5
  })
  if (restaurants.length === 0) {
    res.render('find_no_result',{ keyword: keyword, category:categories, recommends:recRestaurants })
  } else {
    res.render('index', { restaurants: restaurants, keyword: keyword, category: categories })
  }
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})