const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => {
  return req.body ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-204214"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-55-2123123"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-245235"
    }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: 'Name and a number required.'
    })
  }

  const newPerson = new Person({
    name: name,
    number: number
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const info = `<div>Phonebook has info for ${persons.length} people.</div><div>${Date().toString()}</div>`
    response.send(info)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
