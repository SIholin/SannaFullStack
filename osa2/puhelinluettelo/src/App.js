import React, { useState } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'




const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
  number: 198323, }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is alreay added to phonebook`)
    } else {
   
    const personObject = {
      name: newName, 
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    
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

  return (
    <div>
      <h1>Phonebook</h1>
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
    <Persons persons={persons} />
    </div>
  )

  }
export default App;
