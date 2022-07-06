import { useState, useEffect } from 'react'
import {Filter, Persons,  PersonForm} from './components/filterPersonformPerson'
import axios from 'axios'

const App = () => {

 

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  // fet persons data from db.json and set the state
  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(e => setPersons(e.data)  )   
      
      
  },[])
  
  

  const formsub = (e) => {
    e.preventDefault();

    // check if the names or numbers already exist in array
    let personExistCheck = persons.filter(e =>e.name === newName || e.number === newNumber)
    
    // alert of duplicate data
    if(personExistCheck.length) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
      return false
    }

    //template for list data
    const newList = {
      id: newName,
      name: newName,
      number: newNumber
    }

    //concating new person to old list
    setPersons([...persons,newList])
    setNewName('')
    setNewNumber('')
  }
   

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter  searchName={searchName} setSearchName={setSearchName} />

      <h2>Add a new person</h2>
      <PersonForm  formsub={formsub} newName={newName} setNewName={setNewName} setNewNumber={setNewNumber} newNumber={newNumber} />
      
      
      <h2>Numbers</h2>
      <Persons  persons={persons} searchName={searchName}/>
     
    </div>
  )

}

export default App;