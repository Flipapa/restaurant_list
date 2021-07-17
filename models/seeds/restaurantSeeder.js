const Restaurant = require('../restaurant')
const rawData = require('./restaurant.json')
const restaurantList = rawData.results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('processing seeder!')
  Restaurant.create(restaurantList)
    .then(() => {
      db.close()
      console.log('mongodb seeder processing done!')
    })
})