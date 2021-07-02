const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// 列出不重複分類
const allCategory = []
restaurantList.results.forEach(restaurant =>
  allCategory.push(restaurant.category))
const category = [...(new Set(allCategory))]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, category: category })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword, category: category })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})