import {deletePerson} from '../services/serverfunctions'

// this components contains the search input field
// it has two props searchName and setSearchName, that contains and affect the state in main function

const Filter = ({searchName,setSearchName}) => {
    return(
        <div>
            <div>
        filter shown with: <input value={searchName} onChange={e =>  setSearchName(e.target.value)}/>
      </div>

        </div>
    )
};

//contains form for adding more data to the list
//contain formsubmittion function, and other input values and state changer functions
const PersonForm = ({formsub,newName,setNewName,setNewNumber,newNumber}) => {
    return(
        <div>
            <form onSubmit={formsub}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>  
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
        </div>      
        <div>
          <button type="submit" >add</button>
        </div>
      </form>

        </div>
    )
}

//contains list of all things added, and filter input field value
const Persons = ({persons,searchName,rerender}) => {
  
  
    return(
        <div>
          {persons.filter(e => {
                                 if (searchName === "") return e
                                 else return e.name.toLowerCase().startsWith(searchName.toLowerCase())
                               }
                          ).map(note => {   
                                                                    
                                                                         
                                         return(
                                                <div key={note.id?note.id:0}>
                                                  <h3 id={note.id?note.id:0}>{note.name}   {note.number}</h3>
                                                  <DelButton id={note}functiontry={(id) =>  rerender(id)} />
      
                                                </div>
                                                )
                                        }
                                 )
           }
        </div>
    )
}


// delete button function, displays delete
//on button click window.confirm asks for confirmation to delete user and updates the state in app.js to rerender the updated list
// argument id contains object with id and functiontry contains function that will change the state in the parent function
const DelButton = ({id,functiontry}) => { 
  

return(
      <button onClick={() => {
                              if(window.confirm(`Deleting ${id.name} with id ${id.id}`)){
                                deletePerson(id.id)
                                functiontry(id.id)
                              }
  
  }}>delete</button>)}


export {
    Filter,
    Persons,
    PersonForm
}