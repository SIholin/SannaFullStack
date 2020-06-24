import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote]= useState([0, 0, 0, 0, 0, 0])

  const handleClick = chosen => {
    const copy = [...votes]
    copy[chosen] += 1
    setVote(copy)
  }

  const nextAnecdote = () => {
    const number = Math.floor(Math.random() * 6)
    setSelected(number)
  } 

  return (
    <div>
    <h1>Anecdote of the day</h1>
    
      {props.anecdotes[selected]}
   
    <button onClick={() => nextAnecdote()}>next</button>
    <button onClick={() => handleClick(selected)}>vote</button>
    <h2>Anecdote with most votes</h2>
    {props.anecdotes[votes.indexOf(Math.max(...votes))]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)