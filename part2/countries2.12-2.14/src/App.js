import { useState, useEffect } from 'react'
import {SearchedCountries} from './components/countriesfilter'
import axios from 'axios'


const App = () => {
  const [counties, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
 
  // from rest api get all the countries in the world
  // set the state countries from retrived data
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(e => {console.log(e.data.length)
      return setCountries(e.data)} )     
      
  },[]) 

  return (
    <div>

      <div>
        find countries <input value={searchCountry} onChange={(e) => setSearchCountry(e.target.value.toLowerCase())}   />        
      </div>
      
      <SearchedCountries list={counties} searchCountry={searchCountry}  />      {/*prints all the required data for the countries*/}
     
    </div>
  )

}

export default App;