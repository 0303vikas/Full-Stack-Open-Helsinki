
import { useEffect } from 'react'
import {ShowButtonComponent} from './showbutton'
import axios from 'axios'
import { SingleCountryView } from './singleCountryView'

// Its exported to app.js
// its has two arguments, list of all the country and user filter search input field data
// contains 4 conditions which are handled by ifelse statement
// if the user hasn't searched for any country, then return empty 
//else return countries data based on further conditions
// if 

export const SearchedCountries = ({list,searchCountry,showdata}) => {
  
    if(!searchCountry){
      return(
        <div>
  
        </div>
      )
    }     
    else {
        //filters country based on user input
        //check the whole country list with startswith to match the exact words typed by user
      const filteredcountries = list.filter(e => e.name.common.toLowerCase().startsWith(searchCountry)) 
  
      if(filteredcountries.length === 0){
        return(
          <div>
            <h2>No countries found.</h2>
          </div>
        )
      }
      //if filtered country length is one 
      //show data like languages spokes, capital, area, flag etc
      else if(filteredcountries.length === 1) return <SingleCountryView filteredcountries={filteredcountries} />

    // if filtered length is more than 10 show to much countries
      else if(filteredcountries.length > 10){
        return(
          <div>
            <h2>Too many matches, specify another filter.</h2>
          </div>
        )
        
      } 
      // else display the list of countries
      else{
        return(
          <div>
            {/* map all the filtered city, show button functionallity is in showbuttoncomponent  */}

            {filteredcountries.map(e => {
               
              return (
              <div key={e.name.common}>
                <ShowButtonComponent  filteredcountry={e} />
              </div>)
            })}
          </div>
        )
      }
  
    }  
   
   
  }

