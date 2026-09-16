const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.wbpo7th.mongodb.net/Persons?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
} else {
  const newPerson = new Person({
    name: name,
    number: number,
  })

  newPerson.save().then(() => {
    console.log(`Added ${newPerson.name} number ${newPerson.number} to phonebook.`)
    mongoose.connection.close()
  })
}
