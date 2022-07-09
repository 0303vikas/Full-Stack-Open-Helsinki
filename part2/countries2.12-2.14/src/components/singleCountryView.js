import { useEffect, useState } from "react"
import axios from 'axios'
import env from 'react-dotenv'


// renders all the required data
// gets weather status of the capital city from openweathermap
//and prints the weather of the capital city of the selected country
export const SingleCountryView = ({filteredcountries}) => {
    
    const [weather, setweather] = useState([])
    const [temperatur, settemperature] = useState(0)
    const [windspeed, setwindspeed] = useState(0)
    const [iconnum,seticonnum] = useState('10n')



    useEffect(() =>{ 
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${filteredcountries[0].latlng[0]}&lon=${filteredcountries[0].latlng[1]}&appid=${process.env.REACT_APP_API_KEY_OPEN_WEATHER}`)
            .then(e => {
                console.log(e.data)
                settemperature(e.data.current.temp)
                setwindspeed(e.data.current.wind_speed)
                seticonnum(e.data.current.weather[0].icon)
                return setweather(e.data) })    

                
        
    },[])

    if(!weather) return <div> Loading .....</div>

    return(

        <div>                
                <h1>{filteredcountries[0].name.common}</h1>
                
                <div>
                    <h2>Capital city: - {filteredcountries[0].capital}</h2>
                    <h2>Area: - {filteredcountries[0].area}</h2>
                </div>
                <div>
                    <b>Languages:</b>
                    <ul>
                        {Object.keys(filteredcountries[0].languages).map(e => <li key={e}>{filteredcountries[0].languages[e]}</li>)}
                    </ul>
                </div>
                <div>
                   <img src={filteredcountries[0].flags.png} alt={filteredcountries[0].name.common + "'s flag"} />
                </div>
                <h2>Weather in {filteredcountries[0].capital}</h2>
               <div>Temperature {parseInt(temperatur-273.15)}°C</div>
                <img src={`http://openweathermap.org/img/wn/${iconnum}@2x.png`}  alt="weather image" />
                <div>wind speed {windspeed} m/s</div> 
               
                
                
                
               
                
            </div>
    )
}


