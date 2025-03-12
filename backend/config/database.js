const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected")
  }).catch((error) => {
    console.log("Error connecting to database")
    console.log(error)
  })

module.exports = mongoose
