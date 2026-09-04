import { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
