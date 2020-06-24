import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/pesrons'

const Notification = ({ message, color}) => {
  if (message === null) {
    return null
  }
  const messageStyle = {
    color: 'green',
    fontStyle: 'italic',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10
  }
  if(color === 'red') {
    messageStyle.color = 'red'
  }
  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
  
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setNewMessage] = useState(null)
  const [color, setNewColor] = useState('green')

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      if (window.confirm(`${newName} is alreay added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.name === newName)
      const changed = {...person, number: newNumber}
      personService.update(person.id, changed).then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
        setNewMessage(`${newName}'s number is changed to ${newNumber}`)
        setNewColor('green')
     
      }).catch(error => {
        setNewMessage(`${newName} was already removed from server`)
          setPersons(persons.filter(p => p.id !== person.id))
          setNewColor('red')
    
      })
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }} else {
   
    const personObject = {
      name: newName, 
      number: newNumber,
    }
    personService.create(personObject).then(response => {
      setPersons(persons.concat(response.data))
      
    })
    setNewMessage(`${newName} added`)
    setNewColor('green')
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }
  setNewName('')
  setNewNumber('')
  

  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleDelete = (id , name) => {
    if(window.confirm(`Delete ${name} ?`)) {
    personService.deletePerson(id).then(response => {
      const change = persons.filter(p => p.id !== id)
      setPersons(change)
    })
    setNewMessage(`${name} is deleted`)
    setNewColor('red')
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }
}
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} color={color}/>
      <Filter persons={persons} handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <h2>Add new</h2>
      <form onSubmit={addPerson}> 
        <div>
          name: <input value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>number: <input value={newNumber}
        onChange={handleNumberChange}/></div>
        <div>
          
          <button type="submit">add</button>
          
        </div>
      </form>
      <h2>Numbers</h2>
    <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )

  }
export default App;
