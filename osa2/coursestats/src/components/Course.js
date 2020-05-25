import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
const Header = ({ name }) => {
    return (

        <h2>{name}</h2>

    )
}
const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}
const Content = ({parts}) => {
    
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}
const Total = ({ parts }) => {
    const total = parts.map(m => m.exercises)
    const reducer = total.reduce((s, c) => s + c)
    return (
        <p> <strong>Number of exercises {reducer}</strong></p>
    )
}

export default Course