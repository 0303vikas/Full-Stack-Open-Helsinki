const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./modules/mongo.js');
const {errorHandler} = require('./middleware/error.js')
require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express();

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// logs details of the request, custome made
morgan.token('data', function (req,res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

// logs methods path and body of every request
app.use(requestLogger)

// get all persons 
app.get('/api/persons', (req,res,next) => {   

    Person.find({})
    .then(result => {
        console.log(result)
        res.status(200).json(result).end()
        
    })
    .catch(error => next(error))   

})

// get one person
app.get('/api/persons/:id', (req,res,next) => {    

   Person.findById(req.params.id)
   .then(result => res.status(200).json(result).end())
    .catch(error => next(error))    
})



// get number of records in list and, current date and time 
app.get('/api/persons/info/random', (req,res) => {
    Person.find({}).then(result => {

        const displayData = '<div>' +
                            `<h1>Phonebook has info for ${result.length} people</h1>` +
                            `<span>${new Date()}</span>` +
                            '</div>'

    res.send(displayData).end()

    })
   
})

// add new person
app.post('/api/persons',(req,res,next)=>{

    const {name,number} = req.body

    // if number of name is empty, display error
    if(!name || !number){
        return res.status(404).json({error: 'Name or Phone number is missing'}).end()
    }
    
    // //check if name already exists
    // if(persons.find(n => n.name.toLowerCase() === name.toLowerCase())){
    //     return res.status(404).json({error: 'Name already exist in the database'}).end()
    // }  

    const newPerson = new Person({
        name: name,
        number: number
    })
    
    newPerson.save()
    .then(result => res.status(200).send({name: req.body.name,number: req.body.number}).end())
    .catch(error => next(error))

    
})

//update person 
app.put('/api/persons/:id', (req,res,next) => {

    Person.findByIdAndUpdate(req.params.id,{number: req.body.number},{new: true})
    .then(updatedNote => res.status(200).json(updatedNote).end())
    .catch(error => next(error))

})


// delete a record
app.delete('/api/persons/:id', (req,res,next) => {    

    Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end()) 
    .catch(error => next(error)) 
    
})

// An error message will be shown 
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})
