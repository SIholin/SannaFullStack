import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
<button onClick={props.handleClick}>
  {props.text}
</button>
)

const Statistic = (props) => {
return (
  
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>

)
}

const Statistics = ({g, n, b}) => {
  const allFeedBack = g + n + b
  if (allFeedBack === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  const average = (g + (b * -1))/allFeedBack
  const positive = g/allFeedBack*100
  return(
    <table>
      <tbody>
      <Statistic text="good" value={g} />
      <Statistic text="neutral" value={n} />
      <Statistic text="bad" value={b} />
      <Statistic text="all" value={allFeedBack} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = newValue => {
    setGood(newValue)
  }

  const setNeutralValue = newValue => {
    setNeutral(newValue)
  }

  const setBadValue = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={() => setGoodValue(good + 1)} text="good"/>
      <Button handleClick={() => setNeutralValue(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBadValue(bad + 1)} text="bad"/>
      <h2>Statistics</h2>
      <Statistics g={good} b={bad} n={neutral} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
