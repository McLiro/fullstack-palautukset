const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(persons)
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
    const person = request.body
    person.id = Math.floor(Math.random() * 10000000)
    persons.concat(person)

    response.json(person)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
