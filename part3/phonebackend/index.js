const express = require('express');

const PORT = 3001
const baseUrl = `http://localhost:${PORT}/persons`;


const app = express();

app.use(express.json())



//example dataset
let persons =[{
    "name": "kiskis",
    "number": "8565556",
    "id": 1
  },
  {
    "name": "kisksi",
    "number": "555552",
    "id": 2
  },
  {
    "name": "ayush",
    "number": "9855363",
    "id": 3
  },
  {
    "name": "sing",
    "number": "4",
    "id": 4
  },
  {
    "name": "kin",
    "number": "5489666",
    "id": 5
  },
  {
    "name": "pil",
    "number": "444444",
    "id": 6
  },
  {
    "name": "hip",
    "number": "455666",
    "id": 7
  }]

// generate random id 
// checks the max already existing id 
// then generates id from math.random, which will get values between [max+1,max+6)

const generateId = () => {

    const maxExistId = Math.max(...persons.map(n => n.id)) +1
    
    return Math.floor(Math.random()*((maxExistId + 5)- maxExistId)+maxExistId)
}


// get all persons 
app.get('/persons', (req,res) => {

    res.status(200).json(persons)

})

// get one person
app.get('/persons/:id', (req,res) => {

    const locatePersonId = req.params.id

    const locatePerson = persons.find(n => n.id === Number(locatePersonId) )

    if(locatePerson) return res.status(200).json(locatePerson)
    else return res.status(404).send(`<h1>Person with id ${locatePersonId} doesn't exist in the database</h1>`)
    

    
})

// get number of records in list and, current date and time 
app.get('/persons/info', (req,res) => {
    const displayData = '<div>' +
                            `<h1>Phonebook has info for ${persons.length} people</h1>` +
                            `<span>${new Date()}</span>` +
                        '</div>'

     res.send(displayData)
})

// add new person
app.post('/persons',(req,res)=>{

    const {name,number} = req.body

    // if number of name is empty, display error
    if(!name || !number){
        return res.status(404).json({error: 'Name or Phone number is missing'}).end()
    }
    
    //check if name already exists
    if(persons.find(n => n.name.toLowerCase() === name.toLowerCase())){
        return res.status(404).json({error: 'Name already exist in the database'}).end()
    }

    // tempelate for new data 
    const person = {
        "name": req.body.name,
        "number": req.body.number,
        "id": generateId()
    }

    // adding new record to old list
    persons = [...persons,person]   

    res.status(200).send('<h1>New contact Added<h1>')
})


// delete a record
app.delete('/persons/:id', (req,res) => {

    const deletePersonWithId = Number(req.params.id)

    persons = persons.filter(n => n.id !== deletePersonWithId)


    res.status(204).end()
})






app.listen(PORT, () => {
    console.log(`App running on ${baseUrl}`)
})
