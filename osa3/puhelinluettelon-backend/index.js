const express = require('express')
const app = express()

const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-204214"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-55-2123123"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-245235"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})