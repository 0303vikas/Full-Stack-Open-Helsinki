
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
const Persons = ({persons,searchName}) => {
    return(
        <div>
             {persons.filter(e => {
        if (searchName === "") return e
        else return e.name.toLowerCase().startsWith(searchName)
      }).map(note => <h3 key={note.id?note.id:0}>{note.name}   {note.number}</h3>)}
        </div>
    )
}

export {
    Filter,
    Persons,
    PersonForm
}