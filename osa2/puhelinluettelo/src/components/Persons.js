import React from 'react'

import Person from './Person'

const Persons = ({persons}) => {
    const rows = () => persons.map(p =>
      <Person
      key={p.name}
      name={p.name}
      number={p.number}
      />
      )
    return (
      <ul>
      {rows()}
    </ul>
    )
  
  }

export default Persons

