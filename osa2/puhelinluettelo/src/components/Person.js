import React from 'react'

const Person = ({name, number, handleDelete, id}) => {
    return (
  <li key={id}>{name} puh. {number}  </li>
    )
  }

export default Person