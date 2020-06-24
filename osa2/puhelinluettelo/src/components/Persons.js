import React from 'react'

import Person from './Person'



const Persons = ({persons, handleDelete}) => {
  

  const rows = () => persons.map(p =>
      <div>
      <Person
      key={p.name}
      name={p.name}
      number={p.number}
      handleDelete={handleDelete}
      id={p.id}
      />
     
      <button onClick={() => {handleDelete(p.id, p.name)}}>poista</button>
      {console.log(p.id)}
      </div>
      )
    return (
      <ul>
      {rows()}
    </ul>
    )
  
  }

export default Persons

