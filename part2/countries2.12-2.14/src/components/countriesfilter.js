// Its exported to app.js
// its has two arguments, list of all the country and user filter search input field data
// contains 4 conditions which are handled by ifelse statement
// if the user hasn't searched for any country, then return empty 
//else return countries data based on further conditions

export const SearchedCountries = ({list,searchCountry}) => {
  
    if(!searchCountry){
      return(
        <div>
  
        </div>
      )
    }     
    else {
      const filteredcountries = list.filter(e => e.name.common.toLowerCase().startsWith(searchCountry))
  
      if(filteredcountries.length === 0){
        return(
          <div>
            <h2>No countries found.</h2>
          </div>
        )
      }
      else if(filteredcountries.length === 1){
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
            </div>
        )

    }
      else if(filteredcountries.length > 10){
        return(
          <div>
            <h2>Too many matches, specify another filter.</h2>
          </div>
        )
      } else{
        return(
          <div>
            {filteredcountries.map(e => {
              return <h2 key={e.name.common}>{e.name.common}</h2>
            })}
          </div>
        )
      }
  
    }  
   
   
  }