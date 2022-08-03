import { useState, useEffect } from 'react'
import {Filter, Persons,  PersonForm, ErrorMessage} from './components/filterPersonformPerson'
import {getAllPersons, addPerson,updatePersonNumber} from './services/persons'
import './index.css'



const App = () => {

 

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorColor, setErrorColor] = useState('green')


  // fet persons data from db.json and set the state
  useEffect(()=>{

    getAllPersons()
    .then(res => setPersons(res))  
      
      
  },[])
  
  

  const formsub = (e) => {
    e.preventDefault();

    // check if the names or numbers already exist in array
    let personExistCheck =  persons.filter(e =>e.name === newName || e.number === newNumber)
    
    
    // alert of duplicate data
    // if user name exist and number exist in database alert that they exist
    // else update the number in the database 
    if(personExistCheck.length) {
        if(personExistCheck[0].number === newNumber) {
                  setErrorColor('red')
          return setErrorMessage(`${newName} or ${newNumber} is already added to phonebook`)}
        else{
          if(window.confirm(`${personExistCheck[0].name} is already added to phonebook, replace the old number(${personExistCheck[0].number}) with a new one(${newNumber})? `)){
          
          updatePersonNumber(persons,personExistCheck[0].id,newNumber)
          .then(res => {
                        setPersons(persons.map(per => per.id !== res.id ? per : res))
                        setErrorColor('green')
                        setErrorMessage(`${personExistCheck[0].name} phone number updated`)
                        setTimeout(() => {setErrorMessage(null)},5000)
                        })
        
        .catch((error) => {
                        console.log(error)
                        setErrorColor('red')
                        setErrorMessage(`${error.response.data.error}`)
                        setTimeout(() => {setErrorMessage(null)},5000)
                         })
             
      
      return true
    }}}

    //template for list data
    const newList = {
      name: newName,
      number: newNumber
    }

    addPerson(newList)
    .then(res => {
                  setPersons([...persons,res])
                  setErrorColor('green')
                  setErrorMessage(`Added ${res.name}`)
                  setTimeout(()=>{setErrorMessage(null)},5000 )})
    .catch(error => {                      
                                
                  setErrorColor('red')
                  setErrorMessage(`${error.response.data.error}`)
                  setTimeout(()=>{setErrorMessage(null)},5000 )})   
    //concating new person to old list
    
    setNewName('')
    setNewNumber('')
  } 

  return (
    <div>

      

      <h2>Phonebook</h2>      
      <Filter  searchName={searchName} setSearchName={setSearchName} />

      <h2>Add a new person</h2>
      <ErrorMessage err={errorMessage} col={errorColor} />
      <PersonForm  formsub={formsub} newName={newName} setNewName={setNewName} setNewNumber={setNewNumber} newNumber={newNumber} />
      
      
      <h2>Numbers</h2>
      <Persons  persons={persons} searchName={searchName} errCol={setErrorColor} errMess={setErrorMessage} rerender={(id) => setPersons(persons.filter(n => n.id !== id))}/>
     
    </div>
  )

}

export default App;