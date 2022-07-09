import { useState } from "react"


// displays the button next to the countries
//on button click, renders the data of the city ***excluding weather data

//using showbutton to control the state of the showing data.
export const ShowButtonComponent = ({filteredcountry}) => {

    const [showbuttonstate, setshowbuttonstate] = useState(false)

    return(
        <div>{showbuttonstate?(<div>                
            <h1>{filteredcountry.name.common}</h1>
            
            <div>
                <h2>Capital city: - {filteredcountry.capital}</h2>
                <h2>Area: - {filteredcountry.area}</h2>
            </div>
            <div>
                <b>Languages:</b>
                <ul>
                    {Object.keys(filteredcountry.languages).map(e => <li key={e}>{filteredcountry.languages[e]}</li>)}
                </ul>
            </div>
            <div>
               <img src={filteredcountry.flags.png} alt={filteredcountry.name.common + "'s flag"} />
            </div>
        </div>):(<div>{filteredcountry.name.common}<button onClick={() => setshowbuttonstate(!showbuttonstate)}>show</button></div>)}</div>
    )


}