require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        const parts = v.split('-')
        if (parts.length !== 2) return false

        const [first, second] = parts
        if (first.length < 2 || first.length > 3) return false
        if (!/^\d+$/.test(first) || !/^\d+$/.test(second)) return false

        return true
      },
      message: 'Number must consist of two parts seperated by a dash (-). The first part must be 2 or 3 numbers long.'
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
