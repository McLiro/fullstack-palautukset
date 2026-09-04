import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map(person =>
        <div key={person.name}>
          <span>{person.name} {person.number} </span>
          <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
        </div>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
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
      personService.create(nameObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(prev => prev.filter(person => person.id !== id))
        })
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
