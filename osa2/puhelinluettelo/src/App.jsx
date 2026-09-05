import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

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
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

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

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(
        `${newName} is already in the phonebook. Replace the old number with a new one?`
      )) {
        const updatedPerson = {...existingPerson, number: newNumber}

        personService.modify(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(prev =>
              prev.map(p => p.id === returnedPerson.id ? returnedPerson : p)
            )
            setNotification(`Modified ${newName}`)
            setTimeout(() => {setNotification(null)}, 3000)
          })
          .catch(error => {
            setError(`The information of ${newName} has already been deleted from the server.`)
            setTimeout(() => {setError(null)}, 3000)
          })
      }
      return
    } else {
      personService.create(nameObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNotification(`Added ${newName}`)
          setTimeout(() => {setNotification(null)}, 3000)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(prev => prev.filter(person => person.id !== id))
          setNotification(`Deleted ${name}`)
          setTimeout(() => {setNotification(null)}, 3000)
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
      <Notification message={notification}/>
      <Error message={error}/>
      <Filter filter={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
