const Restaurant = require('../restaurant')
const rawData = require('./restaurant.json')
const restaurantList = rawData.results
require('../../config/mongoose')

db.once('open', () => {
  console.log('processing seeder!')
  for (const restaurant of restaurantList) {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  }
  console.log('mongodb seeder processing done!')
})