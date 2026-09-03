import { useState } from 'react'

const Filter = ({ filter }) => {
  return (
    <>
      Filter shown with: <input onChange={filter} />
    </>
  )
}

const PersonForm = ({ addName, handleNumberChange, handleNameChange }) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>name: <input onChange={handleNameChange} /></div>
        <div>number: <input onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState(0)

  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`)
    } else {
      setPersons(persons.concat(nameObject))
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter)
  )

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App
