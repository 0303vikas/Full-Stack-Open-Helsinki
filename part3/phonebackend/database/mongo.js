const mongoose = require('mongoose');
require('dotenv').config()

const password = process.argv[2]
const name = process.argv[3] || null
const number = process.argv[4] || null

// connection string
const dburl = `mongodb+srv://${process.env.MONGODB_USER}:${password}@cluster0.d8mb7.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(dburl)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,    
})

const Person = mongoose.model('Person', personSchema)


if(!name && !number){

    Person.find({}).then(result => {
        console.log('phonebook:\n', result,'\n')
        mongoose.connection.close()

    })

    

}else { 
    const person = new Person({
        name: JSON.stringify(name),
        number: Number(number)
    })

    person.save().then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    
}

