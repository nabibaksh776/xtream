const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'learn2code',
  api_key: '887164382956984',
  api_secret: 'U0LaNv75RKL096V-WKaIF3Ed8wY'
})

module.exports = cloudinary
