import { useState, useEffect } from 'react'
import {Filter, Persons,  PersonForm} from './components/filterPersonformPerson'
import {getAllPersons, addPerson,updatePersonNumber} from './services/serverfunctions'


const App = () => {

 

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  // fet persons data from db.json and set the state
  useEffect(()=>{

    getAllPersons()
    .then(res => setPersons(res))  
      
      
  },[])
  
  

  const formsub = (e) => {
    e.preventDefault();

    // check if the names or numbers already exist in array
    let personExistCheck = persons.filter(e =>e.name === newName || e.number === newNumber)
    
    // alert of duplicate data
    // if user name exist and number exist in database alert that they exist
    // else update the number in the database 
    if(personExistCheck.length) {
        if(personExistCheck[0].number === newNumber) return alert(`${newName} or ${newNumber} is already added to phonebook`)
        else{
          if(window.confirm(`${personExistCheck[0].name} is already added to phonebook, replace the old number(${personExistCheck[0].number}) with a new one(${newNumber})? `))
          updatePersonNumber(persons,personExistCheck[0].id,newNumber).then(res => setPersons(persons.map(per => per.id !== res.id ? per : res)))
        }      
      
      return true
    }

    //template for list data
    const newList = {
      name: newName,
      number: newNumber
    }

    addPerson(newList)
    .then(res => setPersons([...persons,res]))    
    //concating new person to old list
    
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
      <Persons  persons={persons} searchName={searchName} rerender={(id) => setPersons(persons.filter(n => n.id !== id))}/>
     
    </div>
  )

}

export default App;