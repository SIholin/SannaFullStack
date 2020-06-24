import React, {useState, useEffect} from 'react';
import axios from 'axios'

const PrintCountries = ({list, setResults, setWeather, weather}) => {
  return (
    <ul>
      {list.map(c => <li key={c.name}>
      {c.name}
      <button onClick={() => {setResults(<PrintCountry country={c} setWeather={setWeather} weather={weather}/>)}}>show</button>
      </li>)}
    </ul>
  )
}

const PrintCountry = ({country, setWeather, weather}) => {
  const params = {
    access_key: `${process.env.REACT_APP_API_KEY}`,
    query: `${country.name}`
  }
  
  
  useEffect(() => {  
    axios.get('http://api.weatherstack.com/current', {params}).then(response => { 
    console.log(response.data.current)
    setWeather(response.data.current)
    })
  }, [])
  return(
    <div>
      <h1>{country.name}</h1>
  <p> <strong>capital</strong> {country.capital} </p> 
  <p> <strong>poputalion</strong> {country.population}</p>
  <p><strong>languages:</strong></p>
  <ul>
  {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
  </ul>
  <img src={country.flag} width='500' />
  <h2>Weather in {country.name}</h2>
  <p><strong>temperature:</strong> {weather.temperature} celscius</p>    
    <img src={weather.weather_icons} width='200'/>
    </div>
  
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [weather, setWeather] = useState([])
 

  useEffect(() => {  
  axios.get('https://restcountries.eu/rest/v2/all').then(response => {
  console.log(response.data)  
  setCountries(response.data)
  })
}, [])




const handleChange = (event) => {
  const valueOfFilter = event.target.value
  const filterCountries = countries.filter(c => c.name.includes(valueOfFilter))
  if(filterCountries.length > 10) {
    setResults(<p>too many matches, specify another filter</p>)
  } else if(filterCountries.length > 1) {
    setResults(<PrintCountries list={filterCountries} setResults={setResults} setWeather={setWeather} weather={weather}/>)
  } else if(filterCountries.length === 1){
    setResults(<PrintCountry country={filterCountries[0]} setWeather={setWeather} weather={weather} />)
  } else {
    setResults(<p>No matches</p>)
  }
}

  return (
    <div>
      <p>find countries</p>
      <input onChange={handleChange} />
      {results}
    </div>
  );
}

export default App;
