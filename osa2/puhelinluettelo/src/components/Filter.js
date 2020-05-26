import React from 'react'
import Person from './Person'

const Filter = ({persons, handleFilterChange, newFilter}) => {
    if (newFilter === '') {
      return (
        <div>
        <p>Rajaa käyttäjiä:</p>
        <input value={newFilter} onChange={handleFilterChange} />
        
      </div>
      )}
    const rajaus = persons.filter(p => p.name.includes(newFilter)).map(f => 
    <Person key={f.name} name={f.name} number={f.number} />)
    return (
      <div>
        <p>Rajaa käyttäjiä:</p>
        <input value={newFilter} onChange={handleFilterChange} />
      <ul>
        {rajaus}
      </ul>
      </div>
  
  
    )
  }

  export default Filter